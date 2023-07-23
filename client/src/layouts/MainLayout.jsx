import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <div>MainLayout</div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
