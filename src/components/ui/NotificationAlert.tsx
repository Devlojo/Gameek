import { TNotification } from "@/types/notification";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { CgCloseR } from "react-icons/cg";

type TNotificationAlertProps = {
  setNotif: React.Dispatch<React.SetStateAction<TNotification | null>>;
  notif: TNotification;
};

export const NotificationAlert = ({
  setNotif,
  notif,
}: TNotificationAlertProps) => {
  const { user } = useUser();
  return (
    <div className="fixed bottom-2 right-2 z-50 hidden h-32 w-[400px] flex-col bg-customWhite p-5 shadow-sm shadow-black md:flex">
      <div className="flex h-full items-center gap-2">
        {notif.type !== "status_update" && (
          <img
            src={notif.avatar}
            alt="avatar de l'utilisateur"
            className="size-8 rounded-full shadow-sm shadow-black"
          />
        )}

        <Link
          to={`/test/${notif.slug}/${user?.username}`}
          className="transition-transform duration-150 hover:opacity-70"
        >
          {notif.type !== "status_update" && (
            <p className="font-semibold">{notif.sender_name}</p>
          )}
          {notif.type === "like" && (
            <p>
              à aimé votre test sur{" "}
              <span className="font-semibold">{notif.game_name}</span>
            </p>
          )}

          {notif.type === "comment" && (
            <p>
              à commenté votre test sur{" "}
              <span className="font-semibold">{notif.game_name}</span>
            </p>
          )}
          {notif.type === "reply" && (
            <p>
              à répondu à votre commentaire sur{" "}
              <span className="font-semibold">{notif.game_name}</span>
            </p>
          )}
          {notif.type === "publish" && (
            <p>
              à rédigé un test sur{" "}
              <span className="font-semibold">{notif.game_name}</span>
            </p>
          )}
          {notif.status === "a_modifier" && (
            <p>
              Votre test sur{" "}
              <span className="font-semibold">{notif.game_name}</span> doit être
              <span className="font-semibold text-yellow-600"> modifier.</span>
            </p>
          )}
          {notif.status === "refuse" && (
            <p>
              Votre test sur{" "}
              <span className="font-semibold">{notif.game_name}</span> à été
              <span className="font-semibold text-red-600"> refusé.</span>
            </p>
          )}
          {notif.status === "valide" && (
            <p>
              Votre test sur{" "}
              <span className="font-semibold">{notif.game_name}</span> à été
              <span className="font-semibold text-green-600"> validé.</span> et
              sera désormais visible.
            </p>
          )}
        </Link>
      </div>
      <button onClick={() => setNotif(null)} className="absolute right-1 top-1">
        <CgCloseR className="size-6 text-red-500" />
      </button>

      <p className="absolute bottom-2 right-1 text-xs text-gray-700">
        {notif.created_at}
      </p>
    </div>
  );
};
