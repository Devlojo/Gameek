import { useState } from "react";
import { UserReviews } from "@/components/ui/UserReviews";
import { UserLikedReviews } from "@/components/ui/UserLikedReviews";
import { clsx } from "clsx";

export const UserActivity = () => {
  const [activeTab, setActiveTab] = useState("myReviews");

  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Mon activité
      </h1>
      <nav className="flex justify-center gap-4">
        <button
          className={clsx(
            "rounded-b-lg bg-customWhite p-2 shadow-md shadow-black",
            activeTab === "myReviews" && "bg-mainYellow",
          )}
          onClick={() => setActiveTab("myReviews")}
        >
          Mes tests
        </button>
        <button
          className={clsx(
            "rounded-b-lg bg-customWhite p-2 shadow-md shadow-black",
            activeTab === "myLikedReviews" && "bg-mainYellow",
          )}
          onClick={() => setActiveTab("myLikedReviews")}
        >
          Les tests que j'ai aimés
        </button>
      </nav>
      {activeTab === "myReviews" ? <UserReviews /> : <UserLikedReviews />}
    </>
  );
};
