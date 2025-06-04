function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm sm:text-base py-1 px-3 sm:px-4 sm:py-2 rounded-full transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
