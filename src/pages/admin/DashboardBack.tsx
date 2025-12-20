import { Navbar } from "@/components/admin/Navbar";
import { useGetAllUsersQuery } from "@/queries/admin/useUsersQuery";
import { useGetAllReviewsQuery } from "@/queries/admin/useReviewsQuery";
import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router-dom";
import { BsPersonStanding } from "react-icons/bs";
import { PiArticleFill } from "react-icons/pi";
import { FaCommentSlash } from "react-icons/fa";
import { useGetAllReportedComments } from "@/queries/admin/useCommentsQuery";

export const DashboardBack = () => {
  const { users } = useGetAllUsersQuery();
  const { reviews } = useGetAllReviewsQuery();
  const { reportedComments } = useGetAllReportedComments();
  const pendingReviews = reviews?.reviews.filter(
    (review) => review.status !== "valide",
  );

  const { user } = useUser();
  if (user?.role !== "admin" && user?.role !== "moderator") {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div>
      <h2 className="my-4 text-center text-3xl font-bold text-customWhite">
        Tableau de bord
      </h2>
      <Navbar />
      <div className="flex flex-col items-center gap-4 bg-gray-400 p-4">
        <div className="flex w-full flex-wrap items-start justify-center gap-2 sm:justify-around">
          {user.role === "admin" && (
            <div className="flex items-center gap-2 rounded bg-white p-4 shadow-md shadow-global">
              <BsPersonStanding className="size-6 text-green-600" />
              <p>Nombre d’utilisateurs : </p>
              <p className="text-lg font-bold">{users?.users.length}</p>
            </div>
          )}

          <div className="flex items-center gap-2 rounded bg-white p-4 shadow-md shadow-global">
            <PiArticleFill className="size-6 text-yellow-600" />

            <p>Tests non valides : </p>
            <p className="text-lg font-bold">
              {pendingReviews?.length}/{reviews?.reviews.length}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded bg-white p-4 shadow-md shadow-global">
            <FaCommentSlash className="size-6 text-red-600" />

            <p>Commentaire signalés : </p>
            <p className="text-lg font-bold">
              {reportedComments?.reportedComments.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
