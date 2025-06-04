import { Link } from "react-router-dom";

function Logo() {
  return (
    <span className="text-2xl font-extrabold mb-8 px-4 text-yellow-500">
      <Link to="/app/dashboard">Focusly</Link>
    </span>
  );
}

export default Logo;
