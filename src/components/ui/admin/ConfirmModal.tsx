type TConfirmModalProps = {
  selectedId: number | null;
  handleDelete: (id: number) => void;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const ConfirmModal = ({
  selectedId,
  setSelectedId,
  handleDelete,
  setShowDeleteModal,
}: TConfirmModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-center text-lg font-bold">Confirmation</h2>
        <p className="mt-2">
          Voulez-vous vraiment supprimer ? Cette action est irréversible.
        </p>

        <div className="mt-4 flex justify-center gap-4">
          <button
            className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
            onClick={() => setShowDeleteModal(false)}
          >
            Annuler
          </button>

          <button
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            onClick={() => {
              if (selectedId) {
                handleDelete(selectedId); // suppression
                setShowDeleteModal(false);
                setSelectedId(null);
              }
            }}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};
