import { Link, useParams } from "react-router-dom";

export const Menu = () => {
  const { id } = useParams();
  return (
    <ul className="mx-3 my-2 flex items-center justify-between md:my-4">
      <li>
        <Link
          to={`/games/${id}`}
          className="rounded-md bg-mainYellow p-1 shadow-md shadow-global md:p-2 md:px-10"
        >
          Général
        </Link>
      </li>

      <li>
        <Link
          to={`/games/reviews/${id}`}
          className="rounded-md p-1 shadow-md shadow-global hover:opacity-80 md:p-2 md:px-10"
        >
          Tests
        </Link>
      </li>
      <li>
        <Link
          to={`/games/screenshots/${id}`}
          className="rounded-md p-1 shadow-md shadow-global hover:opacity-80 md:p-2 md:px-10"
        >
          Images
        </Link>
      </li>
      <li>
        <Link
          to={`/games/videos/${id}`}
          className="rounded-md p-1 shadow-md shadow-global hover:opacity-80 md:p-2 md:px-10"
        >
          Videos
        </Link>
      </li>
    </ul>
  );
};
