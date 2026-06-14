import React, { useEffect, useRef } from 'react';
import { useTerminal } from '../../hooks/useTerminal';
import TerminalHistory from './TerminalHistory';
import TerminalInput from './TerminalInput';

interface TerminalProps {
  onActiveContextChange?: (id: string | null) => void;
}

const Terminal: React.FC<TerminalProps> = ({ onActiveContextChange }) => {
  const { history, executeCommand } = useTerminal(onActiveContextChange);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="h-full w-full flex flex-col font-mono text-text-main/90">
      {/* Terminal Output Area */}
      <div 
        ref={scrollRef}
        className="flex-1 p-8 overflow-y-auto terminal-scroll space-y-4 pb-32"
      >
        <TerminalHistory history={history} />
        <TerminalInput onExecute={executeCommand} />
      </div>
    </div>
  );
};

export default Terminal;
