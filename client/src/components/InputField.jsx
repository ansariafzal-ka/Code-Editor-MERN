const InputField = ({ type, value, onChange }) => {
  return (
    <input
      required
      value={value || ""}
      onChange={onChange}
      className="outline-none bg-transparent border border-neutral-700 p-2 rounded-lg focus:ring-1 focus:ring-violet-600"
      type={type}
    />
  );
};

export default InputField;
