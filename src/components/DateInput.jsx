function DateInput({label, name}) {

  return (
    <div className="px-3 py-2 border-none">
      <label
        htmlFor={name}
        className="text-sm font-medium leading-6 text-gray-950">{label}</label>
      <div>
        <input
          type="date"
          id={name}
          className="w-0 min-w-full px-0 border-x-0 border-t-0 border-neutral-300 focus:border-neutral-300 focus:ring-0 text-gray-700"
          />
      </div>
    </div>
  )
}

export default DateInput