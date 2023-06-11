import { useState } from "react";
import DashboardHeader from "../components/DashboardComponents/DashboardHeader";
import DashboardContent from "../components/DashboardComponents/DashboardContent";
import VehicleSettings from "../components/SettingsComponents/VehicleSettings";
import { useAuth } from "../firebase/Auth";
import { useFirestore } from "../firebase/Firestore";
import { useInputValidity } from "../contexts/InputValidity";

function Dashboard() {
  const { currentUser } = useAuth();
  const { dataLoaded } = useFirestore();
  const { allInputsAreValid } = useInputValidity();

  const [showVehicleSettings, setShowVehicleSettings] = useState(false);
  const toggleShowVehicleSettings = () =>
    setShowVehicleSettings(!showVehicleSettings);

  return (
    <div className="min-h-full flex items-center justify-center bg-black">
      {currentUser && dataLoaded && (
        <div className="h-full md:h-auto flex flex-col md:rounded-lg bg-white shadow-2xl w-[1024px]">
          <DashboardHeader
            showVehicleSettings={showVehicleSettings}
            toggleShowVehicleSettings={toggleShowVehicleSettings}
          />
          {showVehicleSettings ? (
            <VehicleSettings />
          ) : (
            <DashboardContent calculationsEnabled={allInputsAreValid} />
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
