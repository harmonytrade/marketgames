interface AnimatedBackgroundProps {
  variant?: 'hero' | 'menu' | 'game' | 'result' | 'signals';
}

export const AnimatedBackground = ({
  variant = 'menu',
}: AnimatedBackgroundProps) => (
  <div
    aria-hidden="true"
    className={`animated-background animated-background--${variant}`}
  >
    <div className="animated-background__grid" />
    <svg className="animated-background__ticker" viewBox="0 0 320 220" preserveAspectRatio="none">
      <path
        className="animated-background__ticker-line animated-background__ticker-line--one"
        d="M-10 156 C 28 138, 62 148, 94 104 S 166 88, 196 124 S 252 160, 330 92"
        pathLength="100"
      />
      <path
        className="animated-background__ticker-line animated-background__ticker-line--two"
        d="M-10 116 C 26 126, 58 100, 88 116 S 158 176, 200 142 S 252 82, 330 118"
        pathLength="100"
      />
    </svg>
    <div className="animated-background__glow animated-background__glow--one" />
    <div className="animated-background__glow animated-background__glow--two" />
    <div className="animated-background__glow animated-background__glow--three" />
  </div>
);
