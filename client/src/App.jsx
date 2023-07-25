import {
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
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route
            element={
              // <NotesContextProvider>
              <MainLayout />
              // </NotesContextProvider>
            }
          >
            {/* TODO: convert this ⬆ to versions */}
            <Route
              index
              loader={HomeLoader}
              element={
                <NotesContextProvider>
                  <Home />
                </NotesContextProvider>
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
