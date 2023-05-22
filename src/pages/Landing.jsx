import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/Auth";
import { useFirestore } from "../firebase/Firestore";

function Landing() {
  const { logInAsGuest, currentUser } = useAuth();
  const { dataLoaded } = useFirestore();
  const [tryOutButtonText, setTryOutButtonText] = useState("Try it out");
  const navigate = useNavigate();

  const handleTryItOut = async () => {
    setTryOutButtonText("loading...");
    const success = await logInAsGuest();
    if (success) {
      return navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (currentUser && dataLoaded) {
      return navigate("/dashboard");
    }
  }, [currentUser, dataLoaded]);

  return (
    <div className="min-h-full p-0 lg:p-16 flex items-center justify-center bg-gray-950 lg:bg-black relative overflow-hidden">
      <div className="lg:ring-1 ring-gray-800 h-min md:rounded-3xl max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 p-6 xs:p-12 sm:p-16 lg:relative isolate overflow-hidden  lg:shadow-2xl lg:bg-gray-900">
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/4 -z-10 h-[72rem] w-[72rem] [mask-image:radial-gradient(closest-side,white,transparent)] ml-0 -translate-x-1/2 translate-y-0"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#gradient)"
            fillOpacity="0.9"
          />
          <defs>
            <radialGradient id="gradient">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#5b21b6" />
            </radialGradient>
          </defs>
        </svg>
        <div className="max-w-2xl flex items-center sm:text-center lg:text-left">
          <div>
            <h2 className="text-2xl xs:text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Plan your vehicle lease mileage to avoid costly overdraft.
            </h2>
            <p className="mt-6 text-md xs:text-lg leading-8 text-gray-300">
              PlanMyMiles dynamically distributes your mileage budget and
              visualizes when and how much you can drive.
            </p>
            <div className="mt-10 flex items-center sm:justify-center lg:justify-start gap-6">
              <button
                type="button"
                onClick={handleTryItOut}
                className="text-sm rounded-md bg-white px-3.5 py-2.5 font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {tryOutButtonText}
              </button>
              <Link to="/login">
                <span className="text-sm font-semibold leading-6 text-gray-100 hover:text-white transition focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-white">
                  Log in <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            className="shadow-2xl object-center w-full max-w-lg rounded xs:rounded-lg sm:rounded-xl bg-white/5 text-gray-300 ring-1 ring-white/10"
            src="/images/dashboard_preview.png"
            alt="Dashboard Preview"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
