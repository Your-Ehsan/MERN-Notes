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
import { CreateNotePage } from "./pages/CreateNotePage";
import { EditNotePage } from "./pages/EditNotePage";
import { NotePage } from "./pages/NotePage";

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
            <Route
              element={
                <ProtectedRoute>
                  <NotesContextProvider>
                    <MainLayout />
                  </NotesContextProvider>
                </ProtectedRoute>
              }
            >
              <Route
                index
                errorElement={<h1>error occurred</h1>}
                element={<Home />}
              />
              <Route
                path="create"
                errorElement={<h1>error occurred</h1>}
                element={<CreateNotePage />}
              />
              <Route
                path="edit"
                errorElement={<h1>error occurred</h1>}
                element={<EditNotePage />}
              />
              <Route
                path=":id"
                errorElement={<h1>error occurred</h1>}
                element={<NotePage />}
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
