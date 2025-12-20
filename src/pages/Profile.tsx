import { ConfirmModal } from "@/components/ui/admin/ConfirmModal";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "@/config";
import axios from "axios";

export const Profile = () => {
  const { user } = useUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedId, setSelectedId] = useState<number | null>(
    user?.id as number,
  );

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${apiUrl}/users/delete`, {
        withCredentials: true,
      });
      if (res.status === 200) {
      }
    } catch (error: any) {}
  };

  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Mon profil
      </h1>
      {showDeleteModal && (
        <ConfirmModal
          handleDelete={handleDelete}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      <div className="flex flex-col items-center">
        <div className="flex w-[300px] flex-col items-center justify-center gap-2 rounded-lg bg-customWhite p-6 sm:w-[500px]">
          <p className="text-center font-semibold">Avatar :</p>

          <img
            src={user?.image}
            alt={`Avatar de ${user?.username}`}
            className="size-20 rounded-full shadow-sm shadow-black"
          ></img>
          <div className="flex flex-col justify-start gap-2 border border-black/20 p-4">
            <p>
              <span className="font-semibold">Pseudo : </span>
              {user?.username}
            </p>
            <p>
              <span className="font-semibold">Adresse mail : </span>
              {user?.email}
            </p>
            <p>
              <span className="font-semibold">
                Date de création de compte :{" "}
              </span>
              {user?.created_at.slice(0, 10).split("-").reverse().join("/")}
            </p>
            <Link
              to={"/modification-du-compte"}
              className="p-2 text-center shadow-sm shadow-black hover:bg-mainYellow"
            >
              Modifier le profil
            </Link>
            <button
              className="bg-red-600 p-2 text-center text-customWhite shadow-sm shadow-black hover:opacity-80"
              onClick={() => setShowDeleteModal(true)}
            >
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
