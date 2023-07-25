import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 flex items-center justify-between px-8 bg-white shadow-md header py-02">
      <Link to={"/"}>
        <h1 className="text-4xl">note App</h1>
      </Link>
      <div className="flex justify-end w-3/12">
        <ul className="flex items-center">
          <NavLink
            className={({ isActive }) => (isActive ? "bold underline" : "")}
            to={"login"}
          >
            <li className="p-4 duration-200 border-b-2 border-green-500 border-opacity-0 cursor-pointer hover:border-opacity-100 hover:text-green-500">
              Login
            </li>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "bold underline" : "")}
            to={"signup"}
          >
            <li className="p-4 duration-200 border-b-2 border-green-500 border-opacity-0 cursor-pointer hover:border-opacity-100 hover:text-green-500">
              Sign Up
            </li>
          </NavLink>
        </ul>
      </div>
    </header>
  );
};

export default Header;
