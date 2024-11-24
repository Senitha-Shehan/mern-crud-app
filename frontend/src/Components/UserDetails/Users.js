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
  const componentsRef = useRef(); // Ensure a proper ref is created

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users || []));
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentsRef.current, // Properly reference the DOM node
    documentTitle: "Users List",
    onBeforePrint: () => {
      if (!componentsRef.current) {
        alert("No content to print!"); // Graceful error handling
        return false; // Cancel printing
      }
    },
    onAfterPrint: () => alert("PDF Downloaded Successfully!"),
  });

  return (
    <div>
      <Nav />
      {/* The printable content */}
      <div
        ref={componentsRef}
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          maxWidth: "800px",
          margin: "0 auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>User List</h1>
        {users.length > 0 ? (
          users.map((user, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px 0",
              }}
            >
              <User user={user} />
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No users found!</p>
        )}
      </div>
      {/* Print button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handlePrint}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        >
          Download PDF Report
        </button>
      </div>
    </div>
  );
}

export default Users;
