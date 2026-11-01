import React from 'react';
import { Plus, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { ArtworkVisualizer } from './ArtworkVisualizer';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onQuickAdd,
}) => {
  return (
    <div className="group flex flex-col bg-[#FAF7F2] rounded-xl border border-[#E7DFC8] overflow-hidden hover:border-[#D5C7AA] hover:shadow-lg transition-all duration-300">
      {/* Visual Product Artwork (takes ~65% of top space) */}
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <ArtworkVisualizer product={product} size="md" />

        {/* Hover Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-3 py-1.5 bg-white/95 hover:bg-white text-xs font-medium text-[#1E1B18] rounded flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Tasting Notes</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="px-3 py-1.5 bg-[#1F1B17] hover:bg-[#35302A] text-xs font-medium text-white rounded flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Bag</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Zero-Pill Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center justify-between text-xs text-[#7A6E5D] mb-1 font-mono">
            <span className="truncate max-w-[180px]">
              {product.origin.country} · {product.origin.elevation.split('–')[0]}
            </span>
            <div className="flex items-center gap-1 text-[#221F1B]">
              <Star className="w-3 h-3 fill-[#D97736] text-[#D97736]" />
              <span className="font-semibold text-[11px] tabular-nums">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-lg font-bold text-[#1E1B18] group-hover:text-[#9E6533] transition-colors leading-snug cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Subtitle / Roast or Harvest */}
          <p className="text-xs font-medium text-[#807261] mt-0.5">
            {product.roastOrType} · {product.processMethod.split('·')[0]}
          </p>

          {/* Tasting Notes as clean unboxed text list with · separator */}
          <p className="text-xs text-[#52493E] mt-2.5 leading-relaxed line-clamp-2">
            {product.tastingNotes.join(' · ')}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#EAE3D4] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#8A7D6D]">
              Starts At
            </span>
            <span className="font-mono text-base font-bold text-[#1E1B18] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onQuickView(product)}
            className="text-xs font-semibold text-[#1E1B18] hover:text-[#9E6533] underline transition-colors cursor-pointer"
          >
            Select Grind &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
