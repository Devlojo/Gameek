import { useState } from "react";
import { clsx } from "clsx";

export const SignIn = (): JSX.Element => {
  const avatars = [
    "adventurer",
    "bottts",
    "avataaars",
    "avataaars-neutral",
    "lorelei",
    "croodles",
    "fun-emoji",
    "personas",
    "pixel-art",
    "shapes",
    "thumbs",
    "open-peeps",
    "big-smile",
    "notionists",
    "micah",
    "glass",
    "rings",
    "lorelei-neutral",
  ];
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const handleAvatar = (event: any) => {
    const avatarName = event.currentTarget.id;
    setSelectedAvatar(avatarName);
  };

  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Inscription
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex w-[300px] flex-col items-center justify-center rounded-lg bg-customWhite p-6 sm:w-[500px]">
          <form action="" className="flex w-full flex-col gap-6">
            {selectedAvatar && (
              <div className="flex justify-center">
                <img
                  src={`https://api.dicebear.com/9.x/${selectedAvatar}/svg`}
                  className="size-20 rounded-full shadow-sm shadow-black"
                ></img>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-4 py-4">
              {avatars.map((avatar) => (
                <img
                  key={avatar}
                  src={`https://api.dicebear.com/9.x/${avatar}/svg`}
                  alt="avatar"
                  className={clsx(
                    "size-16 rounded-full shadow-sm shadow-black hover:cursor-pointer hover:opacity-50",
                    selectedAvatar === avatar && "border-4 border-mainYellow",
                  )}
                  title="Selectionnez votre avatar"
                  id={avatar}
                  onClick={(event) => handleAvatar(event)}
                />
              ))}
            </div>
            <label htmlFor="email">
              Adresse mail
              <input
                type="email"
                className="w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Entrez votre email"
                id="email"
              />
            </label>
            <label htmlFor="username">
              Pseudo
              <input
                type="text"
                className="w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Entrez votre pseudo"
                id="username"
              />
            </label>
            <label htmlFor="password">
              Mot de passe
              <input
                type="password"
                className="w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Entrez votre mot de passe"
                id="password"
              />
            </label>

            <div className="flex justify-center">
              <button className="rounded-lg bg-mainYellow p-2 shadow-sm shadow-global">
                Créer le compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
