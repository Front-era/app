import React from 'react'

type DueItem = {
  assignment: string;
  date: string;
  status: string;
}

type WhatsDueProps = {
  dueItems: DueItem[];
}

export default function WhatsDue({ dueItems }: WhatsDueProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">What&apos;s Due</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4 text-left">Assignment</th>
              <th className="py-2 px-4 text-left">Due Date</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {dueItems.map((item, index) => (
              <tr key={index} className="border-b border-gray-700 last:border-b-0">
                <td className="py-2 px-4">{item.assignment}</td>
                <td className="py-2 px-4">{item.date}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.status === 'Completed' ? 'bg-green-600' :
                    item.status === 'In Progress' ? 'bg-yellow-600' :
                    'bg-red-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}