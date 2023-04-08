function MileageInput({label, name}) {

  return (
    <div className="flex flex-col justify-center px-3 py-2">
      <label
        htmlFor={name}
        className="text-sm font-medium leading-6 text-gray-950">{label}</label>
      <div>
      <div className="relative">
        <input
          type="number"
          id={name}
          className="px-0 border-x-0 border-t-0 border-neutral-300 focus:ring-0 focus:border-b-neutral-300 text-gray-700"
          />
        <div className="absolute pointer-events-none inset-y-0 right-0 flex items-center">
          <span className="text-gray-500 sm:text-sm">km</span>
        </div>
      </div>
      </div>
    </div>
  )
}

export default MileageInput