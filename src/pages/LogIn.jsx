import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/Auth";

function LogIn() {
  const { logInWithEmail, signUp } = useAuth();
  const navigate = useNavigate();

  const [credentialsAreValid, setCredentialsAreValid] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let action = async () => logInWithEmail(email, password);

    if (event.nativeEvent.submitter.id === "signupbutton") {
      action = async () => signUp(email, password);
    }

    const success = await action();
    setCredentialsAreValid(success);
    if (success) {
      return navigate("/dashboard");
    }

    return null;
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
        <LockClosedIcon
          className={`h-10 w-10 ${
            !credentialsAreValid ? "text-red-600" : "text-gray-400"
          }`}
          aria-hidden="true"
        />
        <h2
          className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900  ${
            !credentialsAreValid ? "text-red-600" : "text-gray-400"
          }`}
        >
          {!credentialsAreValid
            ? "Wrong credentials, try again"
            : "Log in to your PlanMyMiles account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                aria-invalid={!credentialsAreValid}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 aria-invalid:ring-red-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                aria-invalid={!credentialsAreValid}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 aria-invalid:ring-red-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              id="loginbutton"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            or{" "}
            <button
              type="submit"
              id="signupbutton"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              create an account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
