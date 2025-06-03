function Search() {
  return (
    <input
      type="search"
      placeholder="Search..."
      className="
        w-full
        max-w-lg
        bg-gray-50
        border
        border-gray-300
        rounded-md
        px-4
        py-2
        text-sm
        font-medium
        placeholder-gray-400
        focus:outline-none
        focus:ring-1
        focus:ring-yellow-400
        focus:border-yellow-400
        transition
        duration-200
        min-w-0
      "
      aria-label="Search"
    />
  );
}

export default Search;
