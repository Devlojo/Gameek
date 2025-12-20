import { apiUrl } from "@/config";
import { useGetUserByNameQuery } from "@/queries/admin/useUsersQuery";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const ProfileBack = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useGetUserByNameQuery(username as string);
  const roles = ["admin", "user", "moderator"];
  const [selectedRole, setSelectedRole] = useState<string>();

  useEffect(() => {
    if (user?.role) {
      setSelectedRole(user?.role);
    }
  }, [user]);

  const handleOnChange = async (e: any) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);

    try {
      const { data: csrfRes } = await axios.get(`${apiUrl}/csrf-token`, {
        withCredentials: true,
      });
      const res = await axios.patch(
        `${apiUrl}/back/users/${user?.id}`,
        { role: newRole }, // body à envoyer
        {
          withCredentials: true,
          headers: {
            "x-csrf-token": csrfRes.csrfToken,
          },
        },
      );
      if (res.status === 200) {
        navigate("/back");
      }
    } catch (error: any) {}
  };

  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Profil de {username}
      </h1>
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
            {user?.role === "admin" ? (
              <p>
                <span className="font-semibold">Role : </span>
                {user?.role}
              </p>
            ) : (
              <div>
                <label htmlFor="role-select" className="font-semibold">
                  Rôle :{" "}
                </label>
                <select
                  id="role-select"
                  value={selectedRole}
                  onChange={(e) => handleOnChange(e)}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
