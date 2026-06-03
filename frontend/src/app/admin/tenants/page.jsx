"use client";

import { useEffect, useState } from "react";
import API from "../../../services/api";
import Modal from "../../../components/Modal";

export default function TenantsPage() {
  const [tenants, setTenants] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [domain, setDomain] = useState("");
  const [industry, setIndustry] = useState("");
  const [editId, setEditId] = useState(null);
const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await API.get("/tenants/");

      if (Array.isArray(res.data)) {
        setTenants(res.data);
      } else if (res.data.results) {
        setTenants(res.data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTenants = tenants.filter((tenant) =>
    tenant.company_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const addTenant = async () => {
  try {
    await API.post("/tenants/", {
      company_name: companyName,
      domain: domain,
      industry: industry,
      status: "ACTIVE",
    });

    alert("Tenant Added Successfully");

    setCompanyName("");
    setDomain("");
    setIndustry("");

    setOpen(false);

    fetchTenants();

  } catch (err) {

    console.log(err);
    console.log(err.response);

    alert(
      JSON.stringify(
        err.response?.data,
        null,
        2
      )
    );
  }
};   // <-- MISSING THIS


const editTenant = (tenant) => {
  setEditId(tenant.id);

  setCompanyName(tenant.company_name);
  setDomain(tenant.domain);
  setIndustry(tenant.industry);

  setIsEdit(true);
  setOpen(true);
};

const updateTenant = async () => {
  try {
    await API.put(`/tenants/${editId}/`, {
      company_name: companyName,
      domain,
      industry,
      status: "ACTIVE",
    });

    alert("Tenant Updated");

    setOpen(false);
    setIsEdit(false);

    fetchTenants();

  } catch (err) {
    console.log(err);
    alert("Update Failed");
  }
};

const deleteTenant = async (id) => {
  try {
    await API.delete(`/tenants/${id}/`);

    alert("Tenant Deleted");

    fetchTenants();

  } catch (err) {
    console.log(err);
    alert("Delete Failed");
  }
};
  return (
    <div className="p-8 text-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            Tenant Management
          </h1>

          <p className="text-slate-400 mt-2">
            Manage all registered tenants
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold"
        >
          + Add Tenant
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Total Tenants
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {tenants.length}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Active
          </p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {
              tenants.filter(
                (t) =>
                  t.status?.toLowerCase() === "active"
              ).length
            }
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Industries
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {
              new Set(
                tenants.map((t) => t.industry)
              ).size
            }
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Domains
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {tenants.length}
          </h2>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search tenant by company name..."
        className="w-full mb-6 p-4 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-white">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">
                Company
              </th>

              <th className="p-4 text-left">
                Domain
              </th>

              <th className="p-4 text-left">
                Industry
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTenants.length > 0 ? (
              filteredTenants.map((tenant) => (
                <tr
                  key={tenant.id}
                  className="border-t border-slate-700 hover:bg-slate-800 transition"
                >
                  <td className="p-4 font-medium">
                    {tenant.company_name}
                  </td>

                  <td className="p-4 text-slate-300">
                    {tenant.domain}
                  </td>

                  <td className="p-4 text-slate-300">
                    {tenant.industry}
                  </td>

                  <td className="p-4">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                      {tenant.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() => editTenant(tenant)}
                        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTenant(tenant.id)}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>
                  </td>
              </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-10 text-slate-400"
                >
                  No tenants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={isEdit ? "Edit Tenant" : "Add Tenant"}
      >
        <div className="space-y-4">

          <input
            placeholder="Company Name"
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
          />

          <input
            placeholder="Domain"
            value={domain}
            onChange={(e) =>
              setDomain(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
          />

          <input
            placeholder="Industry"
            value={industry}
            onChange={(e) =>
              setIndustry(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
          />

          <button
            onClick={
                    isEdit
                      ? updateTenant
                      : addTenant
                  }
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-xl font-semibold"
          >
            {isEdit ? "Update Tenant" : "Save Tenant"}
          </button>

        </div>
      </Modal>
      </div>
  );
}