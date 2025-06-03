function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-full transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
