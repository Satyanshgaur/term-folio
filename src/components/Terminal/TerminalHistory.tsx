import React from 'react';
import type { TerminalLine } from '../../hooks/useTerminal';

interface TerminalHistoryProps {
  history: TerminalLine[];
}

const TerminalHistory: React.FC<TerminalHistoryProps> = ({ history }) => {
  return (
    <div className="space-y-6">
      {history.map((line, index) => (
        <div key={index} className="space-y-3">
          {line.type === 'input' ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 shrink-0">
                <span className="syntax-blue font-bold">satyansh</span>
                <span className="text-text-main/40">@</span>
                <span className="syntax-purple font-bold">portfolio</span>
                <span className="text-text-main/40 mx-1">:</span>
                <span className="text-text-main/80 font-bold">~</span>
                <span className="text-text-main/60">$</span>
              </div>
              <span className="text-text-main font-medium">{line.content}</span>
            </div>
          ) : (
            <div className={`leading-relaxed ${
              line.type === 'error' ? 'text-error-red/80' : 
              line.type === 'info' ? 'syntax-comment italic text-[13px]' : 'text-text-main/90'
            }`}>
              {line.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TerminalHistory;
