import { FcLike } from "react-icons/fc";
import { TNotification } from "@/types/notification";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { CgCloseR } from "react-icons/cg";
import { RiReplyLine } from "react-icons/ri";
import { BiCommentDetail } from "react-icons/bi";

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
            <span className="font-semibold">{notif.sender_name}</span>{" "}
            {notif.type === "like" && "a aimé votre test sur"}
            {notif.type === "comment" && "a commenté votre test sur"}
            {notif.type === "reply" && "a répondu à votre commentaire sur"}
            {notif.type === "status" &&
              "Un modérateur a mis à jour le statut de votre test sur"}{" "}
            <span className="font-semibold">{notif.game_name}</span>
          </p>
        </Link>
      </div>
      <button onClick={() => setNotif(null)} className="absolute right-1 top-1">
        <CgCloseR className="size-6 text-red-500" />
      </button>
      {notif.type === "like" && (
        <FcLike className="absolute left-1 top-1 size-6" />
      )}
      {notif.type === "comment" && (
        <BiCommentDetail className="absolute left-1 top-1 size-6" />
      )}
      {notif.type === "reply" && (
        <RiReplyLine className="absolute left-1 top-1 size-6" />
      )}
      <p className="absolute bottom-2 right-1 text-xs text-gray-700">
        {notif.created_at}
      </p>
    </div>
  );
};
