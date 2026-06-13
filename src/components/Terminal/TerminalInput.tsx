import React, { useState, useEffect, useRef } from 'react';

interface TerminalInputProps {
  onExecute: (command: string) => void;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ onExecute }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleGlobalClick = () => inputRef.current?.focus();
    window.addEventListener('click', handleGlobalClick);
    inputRef.current?.focus();

    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onExecute(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 group mt-2">
      <div className="flex items-center gap-1 shrink-0">
        <span className="syntax-blue font-bold">satyansh</span>
        <span className="text-text-main/40">@</span>
        <span className="syntax-purple font-bold">portfolio</span>
        <span className="text-text-main/40 mx-1">:</span>
        <span className="text-text-main/80 font-bold">~</span>
        <span className="text-text-main/60">$</span>
      </div>
      <div className="relative flex-1 flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-transparent border-none outline-none ring-0 p-0 text-text-main font-mono caret-transparent"
          spellCheck={false}
          autoComplete="off"
          autoFocus
        />
        <div 
          className="absolute pointer-events-none text-text-main font-mono whitespace-pre"
          style={{ left: 0 }}
        >
          <span className="opacity-0">{input}</span>
          <span className="cursor-soft"></span>
        </div>
      </div>
    </form>
  );
};

export default TerminalInput;
