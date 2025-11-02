import { CgCloseR } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useNotificationsQuery } from "@/queries/useNotificationsQuery";
import { useUser } from "@/hooks/useUser";

type TNotificationModalProps = {
  setShowNotificationModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NotificationModal = ({
  setShowNotificationModal,
}: TNotificationModalProps) => {
  const { user } = useUser();
  const { notifications } = useNotificationsQuery(user?.id as number);
  return (
    <div className="absolute right-0 top-full z-50 flex h-96 w-[600px] flex-col overflow-y-auto rounded-md bg-customWhite text-black shadow-sm shadow-black">
      <div className="p-2">
        <div className="flex w-full justify-between">
          <h3 className="font-semibold">Notifications</h3>
          <button
            onClick={() => setShowNotificationModal((prev) => !prev)}
            className="hover:opacity-70"
          >
            <CgCloseR className="size-6 text-red-500" />
          </button>
        </div>
      </div>
      <div className="w-auto border-t border-gray-600"></div>
      <div className="flex flex-col gap-2 p-2">
        {notifications?.notifications &&
        notifications.notifications.length > 0 ? (
          notifications.notifications.map((notification, index) => (
            <div key={index}>
              <Link
                to={`/test/${notification.slug}/${user?.username}`}
                className="flex flex-wrap items-center gap-2"
              >
                <img
                  src={notification.avatar}
                  alt="Avatar de l'utilisateur"
                  className="size-8 rounded-full shadow-sm shadow-black"
                />
                <p className="font-semibold">{notification.sender_name}</p>
                <p>à aimé votre test sur</p>
                <p className="font-semibold">{notification.game_name}</p>

                <p className="text-sm text-gray-700">
                  {notification.created_at}
                </p>
              </Link>
              <div className="w-auto border-t border-gray-600/40"></div>
            </div>
          ))
        ) : (
          <p>Aucune notification</p>
        )}
      </div>
    </div>
  );
};
