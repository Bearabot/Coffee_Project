import React, { useState } from 'react';
import { X, Star, Check, Sparkles, Sliders, Droplets, Clock } from 'lucide-react';
import { Product } from '../types';
import { ArtworkVisualizer } from './ArtworkVisualizer';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: {
    productId: string;
    name: string;
    category: Product['category'];
    selectedWeight: string;
    selectedGrind: string;
    price: number;
    quantity: number;
    isSubscription: boolean;
    subscriptionCadence?: string;
    visualTheme: Product['visualTheme'];
  }) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]?.size || '250g');
  const [selectedGrind, setSelectedGrind] = useState(product.grindOptions[0] || 'Whole Bean');
  const [isSubscription, setIsSubscription] = useState(false);
  const [subscriptionCadence, setSubscriptionCadence] = useState('Every 2 Weeks');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Compute active price based on weight selected
  const activeWeightObj = product.weights.find((w) => w.size === selectedWeight) || product.weights[0];
  const baseUnitPrice = activeWeightObj ? activeWeightObj.price : product.price;
  const unitPrice = isSubscription ? baseUnitPrice * 0.85 : baseUnitPrice;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      name: product.name,
      category: product.category,
      selectedWeight,
      selectedGrind,
      price: unitPrice,
      quantity,
      isSubscription,
      subscriptionCadence: isSubscription ? subscriptionCadence : undefined,
      visualTheme: product.visualTheme,
    });
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#E3DAC8] shadow-2xl p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-[#7A6E5D] hover:text-[#1E1B18] rounded-full hover:bg-[#EFE9DC] transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Artwork & Deep Terroir Information */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <ArtworkVisualizer product={product} size="lg" />

            {/* Flavor Spectrum Meter */}
            <div className="bg-[#F3EDE2] p-4 rounded-xl border border-[#E2D9C6]">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6B5F4E] mb-3">
                <Sliders className="w-3.5 h-3.5" />
                <span>Sensory Spectrum Profile</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-[#594E3F] mb-1">
                    <span>Acidity & Sparkle</span>
                    <span className="font-mono">{product.flavorScores.acidity}%</span>
                  </div>
                  <div className="h-1.5 bg-[#E4DAC7] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D97736] rounded-full transition-all duration-500"
                      style={{ width: `${product.flavorScores.acidity}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#594E3F] mb-1">
                    <span>Body & Viscosity</span>
                    <span className="font-mono">{product.flavorScores.body}%</span>
                  </div>
                  <div className="h-1.5 bg-[#E4DAC7] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#5C4533] rounded-full transition-all duration-500"
                      style={{ width: `${product.flavorScores.body}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#594E3F] mb-1">
                    <span>Sweetness & Caramelization</span>
                    <span className="font-mono">{product.flavorScores.sweetness}%</span>
                  </div>
                  <div className="h-1.5 bg-[#E4DAC7] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C89B3A] rounded-full transition-all duration-500"
                      style={{ width: `${product.flavorScores.sweetness}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#594E3F] mb-1">
                    <span>Floral & Herbaceous Aromas</span>
                    <span className="font-mono">{product.flavorScores.floral}%</span>
                  </div>
                  <div className="h-1.5 bg-[#E4DAC7] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#528C59] rounded-full transition-all duration-500"
                      style={{ width: `${product.flavorScores.floral}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terroir & Origin Details */}
            <div className="bg-white/80 p-4 rounded-xl border border-[#E7DFCC] text-xs space-y-2">
              <div className="font-serif font-bold text-sm text-[#1F1B17]">
                Origin Specifications
              </div>
              <div className="grid grid-cols-2 gap-2 text-[#5E5345]">
                <div>
                  <span className="font-mono text-[#8C7D6C] block">Region:</span>
                  <span>{product.origin.region}</span>
                </div>
                <div>
                  <span className="font-mono text-[#8C7D6C] block">Estate / Farm:</span>
                  <span>{product.origin.estate}</span>
                </div>
                <div>
                  <span className="font-mono text-[#8C7D6C] block">Elevation:</span>
                  <span>{product.origin.elevation}</span>
                </div>
                <div>
                  <span className="font-mono text-[#8C7D6C] block">Processing:</span>
                  <span>{product.processMethod}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs font-mono text-[#7D7060] mb-1">
                <span className="uppercase tracking-wider">
                  {product.category === 'coffee' ? 'Specialty Arabica Lot' : 'Single Estate Harvest'}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#D97736] text-[#D97736]" />
                  <span className="font-bold text-[#1F1A16]">{product.rating}</span>
                  <span className="text-[#8C7E6E]">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Roast */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1B17] leading-tight">
                {product.name}
              </h2>
              <p className="text-sm font-medium text-[#7D6E5D] mt-1">
                {product.roastOrType} · {product.origin.country}
              </p>

              {/* Tasting Notes */}
              <div className="my-3.5 py-2.5 px-3 bg-[#F2EDE1] rounded-lg border border-[#E0D7C3]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#7C6E5C] block mb-1">
                  Cupping Tasting Notes
                </span>
                <p className="text-sm font-semibold text-[#29221B]">
                  {product.tastingNotes.join(' · ')}
                </p>
              </div>

              {/* Story */}
              <p className="text-xs sm:text-sm text-[#5C5244] leading-relaxed mb-5">
                {product.story}
              </p>

              {/* Weight / Size Selection */}
              <div className="mb-4">
                <label className="text-xs font-mono uppercase tracking-wider text-[#695C4D] block mb-1.5">
                  Packaging Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.weights.map((w) => (
                    <button
                      key={w.size}
                      type="button"
                      onClick={() => setSelectedWeight(w.size)}
                      className={`p-2.5 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                        selectedWeight === w.size
                          ? 'border-[#1F1A16] bg-[#1F1A16] text-white font-bold shadow-sm'
                          : 'border-[#DACFB9] bg-white hover:border-[#B5A58B] text-[#332C24]'
                      }`}
                    >
                      <div>{w.size}</div>
                      <div className="text-[11px] font-mono mt-0.5 opacity-90">
                        ${w.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind / Preparation Selection */}
              <div className="mb-4">
                <label className="text-xs font-mono uppercase tracking-wider text-[#695C4D] block mb-1.5">
                  {product.category === 'coffee' ? 'Grind Selection' : 'Cut & Format'}
                </label>
                <select
                  value={selectedGrind}
                  onChange={(e) => setSelectedGrind(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-[#DACFB9] rounded-lg text-[#1F1B17] font-medium focus:outline-none focus:border-[#1F1A16] cursor-pointer"
                >
                  {product.grindOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Purchase Mode Toggle: One-Time vs Subscribe & Save */}
              <div className="mb-5 p-3.5 rounded-xl border border-[#D8CCB5] bg-[#F7F2E7] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#6E6150]">
                    Delivery Preference
                  </span>
                  {isSubscription && (
                    <span className="text-xs font-bold text-[#A85822] flex items-center gap-1 font-mono">
                      <Sparkles className="w-3.5 h-3.5" /> 15% OFF + Free Shipping
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubscription(false)}
                    className={`py-2 px-3 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                      !isSubscription
                        ? 'border-[#1F1B17] bg-white font-bold text-[#1F1B17] shadow-sm'
                        : 'border-[#DFD5C2] text-[#695D4E] hover:bg-white/60'
                    }`}
                  >
                    One-Time Purchase
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSubscription(true)}
                    className={`py-2 px-3 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                      isSubscription
                        ? 'border-[#1F1B17] bg-white font-bold text-[#1F1B17] shadow-sm'
                        : 'border-[#DFD5C2] text-[#695D4E] hover:bg-white/60'
                    }`}
                  >
                    Subscribe & Save 15%
                  </button>
                </div>

                {isSubscription && (
                  <div className="pt-2 border-t border-[#E5DAC6] flex items-center justify-between text-xs">
                    <span className="text-[#6E6150]">Delivery Cadence:</span>
                    <select
                      value={subscriptionCadence}
                      onChange={(e) => setSubscriptionCadence(e.target.value)}
                      className="p-1.5 bg-white border border-[#DACFB9] rounded text-xs text-[#1F1B17] font-medium"
                    >
                      <option value="Every 1 Week">Every 1 Week</option>
                      <option value="Every 2 Weeks">Every 2 Weeks (Recommended)</option>
                      <option value="Every 3 Weeks">Every 3 Weeks</option>
                      <option value="Every 4 Weeks">Every 4 Weeks</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag CTA */}
            <div className="pt-4 border-t border-[#EAE3D4]">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-[#DACFB9] rounded-lg bg-white overflow-hidden shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2.5 text-sm text-[#4A4034] hover:bg-[#F3EDE2] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2.5 font-mono text-xs font-bold text-[#1F1B17] min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2.5 text-sm text-[#4A4034] hover:bg-[#F3EDE2] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={justAdded}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    justAdded
                      ? 'bg-[#2E5A36] text-white'
                      : 'bg-[#1F1B17] hover:bg-[#38332C] active:bg-[#12100E] text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag</span>
                      <span className="font-mono tabular-nums font-bold">
                        · ${totalPrice.toFixed(2)}
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Recommended Brew parameters hint */}
              <div className="mt-4 flex items-center justify-around py-2 px-3 bg-[#F4EEE4] rounded-lg text-[11px] text-[#695D4F]">
                <div className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-[#5B889C]" />
                  <span>{product.category === 'coffee' ? '1:16 Ratio' : '1:18 Ratio'}</span>
                </div>
                <span className="text-[#D3C7B2]">|</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#A8723E]" />
                  <span>{product.category === 'coffee' ? '3:00 - 3:30 Min' : '2:00 - 4:00 Min'}</span>
                </div>
                <span className="text-[#D3C7B2]">|</span>
                <span>{product.recommendedBrew[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
