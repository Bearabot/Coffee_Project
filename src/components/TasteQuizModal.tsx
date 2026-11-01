import React, { useState } from 'react';
import { X, Sparkles, Coffee, Leaf, ArrowRight, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface TasteQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const TasteQuizModal: React.FC<TasteQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [prefType, setPrefType] = useState<'coffee' | 'tea' | 'both'>('coffee');
  const [flavorBias, setFlavorBias] = useState<'fruity' | 'chocolate' | 'floral' | 'comfort'>('fruity');
  const [brewMethod, setBrewMethod] = useState<'pourover' | 'espresso' | 'immersion' | 'whisk'>('pourover');

  // Compute recommendation
  const getRecommendation = (): Product => {
    if (prefType === 'tea') {
      if (flavorBias === 'comfort' || brewMethod === 'whisk') {
        return products.find((p) => p.id === 'uji-ceremonial-matcha') || products[5];
      }
      if (flavorBias === 'floral') {
        return products.find((p) => p.id === 'phoenix-dan-cong-milanxiang') || products[6];
      }
      return products.find((p) => p.id === 'fuding-silver-needle') || products[7];
    } else {
      if (flavorBias === 'fruity') {
        return products.find((p) => p.id === 'ethiopia-guji-lot4') || products[1];
      }
      if (flavorBias === 'chocolate' || brewMethod === 'espresso') {
        return products.find((p) => p.id === 'cmcr-22-martin') || products[0];
      }
      if (flavorBias === 'floral') {
        return products.find((p) => p.id === 'colombia-el-paraiso') || products[2];
      }
      return products.find((p) => p.id === 'lucky-basterd-seasonal') || products[3];
    }
  };

  const recommendedProduct = getRecommendation();

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] rounded-2xl max-w-lg w-full border border-[#DECDB3] shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A6E5D] hover:text-[#1E1B18] rounded-full hover:bg-[#EFE9DC] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C7D6D] mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#D97736]" />
          <span>Taste Match Quiz</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#1F1B17] mb-2">
          Find Your Signature Cup
        </h3>
        <p className="text-xs text-[#635748] mb-6">
          Answer three quick questions to reveal the bean roast or rare tea harvest tailored to your morning palate.
        </p>

        {step === 1 && (
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7A6C5C] block">
              1. What is your morning ritual of choice?
            </span>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setPrefType('coffee')}
                className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  prefType === 'coffee'
                    ? 'border-[#1E1B18] bg-white ring-1 ring-[#1E1B18]'
                    : 'border-[#E2D8C4] bg-white/70 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-[#A86E38]" />
                  <div>
                    <div className="font-serif font-bold text-sm text-[#1F1B17]">
                      Specialty Arabica Coffee
                    </div>
                    <div className="text-xs text-[#6B5F50]">
                      Bright pour overs, rich espresso, or morning milk flat whites.
                    </div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPrefType('tea')}
                className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  prefType === 'tea'
                    ? 'border-[#1E1B18] bg-white ring-1 ring-[#1E1B18]'
                    : 'border-[#E2D8C4] bg-white/70 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-[#4E8256]" />
                  <div>
                    <div className="font-serif font-bold text-sm text-[#1F1B17]">
                      Artisan Loose Leaf & Matcha
                    </div>
                    <div className="text-xs text-[#6B5F50]">
                      Ceremonial green tea, high-mountain oolong, or silver needle buds.
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-4 py-3 bg-[#1F1B17] hover:bg-[#38332C] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Next: Flavor Preferences</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7A6C5C] block">
              2. Which aromatics excite your senses?
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'fruity', title: 'Bright & Fruit-Forward', note: 'Bergamot, wild peach, citrus' },
                { id: 'chocolate', title: 'Deep & Chocolaty', note: 'Cocoa nibs, hazelnut praline' },
                { id: 'floral', title: 'Delicate & Floral', note: 'Jasmine bloom, honey nectar' },
                { id: 'comfort', title: 'Rich Umami & Toasted', note: 'Velvet spinach, roasted grains' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFlavorBias(f.id as typeof flavorBias)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    flavorBias === f.id
                      ? 'border-[#1E1B18] bg-white ring-1 ring-[#1E1B18] shadow-sm'
                      : 'border-[#E2D8C4] bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="font-serif font-bold text-xs text-[#1F1B17]">{f.title}</div>
                  <div className="text-[11px] text-[#6E6152] mt-0.5">{f.note}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 bg-white border border-[#DACFB8] text-[#1F1B17] text-xs font-medium rounded-lg cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-[#1F1B17] hover:bg-[#38332C] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Reveal Your Match</span>
                <Sparkles className="w-4 h-4 text-[#D97736]" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-[#FAF2E6] border border-[#E8D6BF] rounded-2xl p-5 text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#946132] font-bold block mb-1">
                YOUR CURATED SIGNATURE HARVEST
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#1E1B17]">
                {recommendedProduct.name}
              </h4>
              <p className="text-xs text-[#7A6B5B] font-mono mt-0.5">
                {recommendedProduct.roastOrType} · {recommendedProduct.origin.country}
              </p>

              <div className="my-3 py-2 px-3 bg-white/80 rounded-lg text-xs font-medium text-[#4F4437]">
                {recommendedProduct.tastingNotes.join(' · ')}
              </div>

              <p className="text-xs text-[#5E5244] leading-relaxed">
                {recommendedProduct.story.slice(0, 160)}...
              </p>

              <div className="mt-4 pt-3 border-t border-[#E8DAC5] flex items-center justify-between text-xs font-mono">
                <span className="text-[#786B5C]">Starts from</span>
                <span className="font-bold text-base text-[#1E1B17]">
                  ${recommendedProduct.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-3 bg-white border border-[#DACFB8] text-[#1F1B17] text-xs font-medium rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>

              <button
                onClick={() => {
                  onSelectProduct(recommendedProduct);
                  onClose();
                }}
                className="flex-1 py-3 bg-[#1F1B17] hover:bg-[#38332C] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow"
              >
                <span>View & Select Grind</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
