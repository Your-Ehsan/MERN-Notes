import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { HomeLoader } from "./utilities/HomeLoader";
import { NotesContextProvider } from "./contexts/NotesContext";

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route
            loader={HomeLoader}
            element={
              <NotesContextProvider>
                <MainLayout />
              </NotesContextProvider>
            }
          >
            {/* TODO: convert this ⬆ to versions */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        )
      )}
    />
  );
}

export default App;
