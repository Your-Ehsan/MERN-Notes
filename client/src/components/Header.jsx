import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const sameClasses = {
    headerLink:
      "p-4 duration-200 border-b-2 border-green-500 border-opacity-0 cursor-pointer hover:border-opacity-100 hover:text-green-500",
  };
  return (
    <header className="sticky top-0 flex items-center justify-between px-8 bg-white shadow-md header py-02">
      <Link to={"/"}>
        <h1 className="text-4xl">note App</h1>
      </Link>
      <div className="flex justify-end w-3/12">
        <div className="flex items-center">
          {localStorage.getItem("token") === null ? (
            <div className="flex">
              <NavLink
                className={({ isActive }) => (isActive ? "font-bold" : "")}
                to={"login"}
              >
                <div className={sameClasses.headerLink}>Login</div>
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? "font-bold" : "")}
                to={"signup"}
              >
                <div className={sameClasses.headerLink}>Sign Up</div>
              </NavLink>
            </div>
          ) : (
            <Link to={"login"} onClick={() => localStorage.removeItem("token")}>
              <div className={sameClasses.headerLink}>Log Out</div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
