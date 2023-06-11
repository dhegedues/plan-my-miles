import { PresentationChartLineIcon } from "@heroicons/react/24/solid";
import Chart from "./Chart";

function Projection({ calculationsEnabled }) {
  return (
    <div>
      <h2 className="text-lg font-medium leading-6 text-gray-900">
        Projection
      </h2>
      <div className="w-full h-[24rem] mt-2 flex flex-col justify-center items-center overflow-hidden rounded-lg bg-white shadow relative">
        {calculationsEnabled ? (
          <Chart />
        ) : (
          <div className="p-5 flex flex-col xs:items-center xs:text-center">
            <PresentationChartLineIcon
              className="h-8 w-8 mb-3 text-gray-400"
              aria-hidden="true"
            />
            <p className="text-gray-700">
              Chart will be displayed when conflicting inputs are resolved
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projection;
