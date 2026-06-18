type BrandLogoProps = {
  compact?: boolean;
  light?: boolean;
  variant?: 'speech-tile' | 'tile-rack';
};

function SpeechTileMark({ className = 'h-11 w-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="BGE speech tile logo mark">
      <rect x="8" y="10" width="48" height="40" rx="13" fill="#fffdf7" stroke="#b9541f" strokeWidth="3" />
      <path d="M23 49l-8 8 2.3-10.2" fill="#fffdf7" stroke="#b9541f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="20" r="2.5" fill="#ef3d66" />
      <circle cx="46" cy="20" r="2.5" fill="#35a765" />
      <circle cx="18" cy="40" r="2.5" fill="#2f7bc9" />
      <circle cx="46" cy="40" r="2.5" fill="#f2a51b" />
      <text
        x="32"
        y="37"
        textAnchor="middle"
        fill="#2f251e"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="20"
        fontWeight="900"
        letterSpacing="-1"
      >
        BGE
      </text>
      <path d="M23 42h18" stroke="#d87522" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function TileRackMark({ className = 'h-11 w-16' }: { className?: string }) {
  const letters = [
    { letter: 'B', x: 6, fill: '#fffaf0', stroke: '#d87522' },
    { letter: 'G', x: 24, fill: '#fffdf7', stroke: '#ef3d66' },
    { letter: 'E', x: 42, fill: '#fffaf0', stroke: '#2f7bc9' },
  ];

  return (
    <svg viewBox="0 0 68 52" className={className} role="img" aria-label="BGE tile rack logo mark">
      <path d="M6 43h56l-4 6H10l-4-6Z" fill="#d87522" />
      <path d="M10 43h48" stroke="#8d4a28" strokeWidth="2" strokeLinecap="round" />
      {letters.map(({ letter, x, fill, stroke }) => (
        <g key={letter}>
          <rect x={x} y="8" width="18" height="28" rx="5" fill={fill} stroke={stroke} strokeWidth="2.2" />
          <text
            x={x + 9}
            y="28"
            textAnchor="middle"
            fill="#2f251e"
            fontFamily="Arial Black, Arial, sans-serif"
            fontSize="18"
            fontWeight="900"
          >
            {letter}
          </text>
        </g>
      ))}
      <circle cx="52" cy="14" r="1.5" fill="#35a765" />
      <circle cx="58" cy="20" r="1.5" fill="#35a765" />
    </svg>
  );
}

export function BrandLogo({ compact = false, light = false, variant = 'tile-rack' }: BrandLogoProps) {
  const textColor = light ? 'text-white' : 'text-[#2f251e]';
  const subColor = light ? 'text-white/75' : 'text-[#a85a26]';
  const Mark = variant === 'tile-rack' ? TileRackMark : SpeechTileMark;

  return (
    <span className="inline-flex items-center gap-3">
      <span className={`grid h-12 shrink-0 place-items-center rounded-[1.15rem] bg-gradient-to-br from-[#fff9ec] via-[#ffe5b7] to-[#f4a13a] shadow-lg shadow-[#8b4f1f]/20 ring-1 ring-[#c75b22]/35 ${variant === 'tile-rack' ? 'w-16' : 'w-12'}`}>
        <Mark />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className={`block font-display text-[1.05rem] tracking-[0.075em] ${textColor}`}>Board Game English Club</span>
          <span className={`block text-[0.64rem] font-black uppercase tracking-[0.18em] ${subColor}`}>Fukuoka Chapter</span>
        </span>
      )}
    </span>
  );
}
