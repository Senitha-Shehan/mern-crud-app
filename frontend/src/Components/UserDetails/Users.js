import React, { useEffect, useState, useRef } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import User from "../User/User";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  try {
    const res = await axios.get(URL);
    console.log("Data fetched successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [] };
  }
};

function Users() {
  const [users, setUsers] = useState([]);
  const componentsRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users || []));
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Users List",
    onBeforePrint: () => {
      if (!componentsRef.current) {
        alert("No content to print!");
        return false;
      }
    },
    onAfterPrint: () => alert("PDF Downloaded Successfully!"),
  });

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  };

  const handleSendReport = () => {
    const phoneNumber = "+94702005088";
    const message = `Selected User Reports`;
    const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
  
    // Open WhatsApp chat in a new window
    window.open(WhatsAppUrl, "_blank");
  };
  

  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-4">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search Users Details"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          />
          <button
            onClick={handleSearch}
            className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>
        {noResults && (
          <p className="text-red-500 text-center">No results found!</p>
        )}
        <div ref={componentsRef} className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-center text-2xl font-semibold mb-6">User List</h1>
          {users.length > 0 ? (
            users.map((user, i) => (
              <div
                key={i}
                className="border-b border-gray-200 py-4 last:border-none"
              >
                <User user={user} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No users found!</p>
          )}
        </div>
        <div className="text-center mt-6">
          <button
            onClick={handlePrint}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Download PDF Report
          </button>
          <br></br>
          <button onClick={handleSendReport} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
            Send Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default Users;
