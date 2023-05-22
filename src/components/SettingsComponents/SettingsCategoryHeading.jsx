function SettingsCategoryHeading({ title, description }) {
  return (
    <div>
      <h2 className="text-xl font-semibold leading-7 text-gray-900">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
    </div>
  );
}

export default SettingsCategoryHeading;
