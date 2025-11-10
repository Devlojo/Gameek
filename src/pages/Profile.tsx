import { useUser } from "@/hooks/useUser";

export const Profile = () => {
  const { user } = useUser();
  console.log(user?.created_at);

  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Profil
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex w-[300px] flex-col items-center justify-center rounded-lg bg-customWhite p-6 sm:w-[500px]">
          <p>Pseudo : {user?.username}</p>
          <p>{user?.created_at}</p>
        </div>
      </div>
    </>
  );
};
