import { useCommentsByReview } from "@/queries/useCommentsQuery";
import { BsThreeDotsVertical } from "react-icons/bs";

type TProps = {
  gameSlug: string;
  userName: string;
};
export const Comments = ({ gameSlug, userName }: TProps) => {
  const { comments } = useCommentsByReview(gameSlug, userName);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        {comments?.comments && comments.comments.length > 0 ? (
          <p className="mt-4">{comments?.count} commentaire(s)</p>
        ) : (
          <p className="mt-4">Aucun commentaire pour ce test</p>
        )}

        <div className="flex w-4/5 justify-center border-b border-global/40"></div>
        <div className="flex w-full flex-col gap-4 px-4">
          {comments?.comments.map((comment, index) => (
            <article
              key={index}
              className="flex flex-col flex-wrap bg-global/5 p-2 shadow-sm shadow-black"
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
              <div className="pl-10">
                <p className="text-xs text-gray-800">{comment.created_at}</p>
                <p>{comment.content}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};
