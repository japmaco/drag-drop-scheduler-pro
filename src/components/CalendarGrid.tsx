
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

  // Get current date and week
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth(); // 0-based (5 = June)
  const currentYear = today.getFullYear();
  
  // Calculate week number
  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };
  
  const weekNumber = getWeekNumber(today);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Generate days centered around today (June 5th)
  const days = [
    { day: 3, name: 'Mon 3', dayOfWeek: 'Mon' },
    { day: 4, name: 'Tue 4', dayOfWeek: 'Tue' },
    { day: 5, name: 'Wed 5', dayOfWeek: 'Wed', isToday: true },
    { day: 6, name: 'Thu 6', dayOfWeek: 'Thu' },
    { day: 7, name: 'Fri 7', dayOfWeek: 'Fri' },
    { day: 10, name: 'Mon 10', dayOfWeek: 'Mon' },
    { day: 11, name: 'Tue 11', dayOfWeek: 'Tue' },
    { day: 12, name: 'Wed 12', dayOfWeek: 'Wed' },
    { day: 13, name: 'Thu 13', dayOfWeek: 'Thu' },
    { day: 14, name: 'Fri 14', dayOfWeek: 'Fri' }
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
      {/* Header with week info and day names */}
      <div className="sticky top-0 bg-gray-900 border-b border-gray-800 z-10">
        {/* Week number header */}
        <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
          <h2 className="text-white text-lg font-semibold">
            Week {weekNumber} {monthNames[currentMonth]} {currentYear}
          </h2>
        </div>
        
        {/* Day names grid */}
        <div className="grid grid-cols-11 gap-px">
          {/* Empty cell for the name column */}
          <div className="bg-gray-900 p-4 border-r border-gray-800"></div>
          {days.map((day, index) => (
            <div key={index} className="bg-gray-900 p-4 text-center border-r border-gray-800 last:border-r-0">
              <div className="text-gray-300 text-sm font-medium">{day.name}</div>
              <div className={`w-8 h-8 mx-auto mt-2 rounded-full flex items-center justify-center text-sm font-medium ${
                day.isToday 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:bg-gray-800'
              }`}>
                {day.day}
              </div>
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
