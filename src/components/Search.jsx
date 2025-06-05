import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import useTaskStore from "../store/useTaskStore";

function Search() {
  const tasks = useTaskStore((state) => state.tasks);
  const setFilteredTasks = useTaskStore((state) => state.setFilteredTasks);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debounceSearchTimeout = useRef(null);

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    clearTimeout(debounceSearchTimeout.current);
    debounceSearchTimeout.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
  }, [query]);

  useEffect(() => {
    const fuse = new Fuse(tasks, {
      keys: [
        "taskName",
        "dueDate",
        {
          name: "completed",
          getFn: (task) => (task.completed ? "done" : "pending"),
        },
      ],
      includeScore: true,
      threshold: 0.6,
    });

    if (debouncedQuery.trim().length < 2) {
      setFilteredTasks(tasks);
      setSuggestions([]);
      setShowDropdown(false);
      setHighlightedIndex(-1);
    } else {
      const fuseResults = fuse.search(debouncedQuery);
      const results = fuseResults.map((result) => result.item);
      setFilteredTasks(results);
      setSuggestions(results.slice(0, 5));
      setShowDropdown(true);
      setHighlightedIndex(-1);
    }
  }, [debouncedQuery, tasks, setFilteredTasks]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (taskName) => {
    setQuery(taskName);
    setShowDropdown(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        const selectedTask = suggestions[highlightedIndex];
        setQuery(selectedTask.taskName);
        setShowDropdown(false);
        setHighlightedIndex(-1);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="search"
        placeholder="Search..."
        id="searchBar"
        name="searchBar"
        className="
          w-full
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
          dark:bg-gray-700
        "
        aria-label="Search"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        onFocus={() => {
          if (suggestions.length > 0) setShowDropdown(true);
        }}
        autoComplete="off"
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
          {suggestions.map((task, index) => (
            <li
              key={task.id}
              className={`px-4 py-2 cursor-pointer hover:bg-yellow-100 ${
                index === highlightedIndex ? "bg-yellow-200" : ""
              }`}
              onMouseDown={() => handleSuggestionClick(task.taskName)}
            >
              {task.taskName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
