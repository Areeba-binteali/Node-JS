import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { token, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="header">
      <nav>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/posts">Posts</Link>
            <Link to="" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/login">Login</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </nav>
    </div>
  );
}
