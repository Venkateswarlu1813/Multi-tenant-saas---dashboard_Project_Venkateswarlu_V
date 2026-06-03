export default function ConfirmDelete({
  open,
  onClose,
  onConfirm
}) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-2xl w-[400px]">

        <h2 className="text-xl font-bold mb-4">
          Delete Item
        </h2>

        <p className="mb-6">
          Are you sure?
        </p>

        <div className="flex gap-3">

          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-5 py-2 rounded-xl"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="bg-gray-200 px-5 py-2 rounded-xl"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}