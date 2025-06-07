
import React from 'react';

interface HeaderProps {
  view: 'week' | 'month';
  onViewChange: (view: 'week' | 'month') => void;
  onNavigate: (direction: 'prev' | 'next' | 'today') => void;
  currentDate: Date;
}

export const Header: React.FC<HeaderProps> = ({ view, onViewChange, onNavigate, currentDate }) => {
  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };
  
  const weekNumber = getWeekNumber(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
  
  const getDisplayTitle = () => {
    if (view === 'week') {
      return `Week ${weekNumber} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
  };

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-white text-lg font-semibold">
            {getDisplayTitle()}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('prev')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => onNavigate('next')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button 
            onClick={() => onNavigate('today')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Today
          </button>
          
          {/* View switcher */}
          <div className="flex items-center bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => onViewChange('week')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                view === 'week' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => onViewChange('month')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                view === 'month' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
