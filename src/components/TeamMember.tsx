
import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  avatar: string;
  utilization: number;
  skills: string[];
  location?: string;
}

export const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  avatar,
  utilization,
  skills,
  location
}) => {
  const getUtilizationColor = (util: number) => {
    if (util >= 100) return 'text-red-400';
    if (util >= 80) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-800/50 rounded-lg transition-colors border-b border-gray-800 last:border-b-0">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium truncate">{name}</h3>
          <span className={`text-sm font-medium ${getUtilizationColor(utilization)}`}>
            {utilization}%
          </span>
        </div>
        <p className="text-gray-400 text-sm truncate">{role}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="text-xs px-2 py-0.5 bg-gray-700 text-gray-300 rounded-full"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="text-xs px-2 py-0.5 bg-gray-700 text-gray-300 rounded-full">
              +{skills.length - 3}
            </span>
          )}
        </div>
        {location && (
          <p className="text-gray-500 text-xs mt-1">{location}</p>
        )}
      </div>
    </div>
  );
};
