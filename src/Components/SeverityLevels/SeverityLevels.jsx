import React from "react";
import { useLocation } from "react-router-dom";

const SeverityLevels = () => {
  const location = useLocation();
  const { result, disease } = location.state || {};

  if (!result) return <p>No result found.</p>;

  const { predicted_class, percentages, marked_image } = result;

  console.log("Predicted Class:", predicted_class);
  console.log("Percentages:", percentages);
  console.log("Image URL:", `${marked_image}`);

  const total = percentages.Mild + percentages.Moderate + percentages.Severe;
  const normalizedPercentages = {
    Mild: (percentages.Mild / total) * 100,
    Moderate: (percentages.Moderate / total) * 100,
    Severe: (percentages.Severe / total) * 100,
  };

  return (
    <div>
      <h3 class="text-3xl font-bold dark:text-white text-center mt-5">
        Severity of Disease
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-center text-white p-6 space-y-6 md:space-y-0 md:space-x-6  my-5 mx-10 border-4 border-gray-500 rounded-md">
        {/* Left Side - Leaf Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src={`${marked_image}`} // Replace with the path to your image
              alt="Leaf with disease"
              className="max-w-md rounded-lg w-[32rem]"
            />
          </div>
        </div>

        {/* Right Side - Information and Chart */}
        <div className="w-full md:w-1/2 rounded-lg shadow p-6 flex-row flex flex-wrap justify-around">
          <div className="w-full bg-gray-800 rounded-lg shadow p-6 flex-row flex flex-wrap justify-around">
            {/* Donut Chart Section */}
            <div className="flex items-left mt-6">
              <div className="w-40 h-40 relative">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  {/* Background Circle */}
                  <path
                    className="circle-bg"
                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4A5568"
                    strokeWidth="1"
                  />

                  {/* Mild (Yellow) */}
                  <path
                    className="circle mild"
                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#31c48d"
                    strokeWidth="2.5"
                    strokeDasharray={`${normalizedPercentages.Mild} 100`}
                    strokeDashoffset="0"
                  />

                  {/* Moderate (Blue) */}
                  <path
                    className="circle moderate"
                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4299E1"
                    strokeWidth="2.5"
                    strokeDasharray={`${normalizedPercentages.Moderate} 100`}
                    strokeDashoffset={`-${normalizedPercentages.Mild}`}
                  />

                  {/* Severe (Red) */}
                  <path
                    className="circle severe"
                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#F56565"
                    strokeWidth="2.5"
                    strokeDasharray={`${normalizedPercentages.Severe} 100`}
                    strokeDashoffset={`-${
                      normalizedPercentages.Mild +
                      normalizedPercentages.Moderate
                    }`}
                  />
                </svg>
              </div>
            </div>

            {/* Severity Level Details */}
            <div className="flex flex-col items-left mt-4">
              <h2 className="text-gray-400">Disease</h2>
              <p className="text-2xl font-semibold text-white-600 mb-4">
                {disease}
              </p>
              <p className="text-gray-400">Predicted Severity Level</p>
              <p
                className={`text-3xl font-extrabold ${
                  predicted_class === "Mild"
                    ? "text-green-400"
                    : predicted_class === "Moderate"
                    ? "text-blue-400"
                    : "text-red-400"
                }`}
              >
                {predicted_class}
              </p>

              <ul className="mt-6 space-y-2">
                <li>
                  Mild:{" "}
                  <span className="text-green-400">{percentages.Mild}%</span>
                </li>
                <li>
                  Moderate:{" "}
                  <span className="text-blue-400">{percentages.Moderate}%</span>
                </li>
                <li>
                  Severe:{" "}
                  <span className="text-red-400">{percentages.Severe}%</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full bg-gray-800 rounded-lg shadow p-6 flex-row flex flex-wrap justify-around mt-4">
            <div>
              {/* Additional Description */}
              <p className=" text-white">
                A default description is a pre-designed description that can be
                used automatically in certain situations.A default description
                is a pre-designed description that can be used automatically in
                certain situations. A default description is a pre-designed
                description that can be used automatically in certain
                situations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center text-white p-6 space-y-6 md:space-y-0 md:space-x-6  my-5 mx-10 ">
        <div className="flex flex-col md:flex-row items-center justify-center text-white w-1/2">
          <button
            type="button"
            class="w-full text-white bg-gray-700 hover:bg-gray-600 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none "
          >
            Done
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center text-white w-1/2">
          <button
            type="button"
            class="w-full text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none"
          >
            Generate Medication
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeverityLevels;
