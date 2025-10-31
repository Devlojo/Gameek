import { CgCloseR } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useNotificationsQuery } from "@/queries/useNotificationsQuery";

type TNotificationModalProps = {
  setShowNotificationModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NotificationModal = ({
  setShowNotificationModal,
}: TNotificationModalProps) => {
  const { notifications } = useNotificationsQuery();

  return (
    <div className="absolute right-0 top-full z-50 flex h-96 w-[500px] flex-col overflow-y-auto rounded-md bg-customWhite text-black shadow-sm shadow-black">
      <div className="p-2">
        <div className="flex w-full justify-between">
          <h3 className="font-semibold">Notifications</h3>
          <button
            onClick={() => setShowNotificationModal((prev) => !prev)}
            className="hover:opacity-70"
          >
            <CgCloseR className="size-6" />
          </button>
        </div>
      </div>
      <div className="w-auto border-t border-gray-600"></div>
      <div className="flex flex-col gap-2 p-2">
        {notifications?.notifications &&
          notifications.notifications.length > 0 &&
          notifications.notifications.map((notification, index) => (
            <Link to={"/"} className="flex justify-between gap-2" key={index}>
              <img
                src={notification.avatar}
                alt="Avatar de l'utilisateur"
                className="size-8 rounded-full shadow-sm shadow-black"
              />
              <p>{notification.sender_name}</p>
              <p> à liké votre test sur {notification.game_name}</p>
              <p>{notification.created_at}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};
