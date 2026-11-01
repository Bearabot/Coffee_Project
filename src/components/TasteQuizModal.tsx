import React, { useState } from 'react';
import { X, Sparkles, Coffee, Leaf, ArrowRight, RotateCcw, Check, Droplets, Clock, Thermometer, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { ArtworkVisualizer } from './ArtworkVisualizer';

interface TasteQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (item: {
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

export const TasteQuizModal: React.FC<TasteQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  // 4-Step Sommelier Journey (Steps 1 to 4, then Step 5 is Results)
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // User Selections
  const [beverageRitual, setBeverageRitual] = useState<'coffee' | 'tea' | 'both'>('coffee');
  const [flavorAroma, setFlavorAroma] = useState<'citrus_floral' | 'chocolaty_toffee' | 'earthy_spiced' | 'umami_toasted'>('citrus_floral');
  const [bodyAndMilk, setBodyAndMilk] = useState<'clean_black' | 'velvet_milk' | 'chilled_iced'>('clean_black');
  const [energyCurve, setEnergyCurve] = useState<'dawn_power' | 'sustained_focus' | 'gentle_decaf'>('dawn_power');

  // Sophisticated Matching Algorithm
  const computeRecommendations = (): { primary: Product; runnerUp: Product; matchPercentage: number } => {
    const scoredProducts = products.map((product) => {
      let score = 0;

      // 1. Category Alignment
      if (beverageRitual === 'coffee') {
        if (product.category === 'coffee') score += 40;
        else score -= 20;
      } else if (beverageRitual === 'tea') {
        if (product.category === 'tea') score += 40;
        else score -= 20;
      } else {
        // Both: balanced score
        score += 25;
      }

      // 2. Flavor & Terroir Profile Alignment
      if (flavorAroma === 'citrus_floral') {
        score += product.flavorScores.acidity * 0.4 + product.flavorScores.floral * 0.4;
      } else if (flavorAroma === 'chocolaty_toffee') {
        score += product.flavorScores.sweetness * 0.5 + product.flavorScores.body * 0.4;
      } else if (flavorAroma === 'earthy_spiced') {
        score += product.flavorScores.body * 0.6 + (100 - product.flavorScores.acidity) * 0.3;
      } else if (flavorAroma === 'umami_toasted') {
        score += product.flavorScores.sweetness * 0.4 + (product.category === 'tea' ? 35 : 10);
      }

      // 3. Body & How It's Taken
      if (bodyAndMilk === 'clean_black') {
        // Prefers transparency & sparkling clarity
        if (product.flavorScores.acidity > 60 || product.flavorScores.floral > 60) score += 20;
      } else if (bodyAndMilk === 'velvet_milk') {
        // Needs heavy body & richness to cut through milk
        if (product.flavorScores.body > 65 || product.roastOrType.includes('Dark') || product.roastOrType.includes('Medium')) {
          score += 25;
        }
      } else if (bodyAndMilk === 'chilled_iced') {
        // Great iced brews (Cold Brew, Sencha, Geisha, Guji)
        if (product.recommendedBrew.some((b) => b.toLowerCase().includes('cold') || b.toLowerCase().includes('iced') || b.toLowerCase().includes('pourover'))) {
          score += 20;
        }
      }

      // 4. Energy & Caffeine Intent
      if (energyCurve === 'gentle_decaf') {
        if (product.id === 'swiss-water-decaf' || product.id === 'kyoto-ceremonial-hojicha' || product.badge?.includes('Low Caffeine') || product.badge?.includes('Chemical Free')) {
          score += 60;
        } else {
          score -= 30;
        }
      } else if (energyCurve === 'sustained_focus') {
        // Matcha and oolongs are rich in L-Theanine
        if (product.id === 'uji-ceremonial-matcha' || product.id === 'phoenix-dan-cong-milanxiang' || product.category === 'tea') {
          score += 25;
        }
      } else if (energyCurve === 'dawn_power') {
        // High altitude Arabica and full-bodied Assam
        if (product.id === 'assam-golden-tips' || product.id === 'cmcr-22-martin' || product.id === 'kenya-nyeri-peaberry') {
          score += 25;
        }
      }

      return { product, score };
    });

    // Sort by descending match score
    scoredProducts.sort((a, b) => b.score - a.score);

    const primary = scoredProducts[0]?.product || products[0];
    const runnerUp = scoredProducts[1]?.product || products[1];

    return { primary, runnerUp, matchPercentage: 98 };
  };

  const { primary: matchProduct, runnerUp: altProduct } = computeRecommendations();

  // Reset quiz
  const handleReset = () => {
    setStep(1);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] rounded-2xl max-w-2xl w-full border border-[#DECDB3] shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A6E5D] hover:text-[#1E1B18] rounded-full hover:bg-[#EFE9DC] transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sommelier Quiz Header & Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#8C7D6D] mb-2">
            <div className="flex items-center gap-1.5 font-bold text-[#A86E38]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sommelier Taste Profiler</span>
            </div>
            <span>{step <= 4 ? `Step ${step} of 4` : 'Sommelier Match Results'}</span>
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full bg-[#E8DEC9] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#1F1B17] h-full transition-all duration-300"
              style={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Beverage Preference & Morning Ritual */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1E1B18] tracking-tight">
                1. What is your morning ritual of choice?
              </h3>
              <p className="text-xs sm:text-sm text-[#695D4D] mt-1">
                Select the craft experience that begins your day.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'coffee',
                  title: 'Specialty Arabica Coffee',
                  note: 'Single-origin pour overs, modern double espresso, and velvety flat whites.',
                  icon: Coffee,
                  badge: 'Micro-Roasted Weekly',
                },
                {
                  id: 'tea',
                  title: 'Artisan Loose-Leaf & Ceremonial Matcha',
                  note: 'Shaded Uji green tea, high-mountain cliff oolongs, and first-flush Darjeeling.',
                  icon: Leaf,
                  badge: 'Single Estate Gardens',
                },
                {
                  id: 'both',
                  title: 'The Dual Atelier Explorer',
                  note: 'A cup of specialty coffee to awaken at dawn, paired with mindful tea rituals in the afternoon.',
                  icon: Sparkles,
                  badge: 'Curated Duet',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBeverageRitual(item.id as typeof beverageRitual)}
                  className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    beverageRitual === item.id
                      ? 'border-[#1E1B18] bg-white ring-1 ring-[#1E1B18] shadow-sm'
                      : 'border-[#E2D8C4] bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#F3EDE1] flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#8A5A2B]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#1F1B17]">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#8C7D6D] bg-[#F4EEE4] px-1.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B5F50] mt-0.5">{item.note}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-[#1F1B17] hover:bg-[#38332C] text-white text-xs font-medium rounded-lg flex items-center gap-2 cursor-pointer shadow transition-colors"
              >
                <span>Continue: Sensory Palate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Sensory Aromatics Spectrum */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1E1B18] tracking-tight">
                2. Which flavor spectrum excites your palate?
              </h3>
              <p className="text-xs sm:text-sm text-[#695D4D] mt-1">
                Pinpoint the aroma notes you naturally gravitate toward.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'citrus_floral',
                  title: 'Sparkling Citrus & Floral Blossoms',
                  notes: 'Jasmine bloom, Meyer lemon curd, bergamot, and sweet white peach.',
                  descriptor: 'Clean, radiant, and wine-like',
                },
                {
                  id: 'chocolaty_toffee',
                  title: 'Deep Cocoa, Praline & Toffee',
                  notes: 'Dark chocolate, toasted hazelnut, vanilla praline, and raw mountain honey.',
                  descriptor: 'Comforting, syrupy, and dessert-like',
                },
                {
                  id: 'earthy_spiced',
                  title: 'Earthy Cedar, Molasses & Spice',
                  notes: 'Dark baker’s cocoa, petrichor, sweet cedarwood, and pipe tobacco.',
                  descriptor: 'Heavy, rustic, and low-acid',
                },
                {
                  id: 'umami_toasted',
                  title: 'Sweet Umami, Grass & Toasted Grain',
                  notes: 'Steamed tencha microfoam, roasted brown rice mochi, and seaweed breeze.',
                  descriptor: 'Japanese tea house comfort',
                },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFlavorAroma(f.id as typeof flavorAroma)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    flavorAroma === f.id
                      ? 'border-[#1E1B18] bg-white ring-1 ring-[#1E1B18] shadow-sm'
                      : 'border-[#E2D8C4] bg-white/70 hover:bg-white'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E6533] block mb-1">
                      {f.descriptor}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#1F1B17]">
                      {f.title}
                    </h4>
                    <p className="text-xs text-[#63574A] mt-1.5 leading-relaxed">
                      {f.notes}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-3 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 bg-white border border-[#DACFB9] text-xs font-medium text-[#1F1B17] rounded-lg cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-[#1F1B17] hover:bg-[#38332C] text-white text-xs font-medium rounded-lg flex items-center gap-2 cursor-pointer shadow transition-colors"
              >
                <span>Continue: Texture & Ritual</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Mouthfeel & Preparation Preference */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1E1B18] tracking-tight">
                3. How do you like your cup to feel?
              </h3>
              <p className="text-xs sm:text-sm text-[#695D4D] mt-1">
                Texture and milk preferences determine our optimal roast and extraction match.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'clean_black',
                  title: 'Clean, Silky & Transparent (Strictly Pure Terroir)',
                  desc: 'Enjoyed black or pure leaf. You prize clarity, delicate sweetness, and zero bitterness.',
                  idealFor: 'V60 Pour Over · Chemex · Gaiwan',
                },
                {
                  id: 'velvet_milk',
                  title: 'Heavy, Velvety & Textured (With Milk or Oat Milk)',
                  desc: 'Needs dense cocoa structure, creamy oils, and caramel body that cuts effortlessly through milk.',
                  idealFor: 'Espresso · Flat White · Moka · Assam Tea',
                },
                {
                  id: 'chilled_iced',
                  title: 'Chilled, Refreshing & Smooth (Over Ice)',
                  desc: 'Flash-brewed hot over clear ice cubes or slow cold-steeped for a crisp, thirst-quenching nectar.',
                  idealFor: 'Japanese Iced Pour Over · Slow Cold Brew',
                },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setBodyAndMilk(m.id as typeof bodyAndMilk)}
                  className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    bodyAndMilk === m.id
                      ? 'border-[#1E1B18] bg-white ring-1 ring-[#1E1B18] shadow-sm'
                      : 'border-[#E2D8C4] bg-white/70 hover:bg-white'
                  }`}
                >
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#1F1B17]">
                      {m.title}
                    </h4>
                    <p className="text-xs text-[#63574A] mt-1">{m.desc}</p>
                    <span className="text-[10px] font-mono text-[#8C7D6D] mt-1 block">
                      Recommended Gear: {m.idealFor}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-3 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 bg-white border border-[#DACFB9] text-xs font-medium text-[#1F1B17] rounded-lg cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 bg-[#1F1B17] hover:bg-[#38332C] text-white text-xs font-medium rounded-lg flex items-center gap-2 cursor-pointer shadow transition-colors"
              >
                <span>Continue: Energy & Timing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Energy Curve & Caffeine Intent */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1E1B18] tracking-tight">
                4. What energy curve are you looking for?
              </h3>
              <p className="text-xs sm:text-sm text-[#695D4D] mt-1">
                From high-octane morning awakenings to calming, restorative evening infusions.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'dawn_power',
                  title: 'Dawn Powerhouse (High Awakening Energy)',
                  note: 'Full caffeine Arabica heirloom or rich Second Flush black tea to kickstart the day.',
                  tag: 'Peak Focus',
                },
                {
                  id: 'sustained_focus',
                  title: 'Mindful Sustained Clarity (Smooth L-Theanine Boost)',
                  note: 'Ceremonial matcha or mountain oolong for serene, jitter-free alpha brainwave calm.',
                  tag: 'High L-Theanine',
                },
                {
                  id: 'gentle_decaf',
                  title: 'Restorative / Evening Wind-Down (Ultra-Low / 0% Caffeine)',
                  note: 'Pure Swiss Glacier Water Decaf or drum-roasted Kyoto Hojicha for cozy evening rituals.',
                  tag: 'Chemical-Free / Relaxing',
                },
              ].map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setEnergyCurve(e.id as typeof energyCurve)}
                  className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    energyCurve === e.id
                      ? 'border-[#1E1B18] bg-white ring-1 ring-[#1E1B18] shadow-sm'
                      : 'border-[#E2D8C4] bg-white/70 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-[#1F1B17]">
                        {e.title}
                      </span>
                      <span className="text-[10px] font-mono text-[#8C7D6D] bg-[#F4EEE4] px-1.5 py-0.5 rounded">
                        {e.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#63574A] mt-1">{e.note}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-3 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2.5 bg-white border border-[#DACFB9] text-xs font-medium text-[#1F1B17] rounded-lg cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-6 py-3 bg-[#1F1B17] hover:bg-[#38332C] text-white text-xs font-medium rounded-lg flex items-center gap-2 cursor-pointer shadow transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#D97736]" />
                <span>Calculate Sommelier Match</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Sophisticated Sommelier Results & Brewing Recommendations */}
        {step === 5 && (
          <div className="space-y-5">
            {/* Primary Match Card */}
            <div className="bg-[#FAF2E6] border border-[#E5D4BC] rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8D9C5] text-xs font-mono">
                <span className="text-[#9E6533] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2C6E3B]" />
                  98% Terroir Compatibility Match
                </span>
                <span className="text-[#786C5D]">
                  {matchProduct.category === 'coffee' ? 'SPECIALTY ARABICA' : 'ARTISAN LEAF'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center mt-4">
                <div className="sm:col-span-5">
                  <ArtworkVisualizer product={matchProduct} size="sm" />
                </div>

                <div className="sm:col-span-7">
                  <span className="text-[10px] font-mono text-[#8C7D6D] uppercase">
                    {matchProduct.origin.country} · {matchProduct.origin.elevation}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-[#1E1B17] leading-tight mt-0.5">
                    {matchProduct.name}
                  </h4>
                  <p className="text-xs font-medium text-[#7D6E5D] mt-0.5">
                    {matchProduct.roastOrType} · {matchProduct.processMethod}
                  </p>

                  {/* Cupping Notes */}
                  <div className="my-2.5 py-1.5 px-2.5 bg-white/80 rounded border border-[#E2D5C0] text-xs font-semibold text-[#3D3328]">
                    {matchProduct.tastingNotes.join(' · ')}
                  </div>

                  <p className="text-xs text-[#5C5142] line-clamp-2 leading-relaxed">
                    {matchProduct.story}
                  </p>

                  {/* Sommelier Brewing Parameter Guide */}
                  <div className="mt-3.5 pt-3 border-t border-[#E8D9C5] grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-[#6E6152]">
                    <div className="p-1.5 bg-white/70 rounded">
                      <span className="block text-[#9C8F7E] uppercase text-[9px]">Ideal Temp</span>
                      <span className="font-bold text-[#1E1B17]">
                        {matchProduct.category === 'coffee' ? '93°C / 200°F' : '75°C - 85°C'}
                      </span>
                    </div>
                    <div className="p-1.5 bg-white/70 rounded">
                      <span className="block text-[#9C8F7E] uppercase text-[9px]">Ratio</span>
                      <span className="font-bold text-[#1E1B17]">
                        {matchProduct.category === 'coffee' ? '1:16.6' : '1:18 Leaf'}
                      </span>
                    </div>
                    <div className="p-1.5 bg-white/70 rounded">
                      <span className="block text-[#9C8F7E] uppercase text-[9px]">Timing</span>
                      <span className="font-bold text-[#1E1B17]">
                        {matchProduct.category === 'coffee' ? '3:00 - 3:30' : '2:00 min'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Primary Call to Action */}
              <div className="mt-4 pt-4 border-t border-[#E8D9C5] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#7D6E5D] block">
                    Starts At
                  </span>
                  <span className="font-mono text-xl font-bold text-[#1E1B17]">
                    ${matchProduct.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectProduct(matchProduct);
                      onClose();
                    }}
                    className="px-5 py-2.5 bg-[#1F1B17] hover:bg-[#38332C] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer shadow transition-colors"
                  >
                    <span>View & Select Grind</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Alternative Runner-Up Harvest */}
            {altProduct && (
              <div className="p-3.5 bg-white rounded-xl border border-[#DECDB3] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#8C7D6D]">
                    Curator’s Runner-Up Discovery
                  </span>
                  <div className="font-serif font-bold text-[#1E1B17]">
                    {altProduct.name} ({altProduct.roastOrType})
                  </div>
                  <div className="text-[11px] text-[#695D4E] mt-0.5">
                    {altProduct.tastingNotes.slice(0, 3).join(' · ')}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectProduct(altProduct);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-[#FAF5EB] hover:bg-[#EFE8DC] border border-[#DECDB3] text-[#1E1B18] font-medium text-xs rounded-lg cursor-pointer transition-colors"
                >
                  Explore Alternate &rarr;
                </button>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleReset}
                className="text-xs font-mono text-[#8C7D6D] hover:text-[#1E1B17] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Taste Profiler</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-white border border-[#DACFB9] text-xs font-medium text-[#1E1B17] rounded-lg cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
