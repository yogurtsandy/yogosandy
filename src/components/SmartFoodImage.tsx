import React, { useState } from 'react';
import { YogoSandyLogo } from './YogoSandyLogo';

interface SmartFoodImageProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}

export const SmartFoodImage: React.FC<SmartFoodImageProps> = ({
  src,
  alt,
  label,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#FCE8EE] via-[#FFF8FA] to-[#F9D2DE] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <YogoSandyLogo size={64} />
        <span className="font-display text-base font-semibold text-[#C8284B]">
          {label || 'YogoSandy Artesanal'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
};
