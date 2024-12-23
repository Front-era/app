// /os/my-colony

"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

export default function MyColonyPage() {
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  const toggleMember = (index: number) => {
    setExpandedMember((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      {/* Colony Details */}
      <div className="relative w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Image Circle */}
        <div className="absolute -top-12 left-[10%] transform -translate-x-1/2 w-24 h-24 bg-pink-400 rounded-full border-4 border-white shadow-md"></div>

        {/* Colony Information */}
        <div className="flex justify-between items-center mt-12">
          {/* Left: Colony Name and Location */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Colony Name</h2>
            <p className="text-lg text-gray-500 mt-2">Location</p>
          </div>

          {/* Right: Description */}
          <div className="max-w-md text-right">
            <p className="text-lg text-gray-600">
              A brief description about the colony goes here.
            </p>
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={`bg-gray-100 p-4 rounded-lg shadow-md transition-all duration-300 ${
                expandedMember === index ? "pb-8" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Left: Member Image and Name */}
                <div className="flex items-center space-x-4">
                  {/* Member Image */}
                  <div className="w-16 h-16 bg-pink-400 rounded-full shadow-md"></div>
                  {/* Member Name */}
                  <h3 className="text-lg font-bold text-gray-800">
                    Member Name {index + 1}
                  </h3>
                </div>

                {/* Right: Project Idea and Drawer Icon */}
                <div className="flex items-center space-x-4">
                  {/* Project Idea */}
                  <p className="text-sm text-gray-600 italic">
                    Project Idea {index + 1}
                  </p>
                  {/* Drawer Icon */}
                  <button
                    onClick={() => toggleMember(index)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    {expandedMember === index ? (
                      <ChevronUpIcon className="w-6 h-6" />
                    ) : (
                      <ChevronDownIcon className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedMember === index && (
                <div className="mt-4 border-t pt-4 text-gray-600">
                  <p>
                    This is a detailed project idea or description for Member{" "}
                    {index + 1}. It provides more insights about their
                    contribution or work.
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}



