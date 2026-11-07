import React from 'react';
import { Lock, TrendingUp, TrendingDown } from 'lucide-react';
import { useSportsbook } from '../../context/SportsbookContext';

interface OddsButtonProps {
  label: string;
  odds: number;
  isSelected?: boolean;
  isSuspended?: boolean;
  flashDirection?: 'up' | 'down';
  onClick: () => void;
  className?: string;
  compact?: boolean;
}

export const OddsButton: React.FC<OddsButtonProps> = ({
  label,
  odds,
  isSelected = false,
  isSuspended = false,
  flashDirection,
  onClick,
  className = '',
  compact = false,
}) => {
  return (
    <button
      type="button"
      disabled={isSuspended}
      onClick={(e) => {
        e.stopPropagation();
        if (!isSuspended) onClick();
      }}
      className={`
        relative group flex items-center justify-between transition-all duration-150 select-none
        border rounded-lg text-left
        ${compact ? 'py-1.5 px-2.5 text-xs' : 'py-2.5 px-3 text-sm'}
        ${
          isSuspended
            ? 'bg-[#141a24] border-slate-800 text-slate-500 cursor-not-allowed opacity-75'
            : isSelected
            ? 'bg-[#00e5c9]/15 border-[#00e5c9] text-white shadow-[0_0_12px_rgba(0,229,201,0.25)]'
            : 'bg-[#141c2b] hover:bg-[#1a2538] border-slate-800/80 hover:border-slate-700 text-slate-200'
        }
        ${flashDirection === 'up' ? 'animate-flash-up' : ''}
        ${flashDirection === 'down' ? 'animate-flash-down' : ''}
        ${className}
      `}
      title={isSuspended ? 'Market Suspended' : `${label} @ ${odds.toFixed(2)}`}
    >
      {/* Selection Label */}
      <span className={`font-medium truncate mr-2 ${isSelected ? 'text-[#00e5c9]' : 'text-slate-300'}`}>
        {label}
      </span>

      {/* Odds or Suspended state */}
      <div className="flex items-center gap-1 shrink-0">
        {isSuspended ? (
          <span className="flex items-center gap-1 text-[11px] font-medium text-amber-500/90 uppercase tracking-wider">
            <Lock className="w-3 h-3 text-amber-500" />
            <span className="hidden sm:inline">Susp</span>
          </span>
        ) : (
          <div className="flex items-center gap-0.5 font-mono tabular-nums font-bold">
            {flashDirection === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
            {flashDirection === 'down' && <TrendingDown className="w-3 h-3 text-rose-400" />}
            <span
              className={`
                ${isSelected ? 'text-[#00e5c9]' : 'text-white'}
                ${flashDirection === 'up' ? 'text-emerald-400 font-extrabold' : ''}
                ${flashDirection === 'down' ? 'text-rose-400 font-extrabold' : ''}
              `}
            >
              {odds.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </button>
  );
};
