import MileageStats from "./MileageStats";
import Chart from "./Chart";
import Trips from "./Trips";

function DashboardContent() {
  return (
    <div className="bg-gray-50 px-4 py-5 sm:p-6 flex flex-col gap-8">
      <MileageStats />
      <Chart />
      <Trips />
    </div>
  )
}

export default DashboardContent