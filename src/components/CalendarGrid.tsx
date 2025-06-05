
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
    { id: 'pam-gonzalez', name: 'Pam Gonzalez', role: 'Senior Designer' },
    { id: 'rachel-li', name: 'Rachel Li', role: 'Senior Producer' },
    { id: 'tami-aguta', name: 'Tami Aguta', role: 'Copywriter' },
    { id: 'xavier-ivison', name: 'Xavier Ivison', role: 'Web Developer' },
    { id: 'placeholder-role', name: 'Placeholder role', role: 'Mobile Developer' }
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
        <div className="grid grid-cols-11 gap-px">
          {/* Empty cell for the name column */}
          <div className="bg-gray-900 p-4 border-r border-gray-800"></div>
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

      {/* Calendar Body with team member rows */}
      <div className="bg-gray-800">
        {users.map((user) => (
          <div key={user.id} className="grid grid-cols-11 gap-px border-b border-gray-800 last:border-b-0">
            {/* Team member name column */}
            <div className="bg-gray-900 p-4 border-r border-gray-800 flex items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{user.name}</div>
                  <div className="text-gray-400 text-xs">{user.role}</div>
                </div>
              </div>
            </div>
            
            {/* Calendar cells for this user */}
            {days.map((day) => (
              <div
                key={`${day.day}-${user.id}`}
                className="bg-gray-900 p-3 min-h-[100px] border-r border-gray-800 last:border-r-0 hover:bg-gray-800/30 transition-colors relative"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, day.day, user.id)}
              >
                <div className="space-y-2">
                  {getTasksForDayAndUser(day.day, user.id).map((task) => (
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
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
