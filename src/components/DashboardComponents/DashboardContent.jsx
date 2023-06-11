import MileageStats from "../MileageComponents/MileageStats";
import Projection from "../ProjectionComponents/Projection";

function DashboardContent({ calculationsEnabled }) {
  return (
    <div className="h-full bg-gray-50 px-4 py-5 sm:p-6 md:rounded-lg flex flex-col gap-8">
      <MileageStats calculationsEnabled={calculationsEnabled} />
      <Projection calculationsEnabled={calculationsEnabled} />
    </div>
  );
}

export default DashboardContent;
