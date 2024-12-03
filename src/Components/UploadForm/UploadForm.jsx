import React, { useState } from 'react';

const UploadForm = () => {
    const [image, setImage] = useState(null);
    const [disease, setDisease] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', image);
        formData.append('disease', disease);

        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        setResult(data);
    };

    return (
        <div className="p-8 bg-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4 text-gray-950">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="block w-full text-gray-700 border rounded"
                />
                <input
                    type="text"
                    placeholder="Enter disease type"
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                    className="block w-full border rounded px-3 py-2"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Predict
                </button>
            </form>
            {result && (
                <div className="mt-6 bg-white p-4 shadow text-gray-950">
                    <h3>Disease: {result.disease}</h3>
                    <p>Predicted Class: {result.predicted_class}</p>
                    <p>Severity: {result.severity.toFixed(2)}</p>
                    <p>Severity Level: {result.severity_level}</p>
                </div>
            )}
        </div>
    );
};

export default UploadForm;
