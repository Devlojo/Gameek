export const SignIn = (): JSX.Element => {
  return (
    <>
      <div className="fixed z-30 flex h-96 w-96 flex-col items-center justify-center gap-8 rounded-2xl bg-white p-2 shadow-md shadow-black">
        {" "}
        <h2 className="text-center text-2xl font-bold text-black">
          {" "}
          S'inscrire{" "}
        </h2>
        <form action="" className="flex flex-col gap-6">
          <label htmlFor="" className="text-black">
            {" "}
            Pseudo
            <input
              type="text"
              className="w-full rounded-md border border-black"
              placeholder="Entrez votre pseudo"
            />
          </label>
          <label htmlFor="" className="text-black">
            Mot de passe
            <input
              type="password"
              className="w-full rounded-md border border-black"
              placeholder="Entrez votre mot de passe"
            />
          </label>
          <label htmlFor="" className="text-black">
            Adresse mail
            <input
              type="email"
              className="w-full rounded-md border border-black"
              placeholder="Entrez votre email"
            />
          </label>
          <button className="rounded-lg bg-mainYellow p-2">
            Créer le compte
          </button>
        </form>
      </div>
    </>
  );
};
