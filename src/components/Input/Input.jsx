function Input({
  type,
  placeholder,
  onChange,
  onBlur,
  inputClass,
}) {
  return (
    <div className="w-full">
      <input
        type={type}
        autoComplete="off"
        className={inputClass}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
      />
    </div>
  );
}

export default Input;
