function StatsCard({ displayName, amount, amountUnit, inputsAreValid }) {
  return (
    <div
      key={displayName}
      className="overflow-hidden rounded-lg bg-white shadow ring-2 ring-inset ring-transparent"
    >
      <div className="p-3 sm:p-5 flex items-center justify-between">
        <dl>
          <dt className="text-sm font-medium text-gray-500">{displayName}</dt>
          <dd>
            <span
              className={`font-semibold text-xl sm:text-2xl ${
                inputsAreValid ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {inputsAreValid ? amount : "---"}
            </span>
            <span className="ml-1 font-light text-gray-500">{amountUnit}</span>
          </dd>
        </dl>
      </div>
    </div>
  );
}

export default StatsCard;
