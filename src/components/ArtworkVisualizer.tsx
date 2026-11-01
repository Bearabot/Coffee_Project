import React from 'react';
import { Product } from '../types';

interface ArtworkVisualizerProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const ArtworkVisualizer: React.FC<ArtworkVisualizerProps> = ({
  product,
  size = 'md',
  className = '',
}) => {
  const isCoffee = product.category === 'coffee';
  const { baseColor, accentColor, sealText } = product.visualTheme;

  const heightClasses = {
    sm: 'h-48',
    md: 'h-64 sm:h-72',
    lg: 'h-80 sm:h-96',
    hero: 'h-96 sm:h-[420px]',
  }[size];

  return (
    <div
      className={`relative w-full ${heightClasses} rounded-xl overflow-hidden flex items-center justify-center p-6 select-none transition-transform duration-300 ${className}`}
      style={{
        background: `radial-gradient(circle at 50% 30%, ${baseColor} 0%, #151412 100%)`,
      }}
    >
      {/* Background ambient texture / subtle grid lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`grid-${product.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${product.id})`} />
        </svg>
      </div>

      {/* Decorative roaster halo light */}
      <div
        className="absolute w-44 h-44 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      {/* Product Physical Packaging Silhouette */}
      {isCoffee ? (
        /* Specialty Coffee Stand-up Kraft Bag with Degassing Valve & Label */
        <div className="relative z-10 w-44 sm:w-52 h-56 sm:h-64 bg-[#EAE2D5] rounded-t-lg rounded-b-md shadow-2xl flex flex-col justify-between p-3 border border-[#D5C7B0]/60 text-[#211E1B]">
          {/* Top Sealed Heat Fold & Valve */}
          <div className="border-b border-[#D5C7B0] pb-2 flex items-center justify-between">
            <span className="text-[9px] tracking-widest uppercase font-mono text-[#7A6E5D]">
              MICRO-ROASTED
            </span>
            {/* Degassing aroma valve */}
            <div className="w-3.5 h-3.5 rounded-full border border-[#B5A58D] flex items-center justify-center bg-[#DFD5C3]">
              <div className="w-1 h-1 rounded-full bg-[#8E7E69]" />
            </div>
            <span className="text-[9px] font-mono text-[#7A6E5D]">
              {product.weights[0]?.size || '250G'}
            </span>
          </div>

          {/* Minimalist Center Label (Blue Bottle / Common Man style) */}
          <div className="bg-[#FAF7F2] p-3 rounded shadow-sm border border-[#E3DAC8] my-auto">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] font-mono tracking-wider uppercase text-[#8C7D6B]">
                {product.origin.country.split('·')[0].trim()}
              </span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </div>
            <h4 className="font-serif text-sm font-semibold text-[#1F1A16] leading-tight line-clamp-1">
              {product.name}
            </h4>
            <p className="text-[10px] text-[#63584B] font-medium tracking-tight mt-0.5 line-clamp-1">
              {product.roastOrType} · {product.processMethod.split('·')[0]}
            </p>

            <div className="mt-2 pt-1.5 border-t border-[#EAE3D4] flex items-center justify-between text-[8px] font-mono text-[#786D5E]">
              <span>{product.origin.elevation.split('–')[0]}</span>
              <span>BATCH #26</span>
            </div>
          </div>

          {/* Bottom Bag Gusset & Origin Seal */}
          <div className="pt-1.5 border-t border-[#D5C7B0] flex items-center justify-between text-[9px] font-mono text-[#8C7D6B]">
            <span className="truncate max-w-[120px]">{sealText}</span>
            <span className="font-bold text-[#1F1A16]">EQUATOR</span>
          </div>
        </div>
      ) : (
        /* Artisanal Loose-Leaf Tea / Matcha Canister or Washi Paper Tin */
        <div className="relative z-10 w-40 sm:w-48 h-56 sm:h-64 bg-[#232924] rounded-2xl shadow-2xl flex flex-col justify-between p-3.5 border border-[#3A433C] text-[#F3F6F3]">
          {/* Airtight Double-Lid Canister Cap */}
          <div className="border-b border-[#3E4A40] pb-2 flex items-center justify-between">
            <span className="text-[8px] tracking-widest uppercase font-mono text-[#8A9B8D]">
              ESTATE HARVEST
            </span>
            <div
              className="w-3.5 h-3.5 rounded-full border flex items-center justify-center"
              style={{ borderColor: accentColor }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            </div>
            <span className="text-[8px] font-mono text-[#8A9B8D]">
              {product.weights[0]?.size || '50G'}
            </span>
          </div>

          {/* Tactile Washi Paper Belly Band */}
          <div className="bg-[#FAF7F0] text-[#1E231F] p-3 rounded shadow-md border border-[#E3DEC8] my-auto">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] font-mono tracking-widest uppercase text-[#737C74]">
                {product.origin.country}
              </span>
              <span className="text-[8px] font-mono text-[#627766]">HARVEST 2026</span>
            </div>
            <h4 className="font-serif text-sm font-semibold text-[#161B17] leading-tight line-clamp-1">
              {product.name}
            </h4>
            <p className="text-[10px] text-[#4F5950] font-medium tracking-tight mt-0.5 line-clamp-1">
              {product.roastOrType}
            </p>

            <div className="mt-2 pt-1.5 border-t border-[#E8E3CF] flex items-center justify-between text-[8px] font-mono text-[#6A746B]">
              <span>SINGLE GARDEN</span>
              <span className="font-semibold" style={{ color: accentColor }}>TEA CIRCLE</span>
            </div>
          </div>

          {/* Canister Base Seal */}
          <div className="pt-1.5 border-t border-[#3E4A40] flex items-center justify-between text-[8px] font-mono text-[#8A9B8D]">
            <span className="truncate max-w-[110px]">{sealText}</span>
            <span className="font-bold tracking-wider text-[#DCE6DE]">ATELIER</span>
          </div>
        </div>
      )}

      {/* Floating Category Indicator */}
      <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-white/10 text-[10px] font-mono tracking-wider uppercase text-white/90">
        {isCoffee ? 'Whole Bean Coffee' : 'Artisanal Tea'}
      </div>

      {product.badge && (
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase text-black font-semibold shadow-sm"
          style={{ backgroundColor: accentColor }}
        >
          {product.badge}
        </div>
      )}
    </div>
  );
};
