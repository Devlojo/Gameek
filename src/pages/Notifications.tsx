import { useNotificationsQuery } from "@/queries/useNotificationsQuery";
import { useUser } from "@/hooks/useUser";
import { Link, Navigate } from "react-router-dom";
import { clsx } from "clsx";
import { Loader } from "@/components/ui/Loader";
import { useNotificationCount } from "@/hooks/useNotificationCount";
import { useEffect } from "react";

export const Notifications = () => {
  const { user } = useUser();
  const { notifications, isLoading } = useNotificationsQuery(
    user?.id as number,
  );

  const { setNotifCount } = useNotificationCount();

  if (!user) {
    return <Navigate to={"/connexion"} />;
  }

  useEffect(() => {
    setNotifCount(0);
  }, [setNotifCount]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
            Liste des notifications
          </h1>
          <section className="flex w-full flex-col gap-2 rounded-md">
            <div className="flex flex-col gap-2">
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
                          "relative flex flex-wrap items-center gap-2 bg-customWhite p-2 hover:opacity-70",
                          !notification.is_read && "bg-gray-200",
                        )}
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
                <p>Aucune notification</p>
              )}
            </div>
          </section>{" "}
        </>
      )}
    </>
  );
};
