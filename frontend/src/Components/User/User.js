import React from "react";
import { Link } from "react-router-dom";

function User(props) {
  const { _id, name, gmail, age, address } = props.user;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto my-6">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        User Details
      </h1>

      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">ID:</span> {_id}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Name:</span> {name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Gmail:</span> {gmail}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Age:</span> {age}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Address:</span> {address}
        </p>
      </div>

      <div className="flex justify-between mt-6">
        {/* Link for Update Button */}
        <Link to={`/updateuser/${_id}`} className="mr-2">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Update
          </button>
        </Link>
        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}

export default User;
