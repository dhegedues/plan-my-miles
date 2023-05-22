import MileageStats from "../MileageComponents/MileageStats";
import Projection from "../ProjectionComponents/Projection";

function DashboardContent({ inputsAreValid, setInputsAreValid }) {
  return (
    <div className="h-full bg-gray-50 px-4 py-5 sm:p-6 md:rounded-lg flex flex-col gap-8">
      <MileageStats
        inputsAreValid={inputsAreValid}
        setInputsAreValid={setInputsAreValid}
      />
      <Projection inputsAreValid={inputsAreValid} />
    </div>
  );
}

export default DashboardContent;
