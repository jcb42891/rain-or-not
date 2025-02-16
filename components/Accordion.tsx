'use client';

import { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  titleClassName?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function Accordion({ 
  title, 
  children, 
  titleClassName = '',
  isOpen: controlledIsOpen,
  onOpenChange,
}: AccordionProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;
  const setIsOpen = onOpenChange ?? setUncontrolledIsOpen;

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-center gap-2 text-muted hover:text-foreground ${titleClassName}`}
      >
        <span>{title}</span>
        <span 
          className="transition-transform duration-200" 
          style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
        >
          ▼
        </span>
      </button>
      
      <div 
        className={`transition-all duration-200 overflow-hidden ${isOpen ? 'max-h-80 mt-4' : 'max-h-0'}`}
      >
        {children}
      </div>
    </div>
  );
} 