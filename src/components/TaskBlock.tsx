
import React from 'react';

interface TaskBlockProps {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  color: 'blue' | 'purple' | 'pink' | 'cyan' | 'brown' | 'green';
  startTime?: string;
  isEditing?: boolean;
  onEdit?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
}

export const TaskBlock: React.FC<TaskBlockProps> = ({
  id,
  title,
  subtitle,
  duration,
  color,
  startTime,
  isEditing = false,
  onEdit,
  onDragStart
}) => {
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-500',
    purple: 'bg-purple-600 hover:bg-purple-500',
    pink: 'bg-pink-600 hover:bg-pink-500',
    cyan: 'bg-cyan-600 hover:bg-cyan-500',
    brown: 'bg-amber-700 hover:bg-amber-600',
    green: 'bg-green-600 hover:bg-green-500'
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onEdit}
      className={`
        ${colorClasses[color]} 
        rounded-lg p-3 text-white cursor-pointer transition-all duration-200 
        hover:scale-105 hover:shadow-lg relative group
      `}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-medium text-sm leading-tight">{title}</h4>
        <span className="text-xs opacity-75 ml-2">{duration}</span>
      </div>
      {subtitle && (
        <p className="text-xs opacity-75 leading-tight">{subtitle}</p>
      )}
      {startTime && (
        <p className="text-xs opacity-60 mt-1">{startTime}</p>
      )}
      
      {/* Edit indicator */}
      {isEditing && (
        <div className="absolute inset-0 border-2 border-white rounded-lg pointer-events-none" />
      )}
      
      {/* Drag handle */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-50 transition-opacity">
        <div className="w-1 h-1 bg-white rounded-full mb-0.5"></div>
        <div className="w-1 h-1 bg-white rounded-full mb-0.5"></div>
        <div className="w-1 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
};
