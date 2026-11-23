type SparkProps = {
  className?: string;
  color?: string;
};

export function PixelSpark({ className = "h-5 w-5", color = "var(--color-accent)" }: SparkProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={className}
      style={{ fill: color, shapeRendering: "crispEdges" }}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 0h2v4h4v2H7v4H5V6H1V4h4z" />
    </svg>
  );
}

export function PixelScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 180"
      className={className}
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="320" height="180" className="fill-sky" />
      <rect x="236" y="24" width="40" height="8" className="fill-sun" />
      <rect x="228" y="32" width="56" height="24" className="fill-sun" />
      <rect x="236" y="56" width="40" height="8" className="fill-sun" />

      <g className="fill-paper">
        <rect x="32" y="32" width="32" height="8" />
        <rect x="24" y="40" width="56" height="8" />
        <rect x="112" y="20" width="24" height="8" />
        <rect x="104" y="28" width="48" height="8" />
        <rect x="184" y="56" width="24" height="8" />
        <rect x="176" y="64" width="40" height="8" />
      </g>

      <g className="fill-mint">
        <rect x="0" y="120" width="72" height="60" />
        <rect x="24" y="112" width="40" height="8" />
        <rect x="40" y="104" width="16" height="8" />
        <rect x="96" y="132" width="88" height="48" />
        <rect x="120" y="124" width="40" height="8" />
        <rect x="136" y="116" width="16" height="8" />
        <rect x="224" y="128" width="96" height="52" />
        <rect x="248" y="120" width="48" height="8" />
      </g>
      <rect x="0" y="168" width="320" height="12" className="fill-ink" />

      <g className="fill-ink">
        <rect x="156" y="148" width="8" height="20" />
        <rect x="148" y="140" width="24" height="8" />
        <rect x="152" y="132" width="16" height="8" />
      </g>
      <rect x="152" y="156" width="16" height="4" className="fill-accent" />

      <g className="fill-accent">
        <rect x="60" y="68" width="4" height="12" />
        <rect x="56" y="72" width="12" height="4" />
        <rect x="282" y="92" width="4" height="12" />
        <rect x="278" y="96" width="12" height="4" />
      </g>
    </svg>
  );
}
