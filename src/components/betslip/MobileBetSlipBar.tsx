import React from 'react';
import { Receipt, ChevronUp, ChevronDown } from 'lucide-react';
import { useSportsbook } from '../../context/SportsbookContext';
import { BetSlipPanel } from './BetSlipPanel';

export const MobileBetSlipBar: React.FC = () => {
  const {
    betSlip,
    myBets,
    isBetSlipOpenOnMobile,
    setIsBetSlipOpenOnMobile,
  } = useSportsbook();

  const totalStake = betSlip.reduce((sum, item) => sum + (item.stake || 0), 0);
  const totalPotentialReturn = betSlip.reduce(
    (sum, item) => sum + (item.stake || 0) * item.odds,
    0
  );
  const openBetsCount = myBets.filter((b) => b.status === 'open').length;

  return (
    <>
      {/* Fixed Bottom Bar on Phone */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d121c]/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 shadow-2xl">
        <button
          type="button"
          onClick={() => setIsBetSlipOpenOnMobile(true)}
          className="w-full flex items-center justify-between bg-[#161f30] active:bg-[#1c263c] border border-slate-700/80 rounded-xl px-3 py-2 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg bg-[#00e5c9]/15 flex items-center justify-center text-[#00e5c9]">
              <Receipt className="w-4 h-4" />
              {betSlip.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00e5c9] text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  {betSlip.length}
                </span>
              )}
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Bet Slip</span>
                {openBetsCount > 0 && (
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/15 px-1.5 py-0.2 rounded">
                    {openBetsCount} In Play
                  </span>
                )}
              </span>
              <span className="text-[10px] text-slate-400">
                {betSlip.length === 0
                  ? 'No selections chosen'
                  : `${betSlip.length} Single${betSlip.length > 1 ? 's' : ''} · ${totalStake.toFixed(2)} USDT`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {betSlip.length > 0 && (
              <div className="text-right">
                <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Return</span>
                <span className="text-xs font-mono font-bold text-[#00e5c9]">
                  {totalPotentialReturn.toFixed(2)} USDT
                </span>
              </div>
            )}
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
              <ChevronUp className="w-4 h-4" />
            </div>
          </div>
        </button>
      </div>

      {/* Slide-Up Bottom Drawer Modal on Mobile */}
      {isBetSlipOpenOnMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
          {/* Backdrop Tap to close */}
          <div
            className="flex-1"
            onClick={() => setIsBetSlipOpenOnMobile(false)}
          />

          {/* Drawer Container */}
          <div className="bg-[#0d121c] border-t border-slate-700 rounded-t-2xl max-h-[85vh] h-[600px] flex flex-col shadow-2xl overflow-hidden">
            {/* Grab handle affordance */}
            <div className="pt-2 pb-1 flex justify-center bg-[#0a0e16]">
              <div className="w-12 h-1 bg-slate-700 rounded-full" />
            </div>

            <BetSlipPanel
              isDrawer
              onClose={() => setIsBetSlipOpenOnMobile(false)}
              className="flex-1 border-l-0"
            />
          </div>
        </div>
      )}
    </>
  );
};
