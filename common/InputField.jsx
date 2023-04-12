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
  const handleKeyPress = (event) => {
    const keyPressed = event.key
    if (keyPressed === " ") {
      event.preventDefault()
    }
  }

  return (
    <div className="w-full md:w-2/4 flex flex-col mt-8">
      <label className="mb-1 font-medium text-white">{label}</label>
      <div className="w-full  h-12 pl-3 flex rounded-sm bg-white items-center">
        <input
          className="w-4/5 h-full bg-white placeholder:text-grayColor text-black text-sm font-medium"
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={handleKeyPress}
        />
        {icon && icon}
      </div>
      {error && touched && (
        <p className="text-errorColor text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

export default InputField
