const InputField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  icon,
}) => {
  return (
    <div className="w-full md:w-2/4 flex flex-col mt-8">
      <label className="mb-1 font-medium text-white">{label}</label>
      <div className="w-full py-2 pl-3 flex rounded-sm bg-white items-center">
        <input
          className="w-4/5 sm:full bg-white placeholder:text-grayColor text-black text-sm font-medium"
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {icon && icon}
      </div>
      {error && touched && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default InputField
