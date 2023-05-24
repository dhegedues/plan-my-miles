import {
  ArrowRightOnRectangleIcon,
  CheckIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../firebase/Firestore";
import { useAuth } from "../../firebase/Auth";

function HeaderTitle({ vehicleName, showVehicleSettings }) {
  return (
    <div className="min-w-0 text-ellipsis">
      <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:truncate sm:text-3xl sm:tracking-tight">
        {showVehicleSettings ? (
          <>
            <CogIcon
              className="xsp:hidden h-8 w-8 text-gray-400"
              aria-hidden="true"
            />
            <span className="hidden xsp:block">Settings</span>
          </>
        ) : (
          <span className="break-all">{vehicleName}</span>
        )}
      </h2>
    </div>
  );
}

function HeaderButtons({
  showVehicleSettings,
  toggleShowVehicleSettings,
  handleLogOut,
}) {
  return (
    <div className="flex md:ml-4 md:mt-0">
      {showVehicleSettings ? (
        <div className="flex justify-end gap-x-2 xs:gap-x-4 xsp:gap-x-6">
          <button
            type="button"
            onClick={handleLogOut}
            className="inline-flex items-center text-right rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <ArrowRightOnRectangleIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Log out
          </button>
          <button
            type="button"
            onClick={toggleShowVehicleSettings}
            className="inline-flex items-center text-right rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CheckIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-100"
              aria-hidden="true"
            />
            Save
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={toggleShowVehicleSettings}
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <CogIcon
            className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Settings
        </button>
      )}
    </div>
  );
}

function DashboardHeader({ showVehicleSettings, toggleShowVehicleSettings }) {
  const { vehicleName } = useFirestore();
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const [showShadow, setShowShadow] = useState(false);

  const handleLogOut = async () => {
    const success = await logOut();
    if (success) {
      return navigate("/");
    }
    return null;
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShowShadow(true);
    } else {
      setShowShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 bg-white ${
        showShadow ? "shadow-lg" : ""
      } md:rounded-lg flex items-center justify-between gap-3 px-4 py-5 sm:px-6`}
    >
      <HeaderTitle
        vehicleName={vehicleName}
        showVehicleSettings={showVehicleSettings}
      />
      <HeaderButtons
        showVehicleSettings={showVehicleSettings}
        toggleShowVehicleSettings={toggleShowVehicleSettings}
        handleLogOut={handleLogOut}
      />
    </div>
  );
}

export default DashboardHeader;
