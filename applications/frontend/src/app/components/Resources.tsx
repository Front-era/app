import React from 'react'

type Resource = {
  title: string;
  url: string;
  icon: string;
}

type ResourcesProps = {
  resources: Resource[];
}

export default function Resources({ resources }: ResourcesProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Resources</h2>
      <div className="grid grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            className="bg-gray-700 p-3 rounded-lg text-center hover:bg-gray-600 transition-colors duration-200 flex flex-col items-center justify-center"
            aria-label={`Access ${resource.title}`}
          >
            <span className="text-2xl mb-2" aria-hidden="true">{resource.icon}</span>
            <span className="text-sm">{resource.title}</span>
          </a>
        ))}
      </div>
    </div>
  )
}