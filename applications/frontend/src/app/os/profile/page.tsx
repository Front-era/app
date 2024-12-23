// /os/profile

"use client";
import { useState } from "react";

export default function ProfilePage() {
  // Toggle states
  const [autoConsent, setAutoConsent] = useState(false);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [otherSettings, setOtherSettings] = useState(false);

  // Toggle handlers
  const toggleAutoConsent = () => setAutoConsent(!autoConsent);
  const togglePrivateAccount = () => setPrivateAccount(!privateAccount);
  const toggleOtherSettings = () => setOtherSettings(!otherSettings);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6 flex flex-col lg:flex-row gap-6">
      {/* Column 1: Left - Profile Info */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Card 1: Profile Image */}
        <div className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
          <div className="w-48 h-48 bg-pink-300 rounded-full shadow-lg"></div>
        </div>

        {/* Card 2: Profile Details */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="text-center space-y-4">
            <p className="text-gray-700 text-lg font-medium">
              Name: <span className="font-bold">Naruto Uzumaki</span>
            </p>
            <p className="text-gray-700 text-lg font-medium">
              Username: <span className="font-bold">Naruto123</span>
            </p>
            <p className="text-gray-700 text-lg font-medium">
              Bio: <span className="font-bold">Future Hokage of Konoha</span>
            </p>
            <p className="text-gray-700 text-lg font-medium">
              Socials: <span className="font-bold">@NarutoNinja</span>
            </p>
          </div>
        </div>
      </div>

      {/* Column 2: Middle - Projects and Colony */}
      <div className="flex-1 flex flex-col gap-12">
        {/* My Project */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800">My Project</h3>
          <p className="text-gray-600 mt-4">Creating the ultimate Rasengan.</p>
        </div>

        {/* My Colony */}
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="w-36 h-36 bg-pink-300 rounded-full mx-auto shadow-lg"></div>
          <h3 className="text-xl font-bold text-gray-800 mt-6">Konoha</h3>
        </div>
      </div>

      {/* Column 3: Right - Settings */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Auto Consent */}
        <div className="bg-white rounded-lg p-6 shadow-md flex items-center justify-between">
          <p className="text-gray-800 text-lg font-medium">
            Auto Consent to Frontera Use
          </p>
          <button
            onClick={toggleAutoConsent}
            className={`w-16 h-8 rounded-full flex items-center transition-colors duration-200 ease-in-out ${
              autoConsent ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
                autoConsent ? "translate-x-8" : "translate-x-1"
              }`}
            ></div>
          </button>
        </div>

        {/* Private Account */}
        <div className="bg-white rounded-lg p-6 shadow-md flex items-center justify-between">
          <p className="text-gray-800 text-lg font-medium">Private Account</p>
          <button
            onClick={togglePrivateAccount}
            className={`w-16 h-8 rounded-full flex items-center transition-colors duration-200 ease-in-out ${
              privateAccount ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
                privateAccount ? "translate-x-8" : "translate-x-1"
              }`}
            ></div>
          </button>
        </div>

        {/* Other Settings */}
        <div className="bg-white rounded-lg p-6 shadow-md flex items-center justify-between">
          <p className="text-gray-800 text-lg font-medium">Other Settings</p>
          <button
            onClick={toggleOtherSettings}
            className={`w-16 h-8 rounded-full flex items-center transition-colors duration-200 ease-in-out ${
              otherSettings ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
                otherSettings ? "translate-x-8" : "translate-x-1"
              }`}
            ></div>
          </button>
        </div>

        {/* Save Changes Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg mt-6">
          Save Changes
        </button>
      </div>
    </div>
  );
}
