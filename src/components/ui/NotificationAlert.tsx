import { IoMdThumbsUp } from "react-icons/io";
import avatar from "@/assets/react.svg";

type TNotificationAlertProps = {
  setShowNotificationAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NotificationAlert = ({
  setShowNotificationAlert,
}: TNotificationAlertProps) => {
  return (
    <div className="fixed bottom-2 right-2 z-50 flex h-20 w-96 flex-col bg-customWhite p-5 shadow-sm shadow-black">
      <div className="flex items-center justify-between">
        <img
          src={avatar}
          alt="avatar de l'utilisateur"
          className="size-8 rounded-full shadow-sm shadow-black"
        />
        <p>
          {" "}
          <span className="font-semibold">Paul</span> à aimé votre test sur
          Tekken 8
        </p>
        <IoMdThumbsUp className="size-4" />
        <button onClick={() => setShowNotificationAlert((prev) => !prev)}>
          X
        </button>
      </div>
    </div>
  );
};
