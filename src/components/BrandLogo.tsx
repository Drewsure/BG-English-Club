type BrandLogoProps = {
  compact?: boolean;
  light?: boolean;
  variant?: 'speech-tile' | 'tile-rack';
};

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <span className="inline-flex items-center">
      <img
        src="/images/board-english-logo-cropped.jpeg"
        alt="Board Game English Club"
        className={compact ? 'h-12 w-auto object-contain' : 'h-24 w-auto max-w-[180px] object-contain md:h-28 md:max-w-[220px]'}
      />
      {!compact && (
        <span className="sr-only">Board Game English Club Fukuoka Chapter</span>
      )}
    </span>
  );
}
