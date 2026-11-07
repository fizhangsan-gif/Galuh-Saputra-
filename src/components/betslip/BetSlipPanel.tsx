import React, { useState } from 'react';
import {
  X,
  Trash2,
  Lock,
  AlertCircle,
  CheckCircle2,
  Receipt,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { useSportsbook } from '../../context/SportsbookContext';

interface BetSlipPanelProps {
  className?: string;
  isDrawer?: boolean;
  onClose?: () => void;
}

export const BetSlipPanel: React.FC<BetSlipPanelProps> = ({
  className = '',
  isDrawer = false,
  onClose,
}) => {
  const {
    betSlip,
    myBets,
    userBalance,
    updateItemStake,
    removeFromSlip,
    clearSlip,
    acceptOddsChange,
    placeSingleBet,
    placeAllSingles,
    cashOutBet,
    activePage,
    setActivePage,
    lastPlacedBetId,
    setLastPlacedBetId,
    isSimulatingFailure,
    toggleOddsSelection,
    matches,
  } = useSportsbook();

  const [panelTab, setPanelTab] = useState<'slip' | 'mybets'>(
    activePage === 'betslip' ? 'slip' : 'slip'
  );
  const [myBetsFilter, setMyBetsFilter] = useState<'open' | 'settled'>('open');
  const [isPlacing, setIsPlacing] = useState(false);
  const [placementError, setPlacementError] = useState<string | null>(null);

  const openBets = myBets.filter((b) => b.status === 'open');
  const settledBets = myBets.filter((b) => b.status !== 'open');

  // Slip calculations
  const totalStake = betSlip.reduce((sum, item) => sum + (item.stake || 0), 0);
  const totalPotentialReturn = betSlip.reduce(
    (sum, item) => sum + (item.stake || 0) * item.odds,
    0
  );
  const hasSuspendedItems = betSlip.some((i) => i.suspended);
  const hasOddsChangedItems = betSlip.some((i) => i.oddsChanged);

  const handlePlaceBets = () => {
    setPlacementError(null);
    setIsPlacing(true);

    setTimeout(() => {
      const result = placeAllSingles();
      setIsPlacing(false);
      if (result.errors.length > 0) {
        setPlacementError(result.errors.join('; '));
      }
    }, 450);
  };

  const handleQuickStake = (id: string, currentStake: number, addAmount: number) => {
    updateItemStake(id, (currentStake || 0) + addAmount);
  };

  const handleMaxStake = (id: string) => {
    const remainingBalance = Math.max(0, userBalance);
    updateItemStake(id, remainingBalance);
  };

  return (
    <div
      className={`bg-[#0d121c] border-l border-slate-800/80 flex flex-col h-full overflow-hidden select-none ${className}`}
    >
      {/* Top Header with Tab Switcher */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between shrink-0 bg-[#0a0e16]">
        <div className="flex items-center gap-1 bg-[#141b28] p-1 rounded-lg">
          <button
            type="button"
            onClick={() => {
              setPanelTab('slip');
              setPlacementError(null);
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              panelTab === 'slip'
                ? 'bg-[#00e5c9] text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Bet Slip</span>
            {betSlip.length > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  panelTab === 'slip'
                    ? 'bg-slate-950 text-[#00e5c9]'
                    : 'bg-[#1e293b] text-slate-200'
                }`}
              >
                {betSlip.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setPanelTab('mybets')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              panelTab === 'mybets'
                ? 'bg-[#00e5c9] text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>My Bets</span>
            {openBets.length > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  panelTab === 'mybets'
                    ? 'bg-slate-950 text-[#00e5c9]'
                    : 'bg-[#1e293b] text-emerald-400'
                }`}
              >
                {openBets.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {panelTab === 'slip' && betSlip.length > 0 && (
            <button
              type="button"
              onClick={clearSlip}
              className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
              title="Clear entire bet slip"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {isDrawer && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Panel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {panelTab === 'slip' ? (
          <>
            {/* Bet Slip Subheader: Singles Only Notice */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span className="font-semibold text-slate-300">Singles Betting</span>
              <span className="text-[10px] text-[#00e5c9] bg-[#00e5c9]/10 px-2 py-0.5 rounded font-mono">
                USDT
              </span>
            </div>

            {/* Empty State */}
            {betSlip.length === 0 ? (
              <div className="py-12 px-4 text-center">
                <div className="w-12 h-12 rounded-full bg-[#141b28] text-slate-500 mx-auto flex items-center justify-center mb-3">
                  <Receipt className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Your Bet Slip is Empty</h4>
                <p className="text-xs text-slate-400 max-w-[220px] mx-auto mb-4">
                  Tap any decimal odds across the live matches or football hub to place single wagers.
                </p>

                {/* Quick Add Suggestion */}
                <button
                  type="button"
                  onClick={() => {
                    const arsMatch = matches.find((m) => m.id === 'arsenal-brighton');
                    if (arsMatch) {
                      toggleOddsSelection(arsMatch, 'Match Result (1X2)', {
                        id: 'ab-1x2-1',
                        label: 'Arsenal',
                        odds: arsMatch.matchResultOdds.home,
                      });
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#141c2b] hover:bg-[#1a2538] border border-slate-700 text-xs font-medium text-[#00e5c9] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#00e5c9]" />
                  <span>Add Arsenal (1.42) to Slip</span>
                </button>
              </div>
            ) : (
              /* Bet Slip Items List */
              <div className="space-y-2.5">
                {betSlip.map((item) => {
                  const itemReturn = (item.stake || 0) * item.odds;

                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border transition-all ${
                        item.suspended
                          ? 'bg-rose-950/20 border-rose-500/40'
                          : item.oddsChanged
                          ? 'bg-amber-950/20 border-amber-500/50'
                          : 'bg-[#131926] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {/* Item Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-[10px] text-slate-400 font-medium truncate">
                            {item.competition}
                          </div>
                          <div className="text-xs font-semibold text-white truncate">
                            {item.matchTitle}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromSlip(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-0.5 shrink-0 transition-colors"
                          title="Remove selection"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selection & Decimal Odds Row */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5c9]" />
                          <span className="text-xs font-bold text-[#00e5c9] truncate">
                            {item.selectionLabel}
                          </span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            ({item.marketName})
                          </span>
                        </div>
                        <div className="font-mono tabular-nums text-xs font-bold text-white shrink-0">
                          {item.odds.toFixed(2)}
                        </div>
                      </div>

                      {/* Odds Changed Alert & Acceptance Button */}
                      {item.oddsChanged && (
                        <div className="mt-2 p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-amber-300 text-[11px]">
                            <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>
                              Odds shifted from{' '}
                              <span className="font-mono line-through text-slate-400">
                                {item.initialOdds.toFixed(2)}
                              </span>{' '}
                              to{' '}
                              <span className="font-mono font-bold text-amber-300">
                                {item.odds.toFixed(2)}
                              </span>
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => acceptOddsChange(item.id)}
                            className="px-2 py-0.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-[10px] shrink-0 transition-colors"
                          >
                            Accept
                          </button>
                        </div>
                      )}

                      {/* Selection Suspended Alert */}
                      {item.suspended && (
                        <div className="mt-2 p-2 bg-rose-500/15 border border-rose-500/40 rounded-lg flex items-center gap-1.5 text-rose-300 text-[11px]">
                          <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span className="font-semibold">
                            Selection Suspended: Match market locked
                          </span>
                        </div>
                      )}

                      {/* Stake Input & Quick Amount Buttons */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span>Stake (USDT)</span>
                          <span>
                            Pot. Return:{' '}
                            <strong className="text-white font-mono">
                              {itemReturn.toFixed(2)} USDT
                            </strong>
                          </span>
                        </div>

                        <div className="relative flex items-center">
                          <input
                            type="number"
                            min="1"
                            step="any"
                            value={item.stake || ''}
                            onChange={(e) =>
                              updateItemStake(item.id, parseFloat(e.target.value))
                            }
                            placeholder="0.00"
                            className="w-full bg-[#182030] text-sm font-mono font-bold text-white rounded-lg px-3 py-1.5 border border-slate-700 focus:border-[#00e5c9] focus:outline-none transition-colors"
                          />
                          <span className="absolute right-3 text-xs font-semibold text-[#00e5c9] pointer-events-none">
                            USDT
                          </span>
                        </div>

                        {/* Quick Stake Buttons */}
                        <div className="flex items-center gap-1 mt-1.5">
                          {[5, 10, 25, 50].map((amt) => (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => handleQuickStake(item.id, item.stake, amt)}
                              className="flex-1 py-1 text-[10px] font-mono font-semibold rounded bg-[#182030] hover:bg-[#202b40] text-slate-300 border border-slate-700/60 transition-colors"
                            >
                              +{amt}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleMaxStake(item.id)}
                            className="px-2 py-1 text-[10px] font-mono font-bold rounded bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 transition-colors"
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* My Bets Tab */
          <div className="space-y-3">
            {/* My Bets Subtabs: Open & Settled */}
            <div className="flex items-center gap-1 bg-[#141b28] p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setMyBetsFilter('open')}
                className={`flex-1 py-1 text-xs font-semibold rounded transition-colors ${
                  myBetsFilter === 'open'
                    ? 'bg-[#1e293b] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Open Bets ({openBets.length})
              </button>
              <button
                type="button"
                onClick={() => setMyBetsFilter('settled')}
                className={`flex-1 py-1 text-xs font-semibold rounded transition-colors ${
                  myBetsFilter === 'settled'
                    ? 'bg-[#1e293b] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Settled ({settledBets.length})
              </button>
            </div>

            {/* List of Bets */}
            {myBetsFilter === 'open' ? (
              openBets.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  No active open bets. Place a wager on any match to track live cash out!
                </div>
              ) : (
                <div className="space-y-2.5">
                  {openBets.map((bet) => (
                    <div
                      key={bet.id}
                      className="p-3 bg-[#131926] border border-slate-800 rounded-xl space-y-2"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-mono">{bet.id}</span>
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <Clock className="w-3 h-3" />
                          <span>{bet.liveScore || 'Live in Play'}</span>
                        </span>
                      </div>

                      <div className="text-xs font-bold text-white">{bet.matchTitle}</div>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                        <span className="text-[#00e5c9] font-semibold">
                          {bet.selectionLabel} ({bet.marketName})
                        </span>
                        <span className="font-mono font-bold text-white">
                          @{bet.odds.toFixed(2)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#182030] p-2 rounded-lg">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Stake</span>
                          <span className="font-mono font-bold text-white">
                            {bet.stake.toFixed(2)} USDT
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 block text-[10px]">Potential Return</span>
                          <span className="font-mono font-bold text-emerald-400">
                            {bet.potentialReturn.toFixed(2)} USDT
                          </span>
                        </div>
                      </div>

                      {/* Dynamic Cash Out Button */}
                      {bet.cashOutValue && (
                        <button
                          type="button"
                          onClick={() => cashOutBet(bet.id)}
                          className="w-full py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/40 rounded-lg text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                        >
                          <span>Cash Out Now</span>
                          <span className="font-mono text-white bg-emerald-500/30 px-2 py-0.5 rounded">
                            {bet.cashOutValue.toFixed(2)} USDT
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : (
              /* Settled Bets */
              settledBets.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  No settled bets yet.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {settledBets.map((bet) => (
                    <div
                      key={bet.id}
                      className="p-3 bg-[#131926] border border-slate-800 rounded-xl space-y-1.5 opacity-90"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400 font-mono">{bet.id}</span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded uppercase tracking-wider text-[9px] ${
                            bet.status === 'won'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : bet.status === 'cashed_out'
                              ? 'bg-cyan-500/20 text-cyan-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {bet.status === 'cashed_out' ? 'Cashed Out' : bet.status}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-slate-200 truncate">
                        {bet.matchTitle}
                      </div>

                      <div className="text-[11px] text-slate-400">
                        {bet.selectionLabel} @ {bet.odds.toFixed(2)}
                      </div>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                        <span className="text-slate-400">Stake: {bet.stake.toFixed(2)} USDT</span>
                        <span className="font-mono font-bold text-white">
                          {bet.status === 'won'
                            ? `+${bet.settledReturn?.toFixed(2)} USDT`
                            : bet.status === 'cashed_out'
                            ? `+${bet.settledReturn?.toFixed(2)} USDT`
                            : '0.00 USDT'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Footer Summary & Primary Place Bet CTA */}
      {panelTab === 'slip' && betSlip.length > 0 && (
        <div className="p-3 border-t border-slate-800 bg-[#0a0e16] shrink-0 space-y-2.5">
          {/* Error notice if placement failed */}
          {placementError && (
            <div className="p-2 bg-rose-500/15 border border-rose-500/40 rounded-lg text-rose-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{placementError}</span>
              </div>
              <button
                type="button"
                onClick={handlePlaceBets}
                className="text-[10px] bg-rose-500/30 hover:bg-rose-500/50 px-2 py-0.5 rounded text-white font-bold ml-2 shrink-0"
              >
                Retry
              </button>
            </div>
          )}

          {/* Aggregate Totals */}
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Total Singles Stake</span>
              <span className="font-mono font-bold text-white">
                {totalStake.toFixed(2)} USDT
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300 font-medium">
              <span>Potential Return</span>
              <span className="font-mono font-extrabold text-[#00e5c9] text-sm">
                {totalPotentialReturn.toFixed(2)} USDT
              </span>
            </div>
          </div>

          {/* Master CTA Button */}
          {hasOddsChangedItems ? (
            <button
              type="button"
              onClick={() => acceptOddsChange()}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Accept Odds Changes & Continue</span>
            </button>
          ) : hasSuspendedItems ? (
            <button
              type="button"
              disabled
              className="w-full py-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 font-bold text-xs cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              <Lock className="w-4 h-4" />
              <span>Selection Suspended (Remove to Place)</span>
            </button>
          ) : totalStake > userBalance ? (
            <button
              type="button"
              disabled
              className="w-full py-3 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs cursor-not-allowed"
            >
              Insufficient USDT Balance
            </button>
          ) : (
            <button
              type="button"
              disabled={isPlacing || totalStake <= 0}
              onClick={handlePlaceBets}
              className={`w-full py-3 rounded-xl bg-[#00e5c9] hover:bg-[#00f5d4] active:scale-[0.98] text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00e5c9]/10 ${
                isPlacing || totalStake <= 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isPlacing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Placing Single Bet(s)...</span>
                </>
              ) : (
                <>
                  <span>
                    Place {betSlip.length} Single Bet{betSlip.length > 1 ? 's' : ''} (
                    {totalStake.toFixed(2)} USDT)
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Bet Placed Confirmation Modal */}
      {lastPlacedBetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#121824] border border-slate-700 rounded-2xl p-5 max-w-sm w-full shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-base font-bold text-white mb-1">Bet Placed Successfully!</h3>
            <p className="text-xs text-slate-400 mb-3">
              Receipt reference{' '}
              <span className="font-mono font-bold text-[#00e5c9]">{lastPlacedBetId}</span>
            </p>

            <div className="bg-[#161f30] p-3 rounded-xl text-xs space-y-1.5 text-left mb-4">
              <div className="flex justify-between text-slate-400">
                <span>Account Debited:</span>
                <span className="text-white font-mono font-semibold">Done</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Remaining Balance:</span>
                <span className="text-[#00e5c9] font-mono font-bold">
                  {userBalance.toFixed(2)} USDT
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setLastPlacedBetId(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setLastPlacedBetId(null);
                  setPanelTab('mybets');
                  setMyBetsFilter('open');
                }}
                className="flex-1 py-2 text-xs font-bold rounded-lg bg-[#00e5c9] hover:bg-[#00f5d4] text-slate-950 transition-colors"
              >
                View in My Bets
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
