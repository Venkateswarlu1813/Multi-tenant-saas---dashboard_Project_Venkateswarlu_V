export default function Modal({
  open,
  onClose,
  title,
  children,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-[550px] shadow-2xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 text-2xl"
          >
            ✕
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}