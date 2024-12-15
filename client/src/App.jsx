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
import { NotesContextProvider } from "./contexts/NotesContext";
import { getAuthToken } from "./lib/utils";
import { useAuth } from "./hooks/useAuth";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { authToken } = useAuth();
    const token = getAuthToken();
    if (authToken === null || token === null) {
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
          <>
            <Route element={<MainLayout />}>
              {/* TODO: convert this ⬆ to versions */}
              <Route
                index
                errorElement={<h1>error occured</h1>}
                element={
                  <ProtectedRoute>
                    <NotesContextProvider>
                      <Home />
                    </NotesContextProvider>
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route action={LoginAction} path="login" element={<Login />} />
            <Route path="signup" action={SignupAction} element={<Signup />} />
          </>
        )
      )}
    />
  );
}

export default App;
