import React, { useState } from "react";

const PasswordPrompt = ({ onAuthenticate }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (password === "ashad1972") {
      onAuthenticate();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Admin Authentication</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-900 text-white"
            required
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPrompt;
