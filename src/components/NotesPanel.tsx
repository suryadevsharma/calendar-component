/* eslint-disable */
"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { PenLine } from 'lucide-react';

interface Props {
  startDate: Date | null;
  endDate: Date | null;
}

export function NotesPanel({ startDate, endDate }: Props) {
  const [note, setNote] = useState('');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const rangeKey = startDate && endDate
    ? `notes_${format(startDate, 'yyyy-MM-dd')}_to_${format(endDate, 'yyyy-MM-dd')}`
    : startDate
    ? `notes_${format(startDate, 'yyyy-MM-dd')}`
    : 'notes_general';
    
  const displayLabel = startDate && endDate
    ? `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`
    : startDate
    ? format(startDate, 'MMMM d, yyyy')
    : 'General Notes';

  useEffect(() => {
    if (!mounted) return;
    const savedNote = localStorage.getItem(rangeKey);
    setNote(savedNote || '');
  }, [rangeKey, mounted]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!mounted) return;
    const newNote = e.target.value;
    setNote(newNote);
    localStorage.setItem(rangeKey, newNote);
  };

  if (!mounted) return <div className="h-48 mt-8 rounded-2xl bg-slate-50 animate-pulse border border-slate-100" />;

  return (
    <div className="mt-8 md:mt-12 mx-2 md:mx-6 bg-gradient-to-br from-indigo-50/50 to-rose-50/30 border border-slate-200/60 rounded-3xl p-6 shadow-sm transition-all duration-500 ease-out hover:shadow-md">
      <div className="flex items-center space-x-3 mb-4 text-slate-700">
        <div className="p-2 bg-white rounded-full shadow-sm border border-slate-100">
          <PenLine className="w-5 h-5 text-indigo-500" />
        </div>
        <h3 className="font-medium text-lg text-slate-800 drop-shadow-sm">
          {displayLabel}
        </h3>
      </div>
      <textarea
        value={note}
        onChange={handleNoteChange}
        placeholder="Write down your thoughts, plans, or events..."
        className="w-full h-32 p-4 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 transition-all resize-none outline-none text-slate-700 text-[15px] leading-relaxed shadow-inner placeholder:text-slate-400"
      />
    </div>
  );
}
