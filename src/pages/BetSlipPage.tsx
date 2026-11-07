import React from 'react';
import { BetSlipPanel } from '../components/betslip/BetSlipPanel';
import { Receipt, Info } from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const BetSlipPage: React.FC = () => {
  const { userBalance } = useSportsbook();

  return (
    <div className="space-y-4 pb-20 lg:pb-8">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-[#00e5c9]" />
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Bet Slip & My Bets
          </h1>
        </div>
        <div className="text-xs text-slate-400">
          Available Balance:{' '}
          <span className="font-mono font-bold text-[#00e5c9]">
            {userBalance.toFixed(2)} USDT
          </span>
        </div>
      </div>

      <div className="bg-[#121824] border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl h-[700px] flex flex-col">
        <BetSlipPanel className="h-full border-l-0" />
      </div>
    </div>
  );
};
