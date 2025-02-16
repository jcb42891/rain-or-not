'use client';

import { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
      >
        <span>{title}</span>
        <span className="transition-transform duration-200" style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}>
          ▼
        </span>
      </button>
      
      <div 
        className={`transition-all duration-200 overflow-hidden ${isOpen ? 'max-h-40 mt-4' : 'max-h-0'}`}
      >
        {children}
      </div>
    </div>
  );
} 