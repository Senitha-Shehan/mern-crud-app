import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

function UpdateUser() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/users/${id}`, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
      })
      .then((res) => res.data);
  };

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

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Update User</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={inputs.name}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="gmail"
            className="block text-gray-700 font-medium mb-2"
          >
            Gmail
          </label>
          <input
            type="email"
            id="gmail"
            name="gmail"
            onChange={handleChange}
            value={inputs.gmail}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={handleChange}
            value={inputs.age}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-gray-700 font-medium mb-2"
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
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
