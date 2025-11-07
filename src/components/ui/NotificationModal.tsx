import { Link } from "react-router-dom";
import { useNotificationsQuery } from "@/queries/useNotificationsQuery";
import { useUser } from "@/hooks/useUser";
import { clsx } from "clsx";

type TNotificationModalProps = {
  setShowNotificationModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NotificationModal = ({
  setShowNotificationModal,
}: TNotificationModalProps) => {
  const { user } = useUser();
  const { notifications } = useNotificationsQuery(user?.id as number);

  return (
    <>
      <div className="p-2">
        <div className="flex w-full justify-between">
          <h3 className="font-semibold">Notifications</h3>
        </div>
      </div>
      <div className="w-auto border-t border-gray-600"></div>
      <div className="flex flex-col">
        {notifications?.notifications &&
        notifications.notifications.length > 0 ? (
          notifications.notifications.map((notification, index) => {
            // variable pour gérer dynamiquement le username dans le lien
            const linkUsername =
              notification.type === "publish"
                ? notification.sender_name
                : user?.username;
            return (
              <div key={index}>
                <Link
                  to={`/test/${notification.slug}/${linkUsername}`}
                  className={clsx(
                    "relative flex flex-wrap items-center gap-2 p-2 hover:bg-global/40",
                    !notification.is_read && "bg-gray-200",
                  )}
                  onClick={() => setShowNotificationModal(false)}
                >
                  {notification.type !== "status_update" && (
                    <>
                      <img
                        src={notification.avatar}
                        alt="Avatar de l'utilisateur"
                        className="size-8 rounded-full shadow-sm shadow-black"
                      />

                      <p className="font-semibold">
                        {notification.sender_name}
                      </p>
                      {notification.type === "like" && (
                        <p>
                          à aimé votre test sur{" "}
                          <span className="font-semibold">
                            {notification.game_name}
                          </span>
                        </p>
                      )}
                      {notification.type === "comment" && (
                        <p>
                          à commenté votre test sur{" "}
                          <span className="font-semibold">
                            {notification.game_name}
                          </span>
                        </p>
                      )}
                      {notification.type === "reply" && (
                        <p>
                          à répondu à votre commentaire sur{" "}
                          <span className="font-semibold">
                            {notification.game_name}
                          </span>
                        </p>
                      )}
                      {notification.type === "publish" && (
                        <p>
                          à rédigé un test sur{" "}
                          <span className="font-semibold">
                            {notification.game_name}
                          </span>
                        </p>
                      )}
                    </>
                  )}
                  {notification.type === "status_update" && (
                    <>
                      {" "}
                      {notification.status === "a_modifier" && (
                        <p>
                          Votre test sur{" "}
                          <span className="font-semibold">
                            {notification.game_name}
                          </span>{" "}
                          doit être{" "}
                          <span className="font-semibold text-yellow-600">
                            modifier
                          </span>
                        </p>
                      )}
                      {notification.status === "refuse" && (
                        <p>
                          Votre test sur{" "}
                          <span className="font-semibold">
                            {notification.game_name}
                          </span>{" "}
                          à été{" "}
                          <span className="font-semibold text-red-600">
                            refusé
                          </span>
                        </p>
                      )}
                      {notification.status === "valide" && (
                        <p>
                          Votre test sur{" "}
                          <span className="font-semibold">
                            {notification.game_name}
                          </span>{" "}
                          à été{" "}
                          <span className="font-semibold text-green-600">
                            validé
                          </span>{" "}
                          et sera désormais visible
                        </p>
                      )}
                    </>
                  )}

                  <p className="text-sm text-gray-700">
                    {notification.created_at}
                  </p>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="text-center">Aucune notification</p>
        )}
      </div>
    </>
  );
};
