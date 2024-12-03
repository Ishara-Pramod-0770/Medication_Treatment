import React, { useState } from "react";

function PredictionForm() {
  const [file, setFile] = useState(null);
  const [disease, setDisease] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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
      setResult(data);
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Predict
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-green-100 rounded-md text-black">
          <h2 className="text-lg font-bold mb-2">Prediction Results</h2>
          <p><strong>Disease:</strong> {result.disease}</p>
          <p><strong>Predicted Class:</strong> {result.predicted_class}</p>
          <p><strong>Severity Level:</strong> {result.severity_level}</p>
          <p><strong>Severity Value:</strong> {result.severity}</p>
          <p><strong>Severity Percentages:</strong></p>
          <ul>
            {Object.entries(result.severity_percentages).map(([level, value]) => (
              <li key={level} className="ml-4">- {level}: {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PredictionForm;
