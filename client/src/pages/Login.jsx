import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { saveAuthToken } from "@/lib/utils";

export const LoginAction = async (obj) => {
  try {
    const formData = await obj.request.formData(),
      email = formData.get("email"),
      password = formData.get("password"),
      response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      }),
      json = await response.json();

    if (!response.ok) {
      throw {
        message: "Failed to fetch notes",
        statusText: response.statusText,
        status: response.status,
        response,
      };
    } else {
      saveAuthToken(json.authToken);
      return json;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const Login = () => {
  const actionData = useActionData();
  const { setAuthToken, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.authToken) {
      setAuthToken({ authToken: actionData?.authToken });
      setUser({ name: actionData?.name, email: actionData?.email });
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData?.authToken]);
  return (
    // <!-- component -->
    <div className="flex flex-col justify-center min-h-screen bg-gray-100 sm:py-12">
      <div className="p-10 mx-auto xs:p-0 md:w-full md:max-w-md">
        <h1 className="mb-5 text-2xl font-bold text-center">Your Logo</h1>
        <div className="w-full bg-white divide-y divide-gray-200 rounded-lg shadow">
          <Form method="post" replace>
            <div className="px-5 py-7">
              <label className="block pb-1 text-sm font-semibold text-gray-600">
                E-mail
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="your-email@gmail.com"
                autoComplete="username"
                className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg"
              />
              <label className="block pb-1 text-sm font-semibold text-gray-600">
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                placeholder="password"
                autoComplete="current-password"
                className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg"
              />
              <button
                type="submit"
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </Form>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button className="px-5 py-4 mx-5 text-sm font-normal text-gray-500 transition duration-200 rounded-lg cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="inline-block w-4 h-4 align-text-top"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
              <div className="text-center sm:text-right whitespace-nowrap">
                <button className="px-5 py-4 mx-5 text-sm font-normal text-gray-500 transition duration-200 rounded-lg cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="inline-block w-4 h-4 align-text-bottom "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Help</span>
                </button>
              </div>
                  </div>
              <div className="flex text-[14px] justify-center content-center items-center text-pretty text-muted-foreground w-full flex-nowrap">
                <span>
                  New User? &nbsp;
                  <Link
                    className="text-blue-400 hover:text-blue-500 duration-300"
                    to={"/signup"}
                  >
                    Create a account
                  </Link>
                </span>
              </div>
          </div>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              <button className="px-5 py-4 mx-5 text-sm font-normal text-gray-500 transition duration-200 rounded-lg cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block w-4 h-4 align-text-top"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <Link to={".."}>
                  <span className="inline-block ml-1">
                    Back to your-app.com
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
