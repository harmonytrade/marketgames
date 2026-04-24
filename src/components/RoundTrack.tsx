interface RoundTrackProps {
  currentRoundIndex: number;
  totalRounds: number;
}

export const RoundTrack = ({ currentRoundIndex, totalRounds }: RoundTrackProps) => (
  <div className="round-track" aria-hidden="true">
    {Array.from({ length: totalRounds }, (_, index) => {
      const state =
        index < currentRoundIndex
          ? 'done'
          : index === currentRoundIndex
            ? 'active'
            : 'idle';

      return <span className={`round-track__dot round-track__dot--${state}`} key={index} />;
    })}
  </div>
);
