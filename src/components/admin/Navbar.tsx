import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const menu = [
    { name: "Tableau de bord", path: "/back" },
    { name: "Tests", path: "/back/tests" },
    { name: "Utilisateurs", path: "/back/utilisateurs" },
  ];

  return (
    <div className="flex w-full overflow-x-auto bg-gray-800 p-4 text-customWhite">
      <nav className="flex justify-between sm:w-full">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/back"} // active exactement pour /back
            className={({ isActive }) =>
              `rounded p-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
