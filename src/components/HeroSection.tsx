import React from 'react';
import { ArrowDown, Sparkles, Compass, Check } from 'lucide-react';
import { Product } from '../types';
import { ArtworkVisualizer } from './ArtworkVisualizer';

interface HeroSectionProps {
  featuredCoffee: Product;
  featuredTea: Product;
  onExploreShop: () => void;
  onOpenSubscription: () => void;
  onOpenQuiz: () => void;
  onSelectProduct: (product: Product) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredCoffee,
  featuredTea,
  onExploreShop,
  onOpenSubscription,
  onOpenQuiz,
  onSelectProduct,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#EAE3D4] pt-8 pb-12 sm:pt-14 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Thesis & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#847766] mb-3">
              <span>Origin Direct Sourcing</span>
              <span aria-hidden="true">·</span>
              <span>Roaster & Tea Atelier</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2013</span>
            </div>

            {/* Display Headline with balanced wrapping */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#1F1B17] tracking-tight leading-[1.12] [text-wrap:balance]">
              Specialty Coffee & Rare Leaves. Roasted Weekly. Steeped in Ritual.
            </h1>

            {/* Editorial Body measure 65-75ch */}
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#5E5549] leading-relaxed max-w-2xl">
              Inspired by Melbourne café craft and Tokyo precision. We source high-elevation Arabica micro-lots directly from smallholders in Huila and Guji, alongside single-garden spring teas and stone-milled Uji matcha.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onExploreShop}
                className="px-6 py-3.5 bg-[#1F1B17] hover:bg-[#38332C] active:bg-[#12100E] text-white font-medium text-sm rounded-lg transition-colors flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Explore Harvests</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSubscription}
                className="px-6 py-3.5 bg-[#EAE2D3] hover:bg-[#DFD5C2] active:bg-[#D5C9B3] text-[#211D19] font-medium text-sm rounded-lg transition-colors flex items-center gap-2 border border-[#D5C9B3] cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#A86E38]" />
                <span>Curate Subscription (Save 15%)</span>
              </button>

              <button
                onClick={onOpenQuiz}
                className="px-4 py-3.5 text-xs sm:text-sm font-medium text-[#6B5F50] hover:text-[#1F1B17] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#8C7D6B]" />
                <span>Taste Match Quiz</span>
              </button>
            </div>

            {/* Adjacency Proof Markers (3-point trust strip) */}
            <div className="mt-8 pt-6 border-t border-[#EAE3D4] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#6B6153]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#3E654E] shrink-0" />
                <span>Direct Trade 200%+ Fair</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#3E654E] shrink-0" />
                <span>Roasted Tuesday & Shipped</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Check className="w-4 h-4 text-[#3E654E] shrink-0" />
                <span>Free US Shipping Over $50</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Pairing Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-[#F3EDE2] border border-[#E3DAC8] rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#827464]">
                <span className="uppercase tracking-widest">Seasonal Duet</span>
                <span>HARVEST 2026</span>
              </div>

              {/* Coffee Spotlight */}
              <div
                onClick={() => onSelectProduct(featuredCoffee)}
                className="group cursor-pointer mb-4 bg-white/70 hover:bg-white p-3 rounded-xl border border-[#E3DAC8] transition-all hover:shadow-md"
              >
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-5">
                    <ArtworkVisualizer product={featuredCoffee} size="sm" />
                  </div>
                  <div className="col-span-7 pr-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#9E6533]">
                      Single Origin Coffee
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1F1A16] group-hover:text-[#A86E38] transition-colors leading-tight mt-0.5">
                      {featuredCoffee.name}
                    </h3>
                    <p className="text-xs text-[#63574A] mt-1 line-clamp-1">
                      {featuredCoffee.tastingNotes.join(' · ')}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[#1F1A16]">
                        ${featuredCoffee.price.toFixed(2)}
                      </span>
                      <span className="text-[11px] font-medium text-[#7D7060] underline">
                        View Tasting Profile &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tea Spotlight */}
              <div
                onClick={() => onSelectProduct(featuredTea)}
                className="group cursor-pointer bg-white/70 hover:bg-white p-3 rounded-xl border border-[#E3DAC8] transition-all hover:shadow-md"
              >
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-5">
                    <ArtworkVisualizer product={featuredTea} size="sm" />
                  </div>
                  <div className="col-span-7 pr-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#4E7D52]">
                      Artisan Tea Garden
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1F1A16] group-hover:text-[#3B663F] transition-colors leading-tight mt-0.5">
                      {featuredTea.name}
                    </h3>
                    <p className="text-xs text-[#63574A] mt-1 line-clamp-1">
                      {featuredTea.tastingNotes.join(' · ')}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[#1F1A16]">
                        ${featuredTea.price.toFixed(2)}
                      </span>
                      <span className="text-[11px] font-medium text-[#7D7060] underline">
                        View Tasting Profile &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
