function SettingsBlock({ name, title, description, children }) {
  return (
    <div className="sm:col-span-4">
      <label
        htmlFor={name}
        className="block text-sm font-semibold leading-6 text-gray-800"
      >
        {title}
      </label>
      <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export default SettingsBlock;
