
import React, { useState } from 'react';
import { TaskBlock } from './TaskBlock';

interface Task {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  color: 'blue' | 'purple' | 'pink' | 'cyan' | 'brown' | 'green';
  day: number;
  userId: string;
}

interface CalendarGridProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newDay: number, newUserId: string) => void;
  onTaskEdit: (taskId: string) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  tasks,
  onTaskMove,
  onTaskEdit
}) => {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<string | null>(null);

  const days = [
    { day: 27, name: 'Mon 27' },
    { day: 28, name: 'Tue 28' },
    { day: 29, name: 'Wed 29' },
    { day: 30, name: 'Thu 30' },
    { day: 31, name: 'Fri 31' },
    { day: 1, name: 'Mon 1', isNext: true },
    { day: 2, name: 'Tue 2', isNext: true },
    { day: 3, name: 'Wed 3', isNext: true },
    { day: 4, name: 'Thu 4', isNext: true },
    { day: 5, name: 'Fri 5', isNext: true }
  ];

  const users = [
    'pam-gonzalez',
    'rachel-li', 
    'tami-aguta',
    'xavier-ivison',
    'placeholder-role'
  ];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, day: number, userId: string) => {
    e.preventDefault();
    if (draggedTask) {
      onTaskMove(draggedTask, day, userId);
      setDraggedTask(null);
    }
  };

  const getTasksForDayAndUser = (day: number, userId: string) => {
    return tasks.filter(task => task.day === day && task.userId === userId);
  };

  return (
    <div className="flex-1 bg-gray-950 overflow-auto">
      {/* Header with day names */}
      <div className="sticky top-0 bg-gray-900 border-b border-gray-800 z-10">
        <div className="grid grid-cols-10 gap-px">
          {days.map((day, index) => (
            <div key={index} className="bg-gray-900 p-4 text-center border-r border-gray-800 last:border-r-0">
              <div className="text-gray-300 text-sm font-medium">{day.name}</div>
              {day.isNext && (
                <div className={`w-8 h-8 mx-auto mt-2 rounded-full flex items-center justify-center text-sm font-medium ${
                  day.day === 1 ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'
                }`}>
                  {day.day}
                </div>
              )}
              {!day.isNext && (
                <div className="w-8 h-8 mx-auto mt-2 rounded-full flex items-center justify-center text-sm font-medium text-gray-500">
                  {day.day}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Body */}
      <div className="grid grid-cols-10 gap-px bg-gray-800">
        {days.map((day) => (
          users.map((userId) => (
            <div
              key={`${day.day}-${userId}`}
              className="bg-gray-900 p-3 min-h-[150px] border-r border-gray-800 last:border-r-0 hover:bg-gray-800/30 transition-colors relative"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, day.day, userId)}
            >
              <div className="space-y-2">
                {getTasksForDayAndUser(day.day, userId).map((task) => (
                  <TaskBlock
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    subtitle={task.subtitle}
                    duration={task.duration}
                    color={task.color}
                    isEditing={editingTask === task.id}
                    onEdit={() => {
                      setEditingTask(editingTask === task.id ? null : task.id);
                      onTaskEdit(task.id);
                    }}
                    onDragStart={(e) => handleDragStart(e, task.id)}
                  />
                ))}
              </div>
              
              {/* Drop zone indicator */}
              {draggedTask && (
                <div className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-lg pointer-events-none opacity-0 hover:opacity-100 transition-opacity" />
              )}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};
