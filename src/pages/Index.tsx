import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { CalendarGrid } from '../components/CalendarGrid';

interface Task {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  color: 'blue' | 'purple' | 'pink' | 'cyan' | 'brown' | 'green';
  day: number;
  userId: string;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Revisions / EMEA launch / Grab',
      duration: '2h',
      color: 'purple',
      day: 27,
      userId: 'pam-gonzalez'
    },
    {
      id: '2', 
      title: 'Wireframes',
      subtitle: 'Site redesign\nNIO',
      duration: '6h',
      color: 'blue',
      day: 28,
      userId: 'pam-gonzalez'
    },
    {
      id: '3',
      title: 'UI design',
      subtitle: 'Site redesign\nNIO', 
      duration: '8h',
      color: 'blue',
      day: 1,
      userId: 'pam-gonzalez'
    },
    {
      id: '4',
      title: 'Launch assets',
      subtitle: 'Data dashboard\nNIO',
      duration: '4h',
      color: 'pink',
      day: 4,
      userId: 'pam-gonzalez'
    },
    {
      id: '5',
      title: 'Scoping',
      subtitle: 'Summer campaign\nAirbnb',
      duration: '6h',
      color: 'cyan',
      day: 27,
      userId: 'rachel-li'
    },
    {
      id: '6',
      title: 'Management strategy',
      subtitle: 'Internal',
      duration: '8h',
      color: 'purple',
      day: 31,
      userId: 'rachel-li'
    },
    {
      id: '7',
      title: 'Rollout plan',
      subtitle: 'APAC campaign\nSelecta',
      duration: '6h',
      color: 'brown',
      day: 4,
      userId: 'rachel-li'
    },
    {
      id: '8',
      title: 'Brand story',
      subtitle: 'Site redesign\nNIO',
      duration: '6h',
      color: 'blue',
      day: 29,
      userId: 'tami-aguta'
    },
    {
      id: '9',
      title: 'Copy review / EMEA launch / Grab',
      duration: '4h',
      color: 'purple',
      day: 1,
      userId: 'tami-aguta'
    },
    {
      id: '10',
      title: 'Brand story',
      subtitle: 'Site redesign\nNIO',
      duration: '6h',
      color: 'blue',
      day: 5,
      userId: 'tami-aguta'
    },
    {
      id: '11',
      title: 'Development',
      subtitle: 'Data dashboard\nNIO',
      duration: '8h',
      color: 'pink',
      day: 29,
      userId: 'xavier-ivison'
    },
    {
      id: '12',
      title: 'Front end development',
      subtitle: 'Summer campaign\nAirbnb',
      duration: '6h',
      color: 'cyan',
      day: 1,
      userId: 'xavier-ivison'
    },
    {
      id: '13',
      title: 'App build',
      duration: '8h',
      color: 'green',
      day: 30,
      userId: 'placeholder-role'
    },
    {
      id: '14',
      title: 'App build',
      duration: '6h',
      color: 'green',
      day: 1,
      userId: 'placeholder-role'
    }
  ]);

  const handleTaskMove = (taskId: string, newDay: number, newUserId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, day: newDay, userId: newUserId }
          : task
      )
    );
  };

  const handleTaskEdit = (taskId: string) => {
    console.log('Editing task:', taskId);
    // Here you would implement task editing functionality
  };

  return (
    <div className="h-screen bg-gray-950 flex flex-col">
      <Header />
      <div className="flex-1 flex min-h-0">
        <Sidebar />
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
