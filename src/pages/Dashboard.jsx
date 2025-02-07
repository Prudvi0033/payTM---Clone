import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const getBalance = async () => {
    try {
      const token = localStorage.getItem("payTM-token");
      if (!token) {
        console.error("No authentication token found!");
        return;
      }

      const response = await axios.get(
        "http://localhost:8000/api/v1/account/balance",
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Fixed Bearer token format
        }
      );

      setBalance(response.data.balance || 0);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/user/search?filter=${filter}`
      );
      setUsers(response.data.user || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    getUsers();
    getBalance();
  }, [filter]);

  return (
    <div className="bg-white w-full montserrat h-screen">
      <div className="flex justify-between align-middle bg-white shadow-lg p-5 rounded-xl">
        <div className="font-semibold">payTM</div>
        <button className="text-center px-8 py-2 bg-red-700 text-white text-sm rounded-md font-semibold">
          Logout
        </button>
      </div>

      <h2 className="m-8">Your Balance is : {balance}</h2>

      <div className="m-8">
        <h1 className="text-2xl font-semibold">Users</h1>
        <input
          onChange={(e) => setFilter(e.target.value)}
          className="w-full border border-gray-400 p-1 rounded-md mb-2"
          placeholder="Search Users....."
        />
      </div>

      <div className="m-8">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center shadow-md p-4 rounded-md mb-2"
          >
            <span>{user.name}</span>
            <button
              onClick={() =>
                navigate(`/transfer/${user._id}?name=${encodeURIComponent(user.name)}`)
              }
              className="px-6 py-2 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
            >
              Send Money
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
