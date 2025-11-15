import { useState } from "react";
import axios from "axios";
import { apiUrl } from "@/config";
import { useNavigate } from "react-router-dom";

type TReviewModifyProps = {
  status: string | undefined;
  reviewId: number | undefined;
};
export const ReviewModifyForm = ({ status, reviewId }: TReviewModifyProps) => {
  const navigate = useNavigate();

  const [selectedMessage, setSelectedMessage] = useState("");
  const presetMessages = [
    "Contenu trop vulgaire",
    "Manque de détails",
    "Problème de structure",
    "Incompréhensible",
    "Le contenu n’est pas cohérent avec la note donnée.",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data: csrfRes } = await axios.get(`${apiUrl}/csrf-token`, {
        withCredentials: true,
      });
      const res = await axios.patch(
        `${apiUrl}/back/reviews/${reviewId}`,
        { status, review_feedback: selectedMessage }, // body à envoyer
        {
          withCredentials: true,
          headers: {
            "x-csrf-token": csrfRes.csrfToken,
          },
        },
      );
      if (res.status === 200) {
        navigate("/back");
      }
    } catch (error: any) {
      console.error(error);
    }
    // ici tu enverrais le message au back
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="m-2 flex flex-col items-center gap-2 border border-black/40 p-2"
      >
        <div className="flex items-center gap-2">
          <label htmlFor="modification-message">
            Indiquez ce qui doit être corrigé :
          </label>
          <select
            id="modification-message"
            value={selectedMessage}
            onChange={handleChange}
            className="rounded-md border p-2"
          >
            <option value="">-- Sélectionnez une raison --</option>
            {presetMessages.map((msg, index) => (
              <option key={index} value={msg}>
                {msg}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded bg-mainYellow px-4 py-2 shadow-sm shadow-black hover:opacity-80"
        >
          Envoyer
        </button>
      </form>
    </>
  );
};
