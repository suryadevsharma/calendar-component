"use client";

import { useState } from 'react';
import { startOfMonth, startOfToday, addMonths, subMonths } from 'date-fns';
import { HeroImage } from './HeroImage';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel } from './NotesPanel';

export function WallCalendar() {
  const [viewingMonth, setViewingMonth] = useState(startOfMonth(startOfToday()));
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const handlePrevMonth = () => setViewingMonth(subMonths(viewingMonth, 1));
  const handleNextMonth = () => setViewingMonth(addMonths(viewingMonth, 1));

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else if (date.getTime() === startDate.getTime()) {
         // clicking the same start date again resets it.
         setStartDate(null);
         setEndDate(null);
      } else {
        setEndDate(date);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col md:flex-row text-slate-800">
      <HeroImage />
      
      <div className="flex-1 w-full flex flex-col py-6 pb-20 md:py-10 md:h-screen md:overflow-y-auto relative bg-white/40">
        <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col pt-0 md:pt-4">
          <CalendarHeader 
            viewingMonth={viewingMonth} 
            onPrevMonth={handlePrevMonth} 
            onNextMonth={handleNextMonth} 
          />
          <CalendarGrid 
            viewingMonth={viewingMonth}
            startDate={startDate}
            endDate={endDate}
            onDateClick={handleDateClick}
            hoverDate={hoverDate}
            onHover={setHoverDate}
          />
          <NotesPanel startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </div>
  );
}
