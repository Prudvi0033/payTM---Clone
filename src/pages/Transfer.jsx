import axios from "axios";
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Transfer = () => {
  const [amnt, setAmnt] = useState("");
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get("id"); 
  const name = searchParams.get("name");
  const navigate = useNavigate();

  const sendMoney = async () => {
    try {
      const token = localStorage.getItem("payTM-token");
      if (!token) {
        alert("Unauthorized: No token found!");
        return;
      }
  
      console.log("Sending request with:", { receiverId, amount: amnt });
  
      const response = await axios.put(
        "http://localhost:8000/api/v1/account/transfer",
        { receiverId: id, amount: amnt }, // ✅ Corrected payload
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } } // ✅ Fixed headers
      );
  
      console.log("Transfer successful:", response.data);
      alert("Transfer Successful!");
    } catch (error) {
      console.error("Transfer failed:", error.response?.data || error.message);
      alert("Transfer failed! " + (error.response?.data?.message || "Unknown error"));
    }
  };
  

  return (
    <div className="bg-white w-full montserrat h-screen flex justify-center items-center">
      <div className="bg-white text-black p-12 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-12">Send Money</h1>
        <label className="text-md font-medium">{name}</label>
        <br />
        <input
          type="number"
          value={amnt}
          onChange={(e) => setAmnt(e.target.value)}
          className="w-full border border-gray-400 p-1 rounded-md mb-2"
          placeholder="Enter Amount"
        />
        <button
          onClick={sendMoney} // Call function only on button click
          className="w-full block text-center mt-2 px-8 py-2 bg-green-600 mb-2 text-white text-sm rounded-md font-semibold"
        >
          Transfer
        </button>
      </div>
    </div>
  );
};

export default Transfer;
