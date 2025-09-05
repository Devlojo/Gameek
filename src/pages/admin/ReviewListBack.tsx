import { Navbar } from "@/components/admin/Navbar";
import { useGetAllReviewsQuery } from "@/queries/admin/useReviewsQuery";
import { TUserRole } from "@/types/user";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { GoIssueClosed } from "react-icons/go";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ConfirmModal } from "@/components/ui/admin/ConfirmModal";

export const ReviewListBack = ({ userRole }: TUserRole) => {
  const { reviews } = useGetAllReviewsQuery();

  if (userRole !== "admin") {
    return <Navigate to={"/"} replace />;
  }

  const [requestError, setRequestError] = useState(false);
  const [message, setMessage] = useState<string>();
  const [localReviews, setLocalReviews] = useState(reviews?.reviews || []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`${apiUrl}/back/reviews/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setMessage(res.data?.message);
        setLocalReviews((prev) => prev.filter((review) => review.id !== id));
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error: any) {
      setMessage(error.response.data?.message);

      setRequestError(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <h2 className="my-4 text-center text-3xl font-bold text-customWhite">
        Liste des tests
      </h2>

      <Navbar />
      {showDeleteModal && (
        <ConfirmModal
          handleDelete={handleDelete}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      <div className="overflow-x-auto rounded bg-customWhite shadow">
        {requestError && (
          <p className="text-center font-bold text-red-600">{message}</p>
        )}
        {!requestError && message && (
          <p className="text-center font-bold text-green-600">{message}</p>
        )}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Pseudo du testeur
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Nom du jeu
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Vérifié
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Date de création
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {localReviews?.map((review, index) => (
              <tr key={review.id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{review.id}</td>
                <td className="px-4 py-2">{review.username}</td>
                <td className="px-4 py-2">{review.name}</td>
                <td className="px-4 py-2">
                  {review.is_verify === false ? (
                    <IoMdCloseCircleOutline className="size-6 text-red-600" />
                  ) : (
                    <GoIssueClosed className="size-6 text-green-600" />
                  )}
                </td>
                <td className="px-4 py-2">{review.created_at}</td>
                <td className="flex gap-3 px-4 py-2">
                  <Link to={`/test/${review.slug}/${review.username}`}>
                    <FaEye />
                  </Link>
                  <button
                    aria-label="Delete"
                    onClick={() => {
                      setSelectedId(review.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FaRegTrashAlt className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
