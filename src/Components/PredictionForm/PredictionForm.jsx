import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PredictionForm() {
  const [file, setFile] = useState(null);
  const [disease, setDisease] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router's hook for navigation

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDiseaseChange = (event) => {
    setDisease(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !disease) {
      setError("Please provide both an image and a disease name.");
      return;
    }

    setError(null); // Reset error state

    const formData = new FormData();
    formData.append("file", file);
    formData.append("disease", disease);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch results.");
      }

      const data = await response.json();

      // Navigate to the output page with result data as state
      navigate("/output", { state: { result: data, disease } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Disease Name:</label>
          <input
            type="text"
            value={disease}
            onChange={handleDiseaseChange}
            className="block w-full border-gray-300 rounded-md shadow-sm text-black"
            placeholder="Enter the disease name"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Predict
        </button>
      </form>
    </div>
  );
}

export default PredictionForm;
