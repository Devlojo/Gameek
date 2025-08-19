export const Contact = () => {
  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Contact
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex h-[300px] w-[300px] flex-col items-center justify-center rounded-lg bg-customWhite p-6 sm:w-[500px]">
          <form action="" className="flex w-full flex-col gap-6">
            <label htmlFor="email">
              Adresse mail
              <input
                type="email"
                className="w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Entrez votre email"
                id="email"
              />
            </label>

            <label htmlFor="message">
              Message
              <textarea
                className="h-24 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Entrez votre message à l'équipe"
                id="message"
              />
            </label>

            <div className="flex justify-center">
              <button className="rounded-lg bg-mainYellow p-2 shadow-sm shadow-global">
                Envoyez le message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
