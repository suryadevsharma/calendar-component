import { startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import { DayCell } from './DayCell';

interface Props {
  viewingMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDateClick: (date: Date) => void;
  hoverDate: Date | null;
  onHover: (date: Date | null) => void;
}

export function CalendarGrid({ viewingMonth, startDate, endDate, onDateClick, hoverDate, onHover }: Props) {
  const monthStart = startOfMonth(viewingMonth);
  const monthEnd = endOfMonth(viewingMonth);
  const startDateToDisplay = startOfWeek(monthStart, { weekStartsOn: 1 }); // 1 = Monday
  const endDateToDisplay = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dates = eachDayOfInterval({
    start: startDateToDisplay,
    end: endDateToDisplay
  });

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="mx-2 md:mx-6 bg-white border border-slate-200 overflow-hidden rounded-2xl shadow-sm">
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/80">
        {weekDays.map(day => (
          <div key={day} className="py-3 text-center text-xs font-semibold tracking-wider text-slate-500 uppercase border-r border-slate-100 last:border-r-0">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 border-l border-t border-slate-100/50 -ml-[1px] -mt-[1px]">
        {dates.map((day, idx) => (
          <DayCell 
            key={day.toString() + idx} 
            day={day} 
            viewingMonth={viewingMonth}
            startDate={startDate}
            endDate={endDate}
            onDateClick={onDateClick}
            hoverDate={hoverDate}
            onHover={onHover}
          />
        ))}
      </div>
    </div>
  );
}
