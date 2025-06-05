
import React, { useState } from 'react';
import { TeamMember } from './TeamMember';

const teamMembers = [
  {
    id: 'pam-gonzalez',
    name: 'Pam Gonzalez',
    role: 'Senior Designer',
    avatar: '',
    utilization: 76,
    skills: ['Design', 'New York'],
    location: 'New York'
  },
  {
    id: 'rachel-li',
    name: 'Rachel Li',
    role: 'Senior Producer',
    avatar: '',
    utilization: 96,
    skills: ['Management', 'Notion'],
    location: 'San Francisco'
  },
  {
    id: 'tami-aguta',
    name: 'Tami Aguta',
    role: 'Copywriter',
    avatar: '',
    utilization: 112,
    skills: ['London'],
    location: 'London'
  },
  {
    id: 'xavier-ivison',
    name: 'Xavier Ivison',
    role: 'Web Developer',
    avatar: '',
    utilization: 85,
    skills: ['Javascript', 'React'],
    location: 'Remote'
  },
  {
    id: 'placeholder-role',
    name: 'Placeholder role',
    role: 'Mobile Developer',
    avatar: '',
    utilization: 80,
    skills: ['New hire'],
    location: 'TBD'
  }
];

export const Sidebar: React.FC = () => {
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(true);

  return (
    <div className="w-96 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Header with navigation */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-xl font-semibold">Schedule</h1>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsScheduleExpanded(!isScheduleExpanded)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform ${isScheduleExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        {isScheduleExpanded && (
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 text-white bg-blue-600 px-3 py-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Project plan
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              People
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Projects
          </a>
        </nav>
      )}
    </div>

    {/* Team utilization summary */}
    <div className="flex-1 overflow-y-auto p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-gray-300 text-sm font-medium">This month</h2>
        <span className="text-green-400 text-sm font-medium">82%</span>
      </div>
      
      <div className="text-gray-400 text-sm">
        Team utilization overview and additional controls can go here.
      </div>
    </div>
  </div>
);
};
