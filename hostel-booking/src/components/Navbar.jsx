import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="HostelHub" className="h-12" />
          <span className="text-3xl font-bold">HostelHub</span>
        </Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-indigo-200 transition">Home</Link>
          <Link to="/hostels" className="hover:text-indigo-200 transition">Hostels</Link>
          {user && (
            <Link to="/add-hostel" className="hover:text-indigo-200 transition">Add Hostel</Link>
          )}
          {user ? (
            <button onClick={handleLogout} className="hover:text-indigo-200 transition">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-200 transition">Login</Link>
              <Link to="/signup" className="hover:text-indigo-200 transition">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;