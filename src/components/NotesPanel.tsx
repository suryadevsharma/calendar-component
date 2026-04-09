/* eslint-disable */
"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { PenLine, CheckCircle2 } from 'lucide-react';

interface Props {
  startDate: Date | null;
  endDate: Date | null;
}

export function NotesPanel({ startDate, endDate }: Props) {
  const [note, setNote] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
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
    setIsSaved(false);
  }, [rangeKey, mounted]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!mounted) return;
    const newNote = e.target.value;
    setNote(newNote);
    localStorage.setItem(rangeKey, newNote);
    setIsSaved(false);
  };

  const handleSave = () => {
    if (!mounted) return;
    localStorage.setItem(rangeKey, note);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  if (!mounted) return <div className="h-48 mt-8 rounded-2xl bg-slate-50 animate-pulse border border-slate-100" />;

  return (
    <div className="mt-8 md:mt-12 mx-2 md:mx-6 bg-gradient-to-br from-indigo-50/50 to-rose-50/30 border border-slate-200/60 rounded-3xl p-6 shadow-sm transition-all duration-500 ease-out hover:shadow-md flex flex-col">
      <div className="flex items-center space-x-3 mb-4 text-slate-700">
        <div className="p-2 bg-white rounded-full shadow-sm border border-slate-100">
          <PenLine className="w-5 h-5 text-indigo-500" />
        </div>
        <h3 className="font-medium text-lg text-slate-800 drop-shadow-sm flex-1">
          {displayLabel}
        </h3>
      </div>
      
      <textarea
        value={note}
        onChange={handleNoteChange}
        placeholder="Write down your thoughts, plans, or events..."
        className="w-full h-32 p-4 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 transition-all resize-none outline-none text-slate-700 text-[15px] leading-relaxed shadow-inner placeholder:text-slate-400 mb-4"
      />
      
      <div className="flex justify-end items-center space-x-3">
        {isSaved && (
          <span className="text-emerald-600 text-sm font-medium flex items-center bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/50 shadow-sm animate-in fade-in zoom-in duration-200">
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Saved
          </span>
        )}
        <button 
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm shadow-indigo-200 active:scale-95 flex items-center"
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
