import { format, isSameMonth, isToday, isSameDay } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  day: Date;
  viewingMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDateClick: (date: Date) => void;
  hoverDate: Date | null;
  onHover: (date: Date | null) => void;
}

export function DayCell({ day, viewingMonth, startDate, endDate, onDateClick, hoverDate, onHover }: Props) {
  const isCurrentMonth = isSameMonth(day, viewingMonth);
  const isDayToday = isToday(day);
  const isStart = startDate && isSameDay(day, startDate);
  const isEnd = endDate && isSameDay(day, endDate);
  
  const isInRange = startDate && endDate && day > startDate && day < endDate;
  const isPotentialRange = startDate && !endDate && hoverDate && 
    ((day > startDate && day <= hoverDate) || (day >= hoverDate && day < startDate));

  const isSelected = isStart || isEnd;

  return (
    <div
      onClick={() => isCurrentMonth && onDateClick(day)}
      onMouseEnter={() => isCurrentMonth && onHover(day)}
      onMouseLeave={() => isCurrentMonth && onHover(null)}
      className={cn(
        "h-[4.5rem] md:h-24 lg:h-28 border-b border-r border-slate-100/60 flex flex-col items-center pt-2 relative transition-all duration-300 ease-out select-none",
        isCurrentMonth ? "cursor-pointer hover:bg-slate-50/50" : "bg-slate-50/30",
        isSelected && "z-10"
      )}
    >
      {/* Background for range highlighting */}
      {isInRange && (
        <div className="absolute inset-y-0 -inset-x-0 bg-indigo-50/60" />
      )}
      {isPotentialRange && (
        <div className="absolute inset-y-0 -inset-x-0 bg-indigo-50/30 border-y border-indigo-100/50" />
      )}
      
      {/* Start/End Range indicator connective lines */}
      {isStart && endDate && startDate < endDate && (
        <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-indigo-50/60" />
      )}
      {isEnd && startDate && startDate < endDate && (
        <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-indigo-50/60" />
      )}
      {isStart && endDate && startDate > endDate && (
        <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-indigo-50/60" />
      )}
      {isEnd && startDate && startDate > endDate && (
        <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-indigo-50/60" />
      )}

      {/* Selected day rounded background */}
      <div className={cn(
        "w-8 h-8 flex items-center justify-center rounded-full text-[15px] relative z-10 transition-all duration-300",
        isSelected ? "bg-indigo-600 text-white shadow-md shadow-indigo-200/50 font-medium scale-105" : 
        isDayToday ? "bg-rose-100 text-rose-700 font-medium" :
        !isCurrentMonth ? "text-slate-300" :
        "text-slate-700 font-medium group-hover:text-slate-900"
      )}>
        {format(day, 'd')}
      </div>
    </div>
  );
}
