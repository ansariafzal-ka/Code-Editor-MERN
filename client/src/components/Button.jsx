const Button = ({ children, onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-3 bg-violet-500 text-white font-medium rounded-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
