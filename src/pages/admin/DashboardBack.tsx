import { Navbar } from "@/components/admin/Navbar";
import { useGetAllUsersQuery } from "@/queries/admin/useUsersQuery";
import { useGetAllReviewsQuery } from "@/queries/admin/useReviewsQuery";
import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router-dom";

export const DashboardBack = () => {
  const { users } = useGetAllUsersQuery();
  const { reviews } = useGetAllReviewsQuery();
  const pendingReviews = reviews?.reviews.filter(
    (review) => review.status !== "valide",
  );

  const { user } = useUser();
  if (user?.role !== "admin") {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div>
      <h2 className="my-4 text-center text-3xl font-bold text-customWhite">
        Tableau de bord
      </h2>
      <Navbar />
      <div className="flex gap-4">
        <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:justify-around">
          <div className="rounded bg-white p-4 shadow">
            Nombre d’utilisateurs :{" "}
            <span className="text-lg font-bold">{users?.users.length}</span>
          </div>
          <div className="rounded bg-white p-4 shadow">
            Tests non valides :{" "}
            <span className="text-lg font-bold">
              {pendingReviews?.length}/{reviews?.reviews.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
