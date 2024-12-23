// /os route

export default function OSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex">
      {/* Sidebar Navigation */}
      <div className="bg-white shadow-lg p-6 rounded-lg space-y-6 max-w-xs">
        {/* Navigation Buttons */}
        <a
          href="/os/profile"
          className="block bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white py-4 px-6 rounded-lg shadow-md text-center text-lg font-semibold"
        >
          Profile
        </a>

        <a
          href="/os/my-colony"
          className="block bg-green-500 hover:bg-green-600 transition-all duration-300 text-white py-4 px-6 rounded-lg shadow-md text-center text-lg font-semibold"
        >
          Colonies
        </a>

        <a
          href="/os/submissions"
          className="block bg-purple-500 hover:bg-purple-600 transition-all duration-300 text-white py-4 px-6 rounded-lg shadow-md text-center text-lg font-semibold"
        >
          Submissions
        </a>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-12 py-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Welcome to Your Frontera Hub
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your journey.
        </p>

        {/* Operations Overview */}
        <div className="grid grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="col-span-2 p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Stay On Track
            </h2>
            <p className="text-gray-600">
              Monitor your progress and submissions, connect with your colony, and access your profile seamlessly.
            </p>
          </div>

          {/* Column 2: Right */}
          <div className="space-y-6">
            {/* Card 1: User Profile Brief */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                User Profile Brief
              </h3>
              <p className="text-gray-700">Name: <span className="font-medium">Naruto Uzumaki</span></p>
              <p className="text-gray-700">Colony: <span className="font-medium">Konoha</span></p>
              <p className="text-gray-700">Project: <span className="font-medium">Rasengen</span></p>
            </div>

            {/* Card 2: Countdown Timers */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Upcoming Deadlines
              </h3>
              <div className="space-y-4">
                {/* Countdown 1 */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Next Submission:</p>
                  <p className="text-blue-500 font-medium">Dec 31, 2024</p>
                </div>
                {/* Countdown 2 */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Program End:</p>
                  <p className="text-blue-500 font-medium">June 30, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  