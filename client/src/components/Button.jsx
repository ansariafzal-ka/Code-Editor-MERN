const Button = ({ children, onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-3 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-500 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
