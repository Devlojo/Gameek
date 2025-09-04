import { Navbar } from "@/components/admin/Navbar";
import { useGetAllUsersQuery } from "@/queries/admin/useUsersQuery";
import { TUserRole } from "@/types/user";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Navigate } from "react-router-dom";
export const UserListBack = ({ userRole }: TUserRole) => {
  const { users } = useGetAllUsersQuery();
  if (userRole !== "admin") {
    return <Navigate to={"/"} replace />;
  }

  const apiUrl = import.meta.env.VITE_API_URL;
  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`${apiUrl}/back/users/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        alert("Utilisateur supprimé");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la connexion. Vérifiez vos identifiants");
    }
  };
  return (
    <div>
      <h2 className="my-4 text-center text-3xl font-bold text-customWhite">
        Liste des utilisateurs
      </h2>
      <Navbar />
      <div className="overflow-x-auto rounded bg-customWhite shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
            {users?.users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="flex gap-3 px-4 py-2">
                  <FaEdit className="" />
                  <button
                    aria-label="Delete"
                    onClick={() => handleDelete(user.id)}
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
