import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
      <Link to={"/"}>
        <h1 className="text-4xl">note App</h1>
      </Link>
      <div className="w-3/12 flex justify-end">
        <ul className="flex items-center">
          <NavLink
            className={({ isActive }) => (isActive ? "bold underline" : "")}
            to={"login"}
          >
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              Login
            </li>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "bold underline" : "")}
            to={"signup"}
          >
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              Sign Up
            </li>
          </NavLink>
        </ul>
      </div>
    </header>
  );
};

export default Header;
