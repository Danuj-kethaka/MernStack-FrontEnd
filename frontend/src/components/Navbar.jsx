import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <img src="/images/dog.avif" className="h-12" alt="Logo" />
          <span className="text-2xl font-bold text-green-800">City Pet</span>
        </a>

        <ul
          className={`${
            open ? "flex" : "hidden"
          } absolute top-full left-0 w-full bg-white border-t border-gray-200
             flex-col text-center
             lg:static lg:flex lg:flex-row lg:w-auto lg:border-0
             lg:items-center lg:space-x-8 text-gray-700 font-medium`}
        >
          <li>
            <Link to="/" className="block px-4 py-3 hover:text-green-700">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="block px-4 py-3 hover:text-green-700">
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="block px-4 py-3 hover:text-green-700"
            >
              Services
            </Link>
          </li>
          <li>
            <Link to="/PetPage" className="block px-4 py-3 hover:text-green-700">
              Pets
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block px-4 py-3 hover:text-green-700"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="lg:hidden p-2 rounded-md  hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
