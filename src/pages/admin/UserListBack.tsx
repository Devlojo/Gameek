import { Navbar } from "@/components/admin/Navbar";
import { ConfirmModal } from "@/components/ui/admin/ConfirmModal";
import { useGetAllUsersQuery } from "@/queries/admin/useUsersQuery";
import { TUserRole } from "@/types/user";
import axios from "axios";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Navigate } from "react-router-dom";
export const UserListBack = ({ userRole }: TUserRole) => {
  const { users } = useGetAllUsersQuery();
  if (userRole !== "admin") {
    return <Navigate to={"/"} replace />;
  }

  const [requestError, setRequestError] = useState(false);
  const [message, setMessage] = useState<string>();
  const [localUsers, setLocalUsers] = useState(users?.users || []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`${apiUrl}/back/users/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setMessage(res.data?.message);
        setLocalUsers((prev) => prev.filter((user) => user.id !== id));
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error: any) {
      setMessage(error.response.data?.message);

      setRequestError(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div>
      <h2 className="my-4 text-center text-3xl font-bold text-customWhite">
        Liste des utilisateurs
      </h2>
      <Navbar />
      {showDeleteModal && (
        <ConfirmModal
          handleDelete={handleDelete}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      <div className="overflow-x-auto rounded bg-customWhite shadow">
        {requestError && (
          <p className="text-center font-bold text-red-600">{message}</p>
        )}
        {!requestError && message && (
          <p className="text-center font-bold text-green-600">{message}</p>
        )}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Username
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {localUsers?.map((user, index) => (
              <tr key={user.id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="flex gap-3 px-4 py-2">
                  <FaEdit className="" />
                  <button
                    aria-label="Delete"
                    onClick={() => {
                      setSelectedId(user.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FaRegTrashAlt className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
