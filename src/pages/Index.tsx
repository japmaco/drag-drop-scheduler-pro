import React, { useState } from 'react';
import { Header } from '../components/Header';
import { CalendarGrid } from '../components/CalendarGrid';

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

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Revisions / EMEA launch / Grab',
      duration: '2 days',
      color: 'purple',
      startDay: 3,
      endDay: 4,
      userId: 'pam-gonzalez'
    },
    {
      id: '2', 
      title: 'Wireframes',
      subtitle: 'Site redesign\nNIO',
      duration: '3 days',
      color: 'blue',
      startDay: 5,
      endDay: 7,
      userId: 'pam-gonzalez'
    },
    {
      id: '3',
      title: 'UI design',
      subtitle: 'Site redesign\nNIO', 
      duration: '3 days',
      color: 'blue',
      startDay: 10,
      endDay: 12,
      userId: 'pam-gonzalez'
    },
    {
      id: '4',
      title: 'Launch assets',
      subtitle: 'Data dashboard\nNIO',
      duration: '2 days',
      color: 'pink',
      startDay: 13,
      endDay: 14,
      userId: 'pam-gonzalez'
    },
    {
      id: '5',
      title: 'Scoping',
      subtitle: 'Summer campaign\nAirbnb',
      duration: '3 days',
      color: 'cyan',
      startDay: 3,
      endDay: 5,
      userId: 'rachel-li'
    },
    {
      id: '6',
      title: 'Management strategy',
      subtitle: 'Internal',
      duration: '4 days',
      color: 'purple',
      startDay: 7,
      endDay: 10,
      userId: 'rachel-li'
    },
    {
      id: '7',
      title: 'Rollout plan',
      subtitle: 'APAC campaign\nSelecta',
      duration: '3 days',
      color: 'brown',
      startDay: 11,
      endDay: 13,
      userId: 'rachel-li'
    },
    {
      id: '8',
      title: 'Brand story',
      subtitle: 'Site redesign\nNIO',
      duration: '3 days',
      color: 'blue',
      startDay: 4,
      endDay: 6,
      userId: 'tami-aguta'
    },
    {
      id: '9',
      title: 'Copy review / EMEA launch / Grab',
      duration: '2 days',
      color: 'purple',
      startDay: 10,
      endDay: 11,
      userId: 'tami-aguta'
    },
    {
      id: '10',
      title: 'Brand story',
      subtitle: 'Site redesign\nNIO',
      duration: '3 days',
      color: 'blue',
      startDay: 12,
      endDay: 14,
      userId: 'tami-aguta'
    },
    {
      id: '11',
      title: 'Development',
      subtitle: 'Data dashboard\nNIO',
      duration: '3 days',
      color: 'pink',
      startDay: 5,
      endDay: 7,
      userId: 'xavier-ivison'
    },
    {
      id: '12',
      title: 'Front end development',
      subtitle: 'Summer campaign\nAirbnb',
      duration: '3 days',
      color: 'cyan',
      startDay: 10,
      endDay: 12,
      userId: 'xavier-ivison'
    },
    {
      id: '13',
      title: 'App build',
      duration: '5 days',
      color: 'green',
      startDay: 6,
      endDay: 10,
      userId: 'placeholder-role'
    },
    {
      id: '14',
      title: 'App build',
      duration: '4 days',
      color: 'green',
      startDay: 11,
      endDay: 14,
      userId: 'placeholder-role'
    }
  ]);

  const calculateDynamicDuration = (startDay: number, endDay: number) => {
    const days = endDay - startDay + 1;
    return `${days} day${days > 1 ? 's' : ''}`;
  };

  const handleTaskMove = (taskId: string, newStartDay: number, newUserId: string) => {
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks];
      const taskIndex = updatedTasks.findIndex(task => task.id === taskId);
      
      if (taskIndex === -1) return prevTasks;
      
      const movedTask = updatedTasks[taskIndex];
      const originalStartDay = movedTask.startDay;
      const taskDuration = movedTask.endDay - movedTask.startDay;
      const daysDifference = newStartDay - originalStartDay;
      
      // Update the moved task
      updatedTasks[taskIndex] = {
        ...movedTask,
        startDay: newStartDay,
        endDay: newStartDay + taskDuration,
        userId: newUserId,
        duration: calculateDynamicDuration(newStartDay, newStartDay + taskDuration)
      };
      
      // If moving within the same user's row, shift other tasks to prevent overlap
      if (newUserId === movedTask.userId && daysDifference !== 0) {
        updatedTasks.forEach((task, index) => {
          if (index !== taskIndex && task.userId === newUserId) {
            // Check if this task needs to be moved to avoid overlap
            const movedTaskEnd = newStartDay + taskDuration;
            const taskStart = task.startDay;
            const taskEnd = task.endDay;
            
            // If the moved task overlaps with this task, shift this task
            if (daysDifference > 0) {
              // Moving right - shift tasks that overlap
              if (taskStart <= movedTaskEnd && taskEnd >= newStartDay) {
                const shiftAmount = movedTaskEnd - taskStart + 1;
                updatedTasks[index] = {
                  ...task,
                  startDay: task.startDay + shiftAmount,
                  endDay: task.endDay + shiftAmount,
                  duration: calculateDynamicDuration(task.startDay + shiftAmount, task.endDay + shiftAmount)
                };
              }
            } else {
              // Moving left - shift tasks that overlap
              if (taskStart <= movedTaskEnd && taskEnd >= newStartDay) {
                const shiftAmount = originalStartDay - (task.endDay + 1);
                if (shiftAmount < 0) {
                  updatedTasks[index] = {
                    ...task,
                    startDay: task.startDay + shiftAmount,
                    endDay: task.endDay + shiftAmount,
                    duration: calculateDynamicDuration(task.startDay + shiftAmount, task.endDay + shiftAmount)
                  };
                }
              }
            }
          }
        });
      }
      
      return updatedTasks;
    });
  };

  const handleTaskEdit = (taskId: string) => {
    console.log('Editing task:', taskId);
    // Here you would implement task editing functionality
  };

  return (
    <div className="h-screen bg-gray-950 flex flex-col">
      <Header />
      <div className="flex-1 min-h-0">
        <CalendarGrid 
          tasks={tasks}
          onTaskMove={handleTaskMove}
          onTaskEdit={handleTaskEdit}
        />
      </div>
    </div>
  );
};

export default Index;
