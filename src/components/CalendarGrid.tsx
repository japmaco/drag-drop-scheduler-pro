
import React, { useState } from 'react';
import { TaskBlock } from './TaskBlock';

interface Task {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  color: 'blue' | 'purple' | 'pink' | 'cyan' | 'brown' | 'green';
  startDay: number;
  endDay: number;
  userId: string;
}

interface CalendarGridProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStartDay: number, newUserId: string) => void;
  onTaskEdit: (taskId: string) => void;
  view: 'week' | 'month';
  currentDate: Date;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  tasks,
  onTaskMove,
  onTaskEdit,
  view,
  currentDate
}) => {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<string | null>(null);

  const users = [
    { id: 'pam-gonzalez', name: 'Pam Gonzalez', role: 'Senior Designer' },
    { id: 'rachel-li', name: 'Rachel Li', role: 'Senior Producer' },
    { id: 'tami-aguta', name: 'Tami Aguta', role: 'Copywriter' },
    { id: 'xavier-ivison', name: 'Xavier Ivison', role: 'Web Developer' },
    { id: 'placeholder-role', name: 'Placeholder role', role: 'Mobile Developer' }
  ];

  // Generate days based on view
  const generateDays = () => {
    const days = [];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    if (view === 'week') {
      // 14-day view
      const startOfWeek = new Date(currentDate);
      const dayOfWeek = currentDate.getDay();
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      startOfWeek.setDate(currentDate.getDate() + mondayOffset);
      
      for (let i = 0; i < 14; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        const isToday = day.toDateString() === new Date().toDateString();
        
        days.push({
          day: day.getDate(),
          name: `${dayNames[i % 7]} ${day.getDate()}`,
          dayOfWeek: dayNames[i % 7],
          isToday,
          fullDate: new Date(day)
        });
      }
    } else {
      // Month view - show full month in weeks
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      // Start from the Monday of the week containing the first day
      const startDate = new Date(firstDay);
      const firstDayOfWeek = firstDay.getDay();
      const mondayOffset = firstDayOfWeek === 0 ? -6 : 1 - firstDayOfWeek;
      startDate.setDate(firstDay.getDate() + mondayOffset);
      
      // Calculate how many days we need (always show complete weeks)
      const endDate = new Date(lastDay);
      const lastDayOfWeek = lastDay.getDay();
      const sundayOffset = lastDayOfWeek === 0 ? 0 : 7 - lastDayOfWeek;
      endDate.setDate(lastDay.getDate() + sundayOffset);
      
      const currentDay = new Date(startDate);
      while (currentDay <= endDate) {
        const dayOfWeek = currentDay.getDay();
        const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const isToday = currentDay.toDateString() === new Date().toDateString();
        const isCurrentMonth = currentDay.getMonth() === month;
        
        days.push({
          day: currentDay.getDate(),
          name: `${dayNames[dayIndex]} ${currentDay.getDate()}`,
          dayOfWeek: dayNames[dayIndex],
          isToday,
          isCurrentMonth,
          fullDate: new Date(currentDay)
        });
        
        currentDay.setDate(currentDay.getDate() + 1);
      }
    }
    
    return days;
  };

  const days = generateDays();

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

  const getTasksForUser = (userId: string) => {
    return tasks.filter(task => task.userId === userId);
  };

  const getDayIndex = (day: number) => {
    return days.findIndex(d => d.day === day);
  };

  const getTaskWidth = (task: Task) => {
    const startIndex = getDayIndex(task.startDay);
    const endIndex = getDayIndex(task.endDay);
    
    if (startIndex === -1 || endIndex === -1) return 1;
    
    return endIndex - startIndex + 1;
  };

  const getTaskStartPosition = (task: Task) => {
    return getDayIndex(task.startDay);
  };

  const isTaskVisible = (task: Task) => {
    const startIndex = getDayIndex(task.startDay);
    const endIndex = getDayIndex(task.endDay);
    return startIndex !== -1 || endIndex !== -1;
  };

  const gridCols = view === 'week' ? 14 : days.length > 21 ? 7 : days.length;
  const nameColumnWidth = view === 'week' ? '140px' : '140px'; // Reduced by 30%

  return (
    <div className="flex-1 bg-gray-950 overflow-auto">
      {/* Day names grid */}
      <div className="sticky top-0 bg-gray-900 border-b border-gray-800 z-10">
        <div className="grid gap-px" style={{ gridTemplateColumns: `${nameColumnWidth} repeat(${gridCols}, 1fr)` }}>
          <div className="bg-gray-900 p-1 border-r border-gray-800"></div>
          {days.map((day, index) => {
            if (view === 'month' && index >= gridCols) return null;
            return (
              <div key={index} className="bg-gray-900 p-1 text-center border-r border-gray-800 last:border-r-0">
                <div className={`text-xs font-medium ${
                  view === 'month' && !day.isCurrentMonth ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  {day.name}
                </div>
                <div className={`w-6 h-6 mx-auto mt-1 rounded-full flex items-center justify-center text-xs font-medium ${
                  day.isToday 
                    ? 'bg-blue-600 text-white' 
                    : view === 'month' && !day.isCurrentMonth
                    ? 'text-gray-600 hover:bg-gray-800'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}>
                  {day.day}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar Body */}
      <div className="bg-gray-800">
        {view === 'month' && days.length > 7 ? (
          // Month view with multiple weeks
          <div className="space-y-px">
            {Array.from({ length: Math.ceil(days.length / 7) }, (_, weekIndex) => (
              <div key={weekIndex}>
                {users.map((user) => (
                  <div key={`${user.id}-week-${weekIndex}`} className="grid gap-px border-b border-gray-800 last:border-b-0" style={{ gridTemplateColumns: `${nameColumnWidth} repeat(7, 1fr)` }}>
                    {/* Team member name column */}
                    <div className="bg-gray-900 p-1 border-r border-gray-800 flex items-center min-h-[30px]">
                      <div className="flex items-center gap-2 w-full">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-white text-xs font-medium truncate">{user.name}</div>
                          <div className="text-gray-400 text-xs truncate">{user.role}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Day cells for this user and week */}
                    {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                      <div
                        key={`${day.day}-${user.id}-${weekIndex}`}
                        className={`bg-gray-900 p-1 border-r border-gray-800 last:border-r-0 hover:bg-gray-800/30 transition-colors min-h-[30px] relative ${
                          !day.isCurrentMonth ? 'opacity-50' : ''
                        }`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, day.day, user.id)}
                      >
                        {/* Tasks for this specific day and user */}
                        {getTasksForUser(user.id)
                          .filter(task => task.startDay <= day.day && task.endDay >= day.day)
                          .map((task) => (
                            <div key={task.id} className="mb-1">
                              <TaskBlock
                                id={task.id}
                                title={task.title}
                                subtitle={task.subtitle}
                                duration={task.duration}
                                color={task.color}
                                isEditing={editingTask === task.id}
                                isMultiDay={task.endDay > task.startDay}
                                onEdit={() => {
                                  setEditingTask(editingTask === task.id ? null : task.id);
                                  onTaskEdit(task.id);
                                }}
                                onDragStart={(e) => handleDragStart(e, task.id)}
                              />
                            </div>
                          ))}
                        
                        {draggedTask && (
                          <div className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-lg pointer-events-none opacity-0 hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          // Week view or single week month view
          <>
            {users.map((user) => (
              <div key={user.id} className="grid gap-px border-b border-gray-800 last:border-b-0" style={{ gridTemplateColumns: `${nameColumnWidth} repeat(${gridCols}, 1fr)` }}>
                {/* Team member name column */}
                <div className="bg-gray-900 p-1 border-r border-gray-800 flex items-center min-h-[30px]">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-white text-xs font-medium truncate">{user.name}</div>
                      <div className="text-gray-400 text-xs truncate">{user.role}</div>
                    </div>
                  </div>
                </div>
                
                {/* Day cells for this user */}
                {days.slice(0, gridCols).map((day) => (
                  <div
                    key={`${day.day}-${user.id}`}
                    className="bg-gray-900 p-1 border-r border-gray-800 last:border-r-0 hover:bg-gray-800/30 transition-colors min-h-[30px] relative"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, day.day, user.id)}
                  >
                    {/* Tasks for this specific day and user */}
                    {getTasksForUser(user.id)
                      .filter(task => task.startDay <= day.day && task.endDay >= day.day)
                      .map((task) => (
                        <div key={task.id} className="mb-1">
                          <TaskBlock
                            id={task.id}
                            title={task.title}
                            subtitle={task.subtitle}
                            duration={task.duration}
                            color={task.color}
                            isEditing={editingTask === task.id}
                            isMultiDay={task.endDay > task.startDay}
                            onEdit={() => {
                              setEditingTask(editingTask === task.id ? null : task.id);
                              onTaskEdit(task.id);
                            }}
                            onDragStart={(e) => handleDragStart(e, task.id)}
                          />
                        </div>
                      ))}
                    
                    {draggedTask && (
                      <div className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-lg pointer-events-none opacity-0 hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
