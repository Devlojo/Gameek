import { IoMdThumbsUp } from "react-icons/io";
import { TNotification } from "@/types/notification";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";

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
      <div className="flex h-full items-center justify-between gap-2">
        <img
          src={notif.avatar}
          alt="avatar de l'utilisateur"
          className="size-8 rounded-full shadow-sm shadow-black"
        />
        <Link to={`/test/${notif.slug}/${user?.username}`}>
          <p>
            {" "}
            <span className="font-semibold">{notif.sender_name}</span> à aimé
            votre test sur {notif.game_name}
          </p>
          <IoMdThumbsUp className="size-4" />
        </Link>
        <button onClick={() => setNotif(null)}>X</button>
      </div>
    </div>
  );
};
