export function GuideRobot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      role="img"
      aria-label="Guide robot"
      className={`guide-robot ${className}`.trim()}
    >
      <title>Guide robot</title>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <line x1="100" y1="18" x2="100" y2="38" strokeWidth="3" />
        <circle cx="100" cy="12" r="6" fill="currentColor" stroke="none" />
        <rect x="42" y="38" width="116" height="88" rx="22" strokeWidth="3" fill="var(--surface)" />
        <g className="guide-robot-eyes">
          <rect x="64" y="68" width="22" height="22" rx="4" strokeWidth="2.5" fill="var(--ink)" />
          <rect x="114" y="68" width="22" height="22" rx="4" strokeWidth="2.5" fill="var(--ink)" />
        </g>
        <path d="M78 104h44" strokeWidth="3" />
        <rect x="54" y="136" width="92" height="70" rx="16" strokeWidth="3" fill="var(--surface)" />
        <circle cx="100" cy="168" r="8" strokeWidth="2.5" />
        <path d="M88 188h24" strokeWidth="2.5" />
        <path d="M54 156H34c-6 0-10 4-10 10v22" strokeWidth="3" />
        <path d="M146 156h20c6 0 10 4 10 10v22" strokeWidth="3" />
        <path d="M78 206v18" strokeWidth="3" />
        <path d="M122 206v18" strokeWidth="3" />
        <path d="M66 224h24" strokeWidth="3" />
        <path d="M110 224h24" strokeWidth="3" />
      </g>
    </svg>
  );
}
