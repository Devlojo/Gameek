import {
  useCommentsByReview,
  useReportCommentById,
} from "@/queries/useCommentsQuery";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  useAddComment,
  useDeleteCommentById,
} from "@/queries/useCommentsQuery";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { IoMdSend } from "react-icons/io";
import { CiSquareInfo } from "react-icons/ci";
import { useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";

type TCommentProps = {
  gameSlug: string;
  userName: string;
  reviewId: number;
};
export const Comments = ({ gameSlug, userName, reviewId }: TCommentProps) => {
  const { comments } = useCommentsByReview(gameSlug, userName);
  const { user } = useUser();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const notConnectedRef = useRef<HTMLDivElement | null>(null);
  const [replyToComment, setReplyToComment] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const mainComments = comments?.comments.filter((c) => !c.parent_id);
  const [showRepliesFor, setShowRepliesFor] = useState<number[]>([]);
  const [openActionComments, setOpenActionComments] = useState<number[]>([]);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const { mutate: addCommentMutate } = useAddComment(gameSlug, userName);
  const { mutate: deleteComment } = useDeleteCommentById(gameSlug, userName);
  const { mutate: reportComment } = useReportCommentById();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("comment");

    addCommentMutate(
      {
        content: content as string,
        review_id: reviewId,
        parent_id: replyToCommentId,
      },
      {
        onSuccess: () => {
          setInput("");
          setReplyToCommentId(null);
        },
      },
    );
  };

  const handleReply = (id: number, username: string, comment: string) => {
    setReplyToCommentId(id);
    setReplyToComment(`@${username} : ${comment}`);
    if (!user) {
      notConnectedRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      notConnectedRef.current?.focus();
    } else {
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      inputRef.current?.focus();
    }
  };

  const handleReport = (commentId: number) => {
    if (!user) {
      notConnectedRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      notConnectedRef.current?.focus();
    } else {
      reportComment(commentId);
      setActionMessage("Le commentaire a bien été signalé");

      // faire disparaître le message après 3 secondes
      setTimeout(() => {
        setActionMessage(null);
      }, 3000);
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      inputRef.current?.focus();
      setOpenActionComments((prev) =>
        prev.includes(commentId)
          ? prev.filter((id) => id !== commentId)
          : [...prev, commentId],
      );
    }
  };
  const handleCloseReply = () => {
    setReplyToCommentId(null);
  };

  const handleShowReplies = (commentId: number) => {
    setShowRepliesFor(
      (prev) =>
        prev.includes(commentId)
          ? prev.filter((id) => id !== commentId) // si déjà ouvert, on ferme (retourne tout les elements du tableau dont l'id !== commentId)
          : [...prev, commentId], // sinon on ouvre
    );
  };

  const handleOpenActionComments = (commentId: number) => {
    setOpenActionComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId],
    );
  };

  return (
    <>
      {!user?.username ? (
        <div
          className="mx-3 mt-4 flex flex-wrap items-center justify-center gap-2 border-2 border-black p-4 font-semibold"
          ref={notConnectedRef}
        >
          <CiSquareInfo className="size-10" />
          <p>
            Vous devez être connecté pour ajouter, répondre ou signaler un
            commentaire.
          </p>
          <Link
            to={"/connexion"}
            className="rounded-lg bg-mainYellow p-2 shadow-sm shadow-global"
          >
            Connectez-vous
          </Link>
        </div>
      ) : (
        <>
          {replyToCommentId && (
            <div className="mx-3 mt-4 flex items-center justify-between gap-1 rounded-md bg-global/5 p-2 shadow-sm shadow-black">
              <p>
                Répondre à{" "}
                <span className="font-semibold">{replyToComment}</span>
              </p>
              <button className="hover:opacity-80" onClick={handleCloseReply}>
                <IoMdCloseCircle className="size-6 text-red-500" />
              </button>
            </div>
          )}

          <form className="mx-3 mt-4 flex gap-2" onSubmit={handleSubmit}>
            <textarea
              className="w-full rounded-md border border-black/50 p-2"
              placeholder={
                replyToCommentId
                  ? "Ajouter une réponse"
                  : "Ajouter un commentaire"
              }
              name="comment"
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              ref={inputRef}
              rows={3}
            />

            <button>
              <IoMdSend className="size-6" />
            </button>
          </form>
        </>
      )}
      <div className="flex flex-col items-center justify-center gap-4">
        {comments?.comments && comments.comments.length > 0 ? (
          <>
            <p className="mt-4">{comments?.count} commentaire(s)</p>
            <div className="flex w-4/5 justify-center border-b border-global/40"></div>
            <div className="flex w-full flex-col gap-4 px-4">
              {actionMessage && (
                <p className="text-green-700">{actionMessage}</p>
              )}

              {mainComments?.map((comment, index) => {
                const replyCount = comments.comments.filter(
                  (c: any) => c.parent_id === comment.id,
                ).length;

                const replies = comments.comments.filter(
                  (c: any) => c.parent_id === comment.id,
                );

                return (
                  <article
                    key={index}
                    className="flex flex-col rounded-b-xl bg-global/5 p-2 shadow-sm shadow-black"
                  >
                    <div className="flex items-start gap-2">
                      <img
                        src={comment.avatar}
                        alt={`Avatar de ${comment.username}`}
                        className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                      />
                      <div className="flex flex-1 flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{comment.username}</p>
                          <div className="relative">
                            <button
                              onClick={() =>
                                handleOpenActionComments(comment.id)
                              }
                            >
                              <BsThreeDotsVertical className="size-4" />
                            </button>
                            {openActionComments.includes(comment.id) && (
                              <div className="absolute right-0 flex flex-col rounded-md bg-surface p-2 text-light">
                                <button
                                  className="rounded-md p-1 hover:bg-gray-700"
                                  onClick={() => handleReport(comment.id)}
                                >
                                  Signaler
                                </button>
                                {user?.role === "admin" && (
                                  <button
                                    className="rounded-md p-1 hover:bg-gray-700"
                                    onClick={() => deleteComment(comment.id)}
                                  >
                                    Supprimer le commentaire
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-800">
                          {comment.created_at}
                        </p>
                        <p>{comment.content}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-col items-start gap-2">
                      <button
                        type="button"
                        className="rounded-md p-2 text-xs font-bold text-gray-600 shadow-sm shadow-global hover:bg-mainYellow hover:text-black"
                        onClick={() =>
                          handleReply(
                            comment.id,
                            comment.username,
                            comment.content,
                          )
                        }
                      >
                        Répondre
                      </button>

                      {replyCount > 0 && (
                        <button
                          className="flex items-center gap-1 rounded-md p-2 sm:hover:bg-mainYellow"
                          onClick={() => handleShowReplies(comment.id)}
                        >
                          {showRepliesFor.includes(comment.id) ? (
                            <RiArrowDropUpLine className="size-6" />
                          ) : (
                            <RiArrowDropDownLine className="size-6" />
                          )}

                          <p className="text-sm"> {replyCount} réponses</p>
                        </button>
                      )}
                      {showRepliesFor.includes(comment.id) && (
                        <div className="flex w-full flex-col gap-4 px-4">
                          {replies.map((reply, index) => (
                            <article key={index} className="flex flex-col">
                              <div className="flex items-start gap-2">
                                <img
                                  src={reply.avatar}
                                  alt={`Avatar de ${reply.username}`}
                                  className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                                />
                                <div className="flex flex-1 flex-col gap-2">
                                  <div className="flex items-center justify-between">
                                    <p className="font-semibold">
                                      {reply.username}
                                    </p>
                                    <div className="relative">
                                      <button
                                        onClick={() =>
                                          handleOpenActionComments(reply.id)
                                        }
                                      >
                                        <BsThreeDotsVertical className="size-4" />
                                      </button>
                                      {openActionComments.includes(
                                        reply.id,
                                      ) && (
                                        <div className="absolute right-0 flex flex-col rounded-md bg-surface p-2 text-light">
                                          <button
                                            className="rounded-md p-1 hover:bg-gray-700"
                                            onClick={() =>
                                              handleReport(reply.id)
                                            }
                                          >
                                            Signaler
                                          </button>
                                          {user?.role === "admin" && (
                                            <button
                                              className="rounded-md p-1 hover:bg-gray-700"
                                              onClick={() =>
                                                deleteComment(reply.id)
                                              }
                                            >
                                              Supprimer le commentaire
                                            </button>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-800">
                                    {reply.created_at}
                                  </p>
                                  <p>{reply.content}</p>
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          <p className="mt-4">Aucun commentaire pour ce test</p>
        )}
      </div>
    </>
  );
};
