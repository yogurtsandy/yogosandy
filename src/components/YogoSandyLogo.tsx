import React from 'react';

interface YogoSandyLogoProps {
  size?: number;
  className?: string;
}

export const YogoSandyLogo: React.FC<YogoSandyLogoProps> = ({ size = 48, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Logotipo oficial circular YogoSandy Yogurt Artesanal Desde 2025 Natural 100%"
    >
      {/* Outer pastel pink border ring */}
      <circle cx="100" cy="100" r="96" fill="#F4A6BE" />
      <circle cx="100" cy="100" r="89" fill="#FCE8EE" />
      {/* Inner deep raspberry cherry circle */}
      <circle cx="100" cy="100" r="83" fill="#C8284B" />

      {/* Creamy white yogurt splash wave across lower third */}
      <path
        d="M21 126C39 112 58 134 78 123C97 113 113 135 135 123C153 113 168 127 179 121C170 157 138 183 100 183C61 183 29 159 21 126Z"
        fill="#FFFFFF"
      />
      {/* Subtle splash droplets */}
      <circle cx="48" cy="112" r="4.5" fill="#FFFFFF" fillOpacity="0.92" />
      <circle cx="151" cy="110" r="3.5" fill="#FFFFFF" fillOpacity="0.92" />

      {/* Natural 100% circular stamp badge top-right */}
      <g transform="translate(133, 30) rotate(10)">
        <circle cx="22" cy="22" r="20" fill="#FCE8EE" stroke="#C8284B" strokeWidth="2" />
        <circle
          cx="22"
          cy="22"
          r="16.5"
          fill="none"
          stroke="#C8284B"
          strokeWidth="1"
          strokeDasharray="2.5 2"
        />
        <text
          x="22"
          y="19"
          textAnchor="middle"
          fill="#C8284B"
          fontSize="7"
          fontWeight="700"
          fontFamily="Fredoka, sans-serif"
        >
          NATURAL
        </text>
        <text
          x="22"
          y="29"
          textAnchor="middle"
          fill="#C8284B"
          fontSize="9"
          fontWeight="700"
          fontFamily="Fredoka, sans-serif"
        >
          100%
        </text>
      </g>

      {/* Top curved arc subtitle */}
      <defs>
        <path id="yogoTopArc" d="M 38,85 A 68,68 0 0,1 162,85" />
      </defs>
      <text
        fill="#FCE8EE"
        fontSize="11"
        fontWeight="600"
        letterSpacing="1.6"
        fontFamily="Plus Jakarta Sans, sans-serif"
      >
        <textPath href="#yogoTopArc" startOffset="46%" textAnchor="middle">
          YOGURT ARTESANAL
        </textPath>
      </text>

      {/* Main bold brand typography */}
      <text
        x="100"
        y="92"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="31"
        fontWeight="700"
        fontFamily="Fredoka, sans-serif"
        letterSpacing="0.5"
      >
        YOGO
      </text>
      <text
        x="100"
        y="119"
        textAnchor="middle"
        fill="#FCE8EE"
        fontSize="27"
        fontWeight="700"
        fontFamily="Fredoka, sans-serif"
        letterSpacing="1"
      >
        SANDY
      </text>

      {/* Bottom script-style marker on creamy splash */}
      <text
        x="100"
        y="153"
        textAnchor="middle"
        fill="#C8284B"
        fontSize="12.5"
        fontWeight="700"
        fontFamily="Fredoka, sans-serif"
        letterSpacing="0.8"
      >
        DESDE 2025
      </text>
    </svg>
  );
};
