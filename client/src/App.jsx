import PropTypes from "prop-types";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login, { LoginAction } from "./pages/Login";
import Signup, { SignupAction } from "./pages/Signup";
import { HomeLoader } from "./utilities/HomeLoader";
import { NotesContextProvider } from "./contexts/NotesContext";

function App() {
  const ProtectedRoute = ({ children }) => {
    if (localStorage.getItem("token") === null) {
      return <Navigate to={"login"} replace />;
    }
    return children;
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.element,
  };

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route element={<MainLayout />}>
            {/* TODO: convert this ⬆ to versions */}
            <Route
              index
              errorElement={<h1>error occured</h1>}
              loader={HomeLoader}
              element={
                <ProtectedRoute>
                  <NotesContextProvider>
                    <Home />
                  </NotesContextProvider>
                </ProtectedRoute>
              }
            />
            <Route action={LoginAction} path="login" element={<Login />} />
            <Route path="signup" action={SignupAction} element={<Signup />} />
          </Route>
        )
      )}
    />
  );
}

export default App;
