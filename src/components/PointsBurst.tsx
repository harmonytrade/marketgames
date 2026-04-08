interface PointsBurstProps {
  points: number;
}

export const PointsBurst = ({ points }: PointsBurstProps) => (
  <div className={`points-burst ${points > 0 ? 'points-burst--positive' : 'points-burst--flat'}`}>
    {points > 0 ? `+${points}` : '0'}
  </div>
);
