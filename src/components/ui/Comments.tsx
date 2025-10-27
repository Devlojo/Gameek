import { useCommentsByReview } from "@/queries/useCommentsQuery";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAddComment } from "@/queries/useCommentsQuery";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { IoMdSend } from "react-icons/io";
import { CiSquareInfo } from "react-icons/ci";
import { useState } from "react";

type TCommentProps = {
  gameSlug: string;
  userName: string;
  reviewId: number;
};
export const Comments = ({ gameSlug, userName, reviewId }: TCommentProps) => {
  const { comments } = useCommentsByReview(gameSlug, userName);
  const { user } = useUser();
  const [input, setInput] = useState("");

  const { mutate: addCommentMutate } = useAddComment(gameSlug, userName);

  // Quand tu soumets le formulaire :
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("comment");

    addCommentMutate(
      {
        content: content as string,
        review_id: reviewId,
      },
      {
        onSuccess: () => {
          setInput("");
        },
      },
    );
  };

  return (
    <>
      {!user?.username ? (
        <div className="mx-3 mt-4 flex flex-wrap items-center justify-center gap-2 border-2 border-black p-4 font-semibold">
          <CiSquareInfo className="size-10" />
          <p>Vous devez être connecté pour ajouter un commentaire.</p>
          <Link
            to={"/connexion"}
            className="rounded-lg bg-mainYellow p-2 shadow-sm shadow-global"
          >
            Connectez-vous
          </Link>
        </div>
      ) : (
        <form className="mx-3 mt-4 flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full rounded-md border border-black/50 p-2"
            placeholder="Ajoutez un commentaire ..."
            name="comment"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />

          <button>
            <IoMdSend className="size-6" />
          </button>
        </form>
      )}
      <div className="flex flex-col items-center justify-center gap-4">
        {comments?.comments && comments.comments.length > 0 ? (
          <>
            <p className="mt-4">{comments?.count} commentaire(s)</p>
            <div className="flex w-4/5 justify-center border-b border-global/40"></div>
            <div className="flex w-full flex-col gap-4 px-4">
              {comments?.comments.map((comment, index) => (
                <article
                  key={index}
                  className="flex flex-col flex-wrap rounded-b-xl bg-global/5 p-2 shadow-sm shadow-black"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={comment.avatar}
                      alt={`Avatar de ${comment.username}`}
                      className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                    />

                    <p className="font-semibold">{comment.username}</p>

                    <div className="flex w-full justify-end">
                      <BsThreeDotsVertical className="size-4" />
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 pl-10">
                    <p className="text-xs text-gray-800">
                      {comment.created_at}
                    </p>
                    <p>{comment.content}</p>
                    <button className="text-sm font-bold text-gray-600">
                      Répondre
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-4">Aucun commentaire pour ce test</p>
        )}
      </div>
    </>
  );
};
