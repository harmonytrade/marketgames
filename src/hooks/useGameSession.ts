import { useEffect, useEffectEvent, useReducer } from 'react';
import { buildSessionSummary, createRoundResolution } from '../game/engine';
import { DECISION_MS, REVEAL_MS } from '../game/config';
import { getCurrentRound } from '../game/selectors';
import { initialSessionState, sessionReducer } from '../game/session-reducer';
import type { GameRound, PlayerAction } from '../types/game';

export const useGameSession = () => {
  const [state, dispatch] = useReducer(sessionReducer, initialSessionState);
  const currentRound = getCurrentRound(state);

  const resolveRound = useEffectEvent((action: PlayerAction | null) => {
    if (!currentRound || state.phase !== 'decision') {
      return;
    }

    const resolution = createRoundResolution(currentRound, action, state.streak);

    dispatch({
      type: 'resolve_round',
      action,
      resolution,
    });
  });

  useEffect(() => {
    if (state.phase !== 'decision' || !currentRound) {
      return undefined;
    }

    const startedAt = performance.now();
    let hasResolved = false;
    const syncTimer = () => {
      if (hasResolved) {
        return;
      }

      const elapsed = performance.now() - startedAt;
      const remainingMs = Math.max(0, DECISION_MS - elapsed);

      dispatch({
        type: 'tick',
        remainingMs,
      });

      if (remainingMs <= 0) {
        hasResolved = true;
        resolveRound(null);
      }
    };

    dispatch({
      type: 'tick',
      remainingMs: DECISION_MS,
    });

    const intervalId = window.setInterval(() => {
      syncTimer();
      const elapsed = performance.now() - startedAt;

      if (elapsed >= DECISION_MS) {
        window.clearInterval(intervalId);
      }
    }, 50);

    const handleVisibilityChange = () => {
      syncTimer();
    };

    window.addEventListener('focus', handleVisibilityChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('focus', handleVisibilityChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [state.phase, state.currentRoundIndex, currentRound]);

  useEffect(() => {
    if (state.phase !== 'reveal') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      if (state.currentRoundIndex >= state.rounds.length - 1) {
        dispatch({
          type: 'finish_session',
          summary: buildSessionSummary({
            score: state.score,
            correctAnswers: state.correctAnswers,
            bestStreak: state.bestStreak,
            totalRounds: state.rounds.length,
          }),
        });
        return;
      }

      dispatch({
        type: 'advance_round',
      });
    }, REVEAL_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    state.bestStreak,
    state.correctAnswers,
    state.currentRoundIndex,
    state.phase,
    state.rounds.length,
    state.score,
  ]);

  return {
    ...state,
    currentRound,
    startSession(rounds: GameRound[]) {
      dispatch({
        type: 'start_session',
        rounds,
      });
    },
    selectAction(action: PlayerAction) {
      resolveRound(action);
    },
    resetSession() {
      dispatch({
        type: 'reset_session',
      });
    },
  };
};
