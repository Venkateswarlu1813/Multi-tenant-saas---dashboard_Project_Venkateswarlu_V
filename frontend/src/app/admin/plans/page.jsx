"use client";

import { useEffect, useState } from "react";
import API from "../../../services/api";
import Modal from "../../../components/Modal";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await API.get("/plans/");

      if (Array.isArray(res.data)) {
        setPlans(res.data);
      } else if (res.data.results) {
        setPlans(res.data.results);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const addPlan = async () => {
    try {
      await API.post("/plans/", {
        name,
        price,
        duration_days: duration,
        description,
      });

      alert("Plan Added Successfully");

      setName("");
      setPrice("");
      setDuration("");
      setDescription("");

      setOpen(false);

      fetchPlans();
    } catch (err) {
      console.log(err);
      alert("Failed To Add Plan");
    }
  };

  const deletePlan = async (id) => {
    try {
      await API.delete(`/plans/${id}/`);

      alert("Plan Deleted");

      fetchPlans();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };
  const editPlan = (plan) => {
  setEditId(plan.id);
  setName(plan.name);
  setPrice(plan.price);
  setDuration(plan.duration_days);
  setDescription(plan.description);

  setIsEdit(true);
  setOpen(true);
};

const updatePlan = async () => {
  try {
    await API.put(`/plans/${editId}/`, {
      name,
      price,
      duration_days: duration,
      description,
    });

    alert("Plan Updated Successfully");

    setOpen(false);

    setName("");
    setPrice("");
    setDuration("");
    setDescription("");

    setIsEdit(false);
    setEditId(null);

    fetchPlans();

  } catch (err) {
    console.log(err);
    alert("Update Failed");
  }
};

  return (
    <div className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Subscription Plans
          </h1>

          <p className="text-slate-400 mt-2">
            Manage all pricing plans
          </p>
        </div>

        <button
            onClick={() => {
              setIsEdit(false);
              setEditId(null);

              setName("");
              setPrice("");
              setDuration("");
              setDescription("");

              setOpen(true);
            }}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
        >
          + Add Plan
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Total Plans
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {plans.length}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Lowest Price
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-400">
            ₹
            {plans.length
              ? Math.min(...plans.map((p) => Number(p.price)))
              : 0}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Highest Price
          </p>

          <h2 className="text-3xl font-bold mt-2 text-blue-400">
            ₹
            {plans.length
              ? Math.max(...plans.map((p) => Number(p.price)))
              : 0}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Active Plans
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {plans.length}
          </h2>
        </div>

      </div>

      {loading ? (
  <div className="text-center">
    Loading...
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

    {plans.map((plan) => (
      <div
        key={plan.id}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
      >
        <h2 className="text-2xl font-bold">
          {plan.name}
        </h2>

        <p className="text-5xl font-bold mt-5">
          ₹{plan.price}
        </p>

        <p className="text-slate-400 mt-4">
          {plan.description}
        </p>

        <p className="mt-3 text-sm text-blue-400">
          {plan.duration_days} Days
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => editPlan(plan)}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 py-3 rounded-xl font-semibold text-white"
          >
            Edit
          </button>

          <button
            onClick={() => deletePlan(plan.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold text-white"
          >
            Delete
          </button>
        </div>
      </div>
    ))}

  </div>
)}

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title={isEdit ? "Edit Plan" : "Add Plan"}
>
  <div className="space-y-4">

    <input
      placeholder="Plan Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
    />

    <input
      placeholder="Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
    />

    <input
      placeholder="Duration Days"
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
      className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
    />

    <textarea
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
    />

    <button
      onClick={isEdit ? updatePlan : addPlan}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl"
    >
      {isEdit ? "Update Plan" : "Save Plan"}
    </button>

  </div>
</Modal>

</div>
);
}