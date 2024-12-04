import React from 'react';
import { useLocation } from 'react-router-dom';

const SeverityOutput = () => {
    const location = useLocation();
    const { result } = location.state;

    // Ensure the severity value is converted to a number before formatting
    const severityValue = parseFloat(result.severity); // Convert string to number

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Prediction Result</h2>
                <p className="text-lg text-gray-600">
                    <strong>Disease:</strong> {result.disease}
                </p>
                <p className="text-lg text-gray-600">
                    <strong>Predicted Class:</strong> {result.predicted_class}
                </p>
                <p className="text-lg text-gray-600">
                    <strong>Severity Value:</strong> {severityValue.toFixed(2)} {/* Format severity as a number */}
                </p>
                <p className="text-lg text-gray-600">
                    <strong>Severity Level:</strong> {result.severity_level}
                </p>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800">Severity Percentages:</h3>
                    <ul className="list-disc ml-6">
                        {Object.entries(result.severity_percentages).map(([level, percentage]) => (
                            <li key={level} className="text-gray-600">
                                {level}: {percentage}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SeverityOutput;
