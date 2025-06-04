function BtnOutline({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded-full cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-100 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default BtnOutline;
