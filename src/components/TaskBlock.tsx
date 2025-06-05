
import React from 'react';

interface TaskBlockProps {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  color: 'blue' | 'purple' | 'pink' | 'cyan' | 'brown' | 'green';
  startTime?: string;
  isEditing?: boolean;
  isMultiDay?: boolean;
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
  isMultiDay = false,
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
        hover:scale-105 hover:shadow-lg relative group w-full
        ${isMultiDay ? 'min-h-[60px]' : ''}
      `}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-medium text-sm leading-tight truncate flex-1 mr-2">{title}</h4>
        <span className="text-xs opacity-75 whitespace-nowrap">{duration}</span>
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
      
      {/* Drag handle - positioned differently for multi-day tasks */}
      <div className={`absolute opacity-0 group-hover:opacity-50 transition-opacity ${
        isMultiDay ? 'top-2 left-2' : 'top-2 right-2'
      }`}>
        <div className="w-1 h-1 bg-white rounded-full mb-0.5"></div>
        <div className="w-1 h-1 bg-white rounded-full mb-0.5"></div>
        <div className="w-1 h-1 bg-white rounded-full"></div>
      </div>
      
      {/* Multi-day indicator */}
      {isMultiDay && (
        <div className="absolute bottom-2 right-2 text-xs opacity-60">
          Multi-day
        </div>
      )}
    </div>
  );
};
