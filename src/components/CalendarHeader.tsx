import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  viewingMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({ viewingMonth, onPrevMonth, onNextMonth }: Props) {
  return (
    <div className="flex items-center justify-between mb-8 px-2 md:px-6 mt-4">
      <h2 className="text-4xl font-light text-slate-800 tracking-tight flex items-baseline gap-2">
        <span className="font-semibold">{format(viewingMonth, 'MMMM')}</span>
        <span className="text-slate-500 text-3xl font-medium">{format(viewingMonth, 'yyyy')}</span>
      </h2>
      <div className="flex space-x-3">
        <button
          onClick={onPrevMonth}
          className="p-2.5 rounded-full hover:bg-slate-50 active:scale-95 transition-all shadow-sm bg-white border border-slate-200/60 text-slate-500 hover:text-slate-800 hover:border-slate-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNextMonth}
          className="p-2.5 rounded-full hover:bg-slate-50 active:scale-95 transition-all shadow-sm bg-white border border-slate-200/60 text-slate-500 hover:text-slate-800 hover:border-slate-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
