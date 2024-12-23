// /os/submissions

"use client";

import { useState } from "react";

export default function SubmissionsPage() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-blue-600 text-white py-4 shadow-lg sticky top-0">
        <div className="flex justify-center space-x-8">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setSelectedWeek(index + 1)}
                className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all ${
                  selectedWeek === index + 1
                    ? "bg-white text-blue-600 shadow-md"
                    : "bg-transparent hover:bg-blue-700 hover:text-white"
                }`}
              >
                Week {index + 1}
              </button>
            ))}
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-6xl mx-auto bg-white p-12 rounded-lg shadow-lg mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Week {selectedWeek}
        </h2>

        <div className="grid grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Checkpoint Header */}
            <p className="text-2xl font-semibold text-gray-800">Checkpoint</p>

            {/* Submission Card */}
            <div className="bg-pink-100 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold text-gray-800">My Submission</h4>
              <p className="text-gray-600 mt-2">
                This is a dummy submission card showcasing user submissions.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-6">
            {/* Update 1 */}
            <div className="w-full bg-gray-100 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Update 1
              </h3>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition">
                Submit
              </button>
            </div>

            {/* Update 2 */}
            <div className="w-full bg-gray-100 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Update 2
              </h3>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
