'use client'
import Resources from "./Resources";
import UpNext from "./UpNext";
import WhatsDue from "./WhatsDue";
import { useUser } from "@clerk/nextjs"

export default function Dashboard() {
    const {user} = useUser();
    const firstName = user?.firstName || "Explorer" // This will be replaced with actual auth later
  
    // Sample data for the calendar
    const calendarEvents = [
      { date: "2024-11-15", title: "Updates and Checkpoints Due" },
      { date: "2024-11-16", title: "Livestream 2" },
    ] 
  
    // Sample data for What's Due
    const dueItems = [
      { assignment: "Update 1", date: "2024-11-16", status: "In Progress" },
      { assignment: "Update 2", date: "2024-11-16", status: "Not Started" },
      { assignment: "Checkpoint 1", date: "2024-11-16", status: "Not Started" },
    ]
  
    // Sample data for Resources
    const resources = [
      { title: "Buildspace Slides", url: "#", icon: "" },
      { title: "YCombinator Recs", url: "#", icon: "" },
      { title: "Frontera Slides", url: "#", icon: "" },
    ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with gradient */}
      <header className="bg-gradient-to-b from-white to-black p-6 text-center h-48 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">Welcome, {firstName}</h1>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Resources sidebar */}
          <aside className="md:w-1/4">
            <Resources resources={resources} />
          </aside>

          {/* What's Due section */}
          <section className="md:w-1/2">
            <WhatsDue dueItems={dueItems} />
          </section>

          {/* Up Next sidebar */}
          <aside className="md:w-1/4">
            <UpNext calendarEvents={calendarEvents} />
          </aside>
        </div>
      </main>
    </div>
  )
}