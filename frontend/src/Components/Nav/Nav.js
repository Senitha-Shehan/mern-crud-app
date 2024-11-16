import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="bg-gray-800 p-4">
      <ul className="flex justify-around items-center">
        <li>
          <Link to="/mainhome">
            <h1 className="text-white text-lg hover:text-blue-400 cursor-pointer">
              Home
            </h1>
          </Link>
        </li>
        <li>
          <h1 className="text-white text-lg hover:text-blue-400 cursor-pointer">
            Add User
          </h1>
        </li>
        <li>
          <h1 className="text-white text-lg hover:text-blue-400 cursor-pointer">
            User Details
          </h1>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
