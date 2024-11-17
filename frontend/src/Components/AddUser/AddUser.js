import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router";
import axios from "axios";

function AddUser() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    address: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => navigate("/userdetails"));
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/users", {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
      })
      .then((res) => res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Add User
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="gmail" className="block text-gray-700 font-medium">
              Gmail
            </label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              onChange={handleChange}
              value={inputs.gmail}
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-gray-700 font-medium">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              onChange={handleChange}
              value={inputs.age}
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={handleChange}
              value={inputs.address}
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
