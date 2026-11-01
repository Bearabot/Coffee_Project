import React, { useState } from 'react';
import { Sparkles, Calendar, Coffee, Leaf, RefreshCw, CheckCircle2, ShieldCheck, PauseCircle, PlayCircle, SkipForward } from 'lucide-react';
import { Product } from '../types';

interface SubscriptionBuilderProps {
  onAddSubscriptionToBag: (item: {
    productId: string;
    name: string;
    category: 'coffee' | 'tea';
    selectedWeight: string;
    selectedGrind: string;
    price: number;
    quantity: number;
    isSubscription: boolean;
    subscriptionCadence: string;
    visualTheme: Product['visualTheme'];
  }) => void;
}

export const SubscriptionBuilder: React.FC<SubscriptionBuilderProps> = ({
  onAddSubscriptionToBag,
}) => {
  const [curation, setCuration] = useState<'single_origin' | 'signature_blends' | 'rare_tea' | 'duo_atelier'>('single_origin');
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('biweekly');
  const [bagsCount, setBagsCount] = useState<number>(2);
  const [grind, setGrind] = useState('Whole Bean');
  const [tastePreference, setTastePreference] = useState('Bright & Floral');

  // Simulated active user subscription state for demo management
  const [hasSimulatedSubscription, setHasSimulatedSubscription] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [skippedShipment, setSkippedShipment] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Base pricing
  const curationDetails = {
    single_origin: {
      title: "Roaster's Choice Single Origin",
      description: 'Rotating seasonal micro-lots from our direct-trade farm partners in Colombia, Ethiopia, and Guatemala.',
      basePrice: 26,
      category: 'coffee' as const,
      badge: 'Most Awarded',
      theme: {
        baseColor: '#252F38',
        accentColor: '#4FA3D1',
        patternType: 'topography' as const,
        labelColor: '#EBF4FA',
        sealText: 'ROASTER’S CHOICE',
      },
    },
    signature_blends: {
      title: 'Signature Roastery Blends',
      description: 'Comforting, syrupy profiles like 22 Martin Road and Lucky Basterd. Ideal for milk beverages and classic espresso.',
      basePrice: 22,
      category: 'coffee' as const,
      badge: 'Cafe Staple',
      theme: {
        baseColor: '#2B231D',
        accentColor: '#D97736',
        patternType: 'waves' as const,
        labelColor: '#F5EDE2',
        sealText: 'EST. 2013 · BLEND',
      },
    },
    rare_tea: {
      title: 'Rare Tea & Matcha Treasury',
      description: 'Single-estate loose-leaf harvests, stone-milled Uji matcha, and high mountain Phoenix Dan Cong oolongs.',
      basePrice: 28,
      category: 'tea' as const,
      badge: 'Pure Harvests',
      theme: {
        baseColor: '#1C2E20',
        accentColor: '#68B359',
        patternType: 'botanical' as const,
        labelColor: '#F2F8F2',
        sealText: 'TEA CIRCLE · HARVEST',
      },
    },
    duo_atelier: {
      title: 'The Atelier Coffee & Tea Duo',
      description: 'The ultimate morning ritual: one curated 250g bag of single-origin coffee plus one 50g tin of seasonal artisan tea.',
      basePrice: 46,
      category: 'coffee' as const,
      badge: 'Best Value',
      theme: {
        baseColor: '#2E2629',
        accentColor: '#C47244',
        patternType: 'rings' as const,
        labelColor: '#FAF2EC',
        sealText: 'DUO ATELIER · RESERVE',
      },
    },
  };

  const selectedCuration = curationDetails[curation];
  const rawTotal = selectedCuration.basePrice * (curation === 'duo_atelier' ? 1 : bagsCount);
  const discountedTotal = rawTotal * 0.85; // 15% off subscription benefit

  const handleStartSubscription = () => {
    onAddSubscriptionToBag({
      productId: `sub-${curation}`,
      name: `${selectedCuration.title} (Recurring Subscription)`,
      category: selectedCuration.category,
      selectedWeight: curation === 'duo_atelier' ? '1 Bag + 1 Tin' : `${bagsCount} x 250g`,
      selectedGrind: grind,
      price: discountedTotal,
      quantity: 1,
      isSubscription: true,
      subscriptionCadence:
        frequency === 'weekly'
          ? 'Every 1 Week'
          : frequency === 'biweekly'
          ? 'Every 2 Weeks'
          : 'Every 4 Weeks',
      visualTheme: selectedCuration.theme,
    });
    setHasSimulatedSubscription(true);
    setStatusMessage('Subscription added to your shopping bag! Free shipping unlocked.');
    setTimeout(() => setStatusMessage(''), 4500);
  };

  return (
    <div className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8A7D6D] mb-2">
          <span>Freshness Guarantee</span>
          <span aria-hidden="true">·</span>
          <span>Never Run Out</span>
          <span aria-hidden="true">·</span>
          <span>Cancel Anytime</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1B18] tracking-tight [text-wrap:balance]">
          The Roaster’s Club & Tea Circle
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#615648] leading-relaxed">
          Customized recurring shipments roasted and packed to order. Save 15% on every delivery, receive complimentary priority shipping, and explore rare micro-lots before the general public.
        </p>
      </div>

      {statusMessage && (
        <div className="mb-6 p-4 rounded-xl bg-[#284A30] text-white text-xs sm:text-sm font-medium flex items-center justify-between shadow-md max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#7AE289] shrink-0" />
            <span>{statusMessage}</span>
          </div>
        </div>
      )}

      {/* Subscription Customization Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Configuration Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Select Curation */}
          <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E3DAC8] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-[#1E1B18]">
                1. Select Your Curation
              </h3>
              <span className="text-xs font-mono text-[#8C7E6E]">STEP 1 OF 4</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(curationDetails) as (keyof typeof curationDetails)[]).map((key) => {
                const item = curationDetails[key];
                const isSelected = curation === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCuration(key)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#1E1B18] bg-[#FAF5EC] shadow-sm ring-1 ring-[#1E1B18]'
                        : 'border-[#E2D8C4] bg-white hover:border-[#C5B59E]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A7966] font-bold">
                          {item.badge}
                        </span>
                        {item.category === 'coffee' ? (
                          <Coffee className="w-3.5 h-3.5 text-[#A86E38]" />
                        ) : (
                          <Leaf className="w-3.5 h-3.5 text-[#5B8F62]" />
                        )}
                      </div>
                      <h4 className="font-serif text-sm font-bold text-[#1F1B17] leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#63574A] mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#EAE3D4] flex items-center justify-between text-xs font-mono">
                      <span className="text-[#847768]">From</span>
                      <span className="font-bold text-[#1F1B17]">
                        ${(item.basePrice * 0.85).toFixed(2)}/shipment
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Bags / Quantity (if not duo) */}
          {curation !== 'duo_atelier' && (
            <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E3DAC8] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-lg font-bold text-[#1E1B18]">
                  2. Select Quantity per Shipment
                </h3>
                <span className="text-xs font-mono text-[#8C7E6E]">STEP 2 OF 4</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setBagsCount(count)}
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                      bagsCount === count
                        ? 'border-[#1E1B18] bg-[#1E1B18] text-white shadow-sm font-bold'
                        : 'border-[#DACFB9] bg-white text-[#383129] hover:border-[#B5A58B]'
                    }`}
                  >
                    <div className="text-sm font-serif font-bold">
                      {count} {curation === 'rare_tea' ? 'Tin' : 'Bag'}{count > 1 ? 's' : ''}
                    </div>
                    <div className="text-[11px] opacity-80 font-mono mt-0.5">
                      ~{count * 20} Servings
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Delivery Frequency */}
          <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E3DAC8] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-lg font-bold text-[#1E1B18]">
                3. Choose Frequency
              </h3>
              <span className="text-xs font-mono text-[#8C7E6E]">STEP 3 OF 4</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'weekly', label: 'Every Week', note: 'For daily households' },
                { id: 'biweekly', label: 'Every 2 Weeks', note: 'Most Popular' },
                { id: 'monthly', label: 'Every 4 Weeks', note: 'Casual Sippers' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFrequency(f.id as typeof frequency)}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    frequency === f.id
                      ? 'border-[#1E1B18] bg-[#1E1B18] text-white shadow-sm font-bold'
                      : 'border-[#DACFB9] bg-white text-[#383129] hover:border-[#B5A58B]'
                  }`}
                >
                  <div className="text-sm font-serif font-bold">{f.label}</div>
                  <div className="text-[11px] opacity-80 font-mono mt-0.5">{f.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Grind & Taste Calibration */}
          <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E3DAC8] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-lg font-bold text-[#1E1B18]">
                4. Grind Format & Sensory Bias
              </h3>
              <span className="text-xs font-mono text-[#8C7E6E]">STEP 4 OF 4</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#695D4E] block mb-1">
                  Grind / Preparation
                </label>
                <select
                  value={grind}
                  onChange={(e) => setGrind(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#DACFB9] rounded-lg text-xs font-medium text-[#1E1B18] focus:outline-none"
                >
                  <option value="Whole Bean">Whole Bean (Optimal Freshness)</option>
                  <option value="Filter / Pour Over">Filter & Pour Over (Medium)</option>
                  <option value="Espresso">Espresso (Fine)</option>
                  <option value="French Press">French Press & Cold Brew (Coarse)</option>
                  <option value="Loose Leaf Tea">Whole Loose Leaf / Whisk Powder</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#695D4E] block mb-1">
                  Taste Profile Note
                </label>
                <select
                  value={tastePreference}
                  onChange={(e) => setTastePreference(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#DACFB9] rounded-lg text-xs font-medium text-[#1E1B18] focus:outline-none"
                >
                  <option value="Bright & Floral">Bright & Floral (Citrus, Jasmine, Peach)</option>
                  <option value="Chocolaty & Comforting">Chocolaty & Comforting (Cocoa, Praline)</option>
                  <option value="Balanced & Classic">Balanced & Classic (Caramel, Toffee, Honey)</option>
                  <option value="Wild & Experimental">Wild & Experimental (Anaerobic, Winey)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Subscriber Perks */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#DECDB3] p-6 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D4]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A7966]">
                Subscription Summary
              </span>
              <span className="text-xs font-bold font-mono text-[#A85822] bg-[#FAF0E4] px-2 py-0.5 rounded border border-[#EACBB0]">
                SAVE 15% AUTOMATICALLY
              </span>
            </div>

            {/* Plan Specs */}
            <div className="py-4 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-baseline">
                <span className="text-[#695D4E]">Curation:</span>
                <span className="font-semibold text-[#1F1B17] text-right">
                  {selectedCuration.title}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-[#695D4E]">Quantity:</span>
                <span className="font-semibold text-[#1F1B17]">
                  {curation === 'duo_atelier' ? '1 Coffee + 1 Rare Tea' : `${bagsCount} Bag${bagsCount > 1 ? 's' : ''}`}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-[#695D4E]">Cadence:</span>
                <span className="font-semibold text-[#1F1B17]">
                  {frequency === 'weekly'
                    ? 'Every 7 Days'
                    : frequency === 'biweekly'
                    ? 'Every 14 Days'
                    : 'Every 30 Days'}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-[#695D4E]">Grind:</span>
                <span className="font-semibold text-[#1F1B17]">{grind}</span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-[#695D4E]">Sensory Style:</span>
                <span className="font-semibold text-[#1F1B17]">{tastePreference}</span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-[#695D4E]">Standard Roastery Price:</span>
                <span className="line-through font-mono text-[#8C7D6D] tabular-nums">
                  ${rawTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-baseline text-base font-bold pt-2 border-t border-[#EAE3D4]">
                <span className="text-[#1F1B17]">Subscriber Price:</span>
                <span className="font-mono text-[#1F1B17] text-xl tabular-nums">
                  ${discountedTotal.toFixed(2)}
                  <span className="text-xs font-normal text-[#8A7966] ml-1">/delivery</span>
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              onClick={handleStartSubscription}
              className="w-full mt-4 py-3.5 px-4 bg-[#1F1B17] hover:bg-[#38332C] active:bg-[#12100E] text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D97736]" />
              <span>Start Recurring Subscription</span>
            </button>

            {/* Guarantee markers */}
            <div className="mt-5 space-y-2 pt-4 border-t border-[#EAE3D4] text-xs text-[#63574A]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3E654E] shrink-0" />
                <span>Complimentary priority trackable shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#3E654E] shrink-0" />
                <span>Pause, change frequency, or skip anytime in 1-click</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#3E654E] shrink-0" />
                <span>Freshness lock: roasted within 48h of dispatch</span>
              </div>
            </div>
          </div>

          {/* Active Subscription Management Demonstration Tool */}
          <div className="bg-[#F3EDE2] rounded-2xl border border-[#D5C9B4] p-5 text-xs text-[#524637]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif font-bold text-sm text-[#1F1B17]">
                Subscriber Control Simulator
              </span>
              <span className="font-mono text-[10px] text-[#7A6B5B]">
                {isPaused ? 'STATUS: PAUSED' : 'STATUS: ACTIVE'}
              </span>
            </div>
            <p className="text-[11px] text-[#695C4D] mb-3">
              Subscribers enjoy effortless self-serve flexibility. Test skipping or pausing your scheduled shipments below:
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsPaused(!isPaused);
                  setStatusMessage(
                    !isPaused
                      ? 'Subscription paused. No charges or shipments will occur until resumed.'
                      : 'Subscription resumed! Your next harvest dispatch is scheduled.'
                  );
                }}
                className="py-1.5 px-3 bg-white hover:bg-[#FAF7F2] border border-[#C5B59E] rounded-md font-medium text-[#1F1B17] flex items-center gap-1.5 cursor-pointer"
              >
                {isPaused ? (
                  <>
                    <PlayCircle className="w-3.5 h-3.5 text-[#2C6E3B]" />
                    <span>Resume Subscription</span>
                  </>
                ) : (
                  <>
                    <PauseCircle className="w-3.5 h-3.5 text-[#A86E38]" />
                    <span>Pause Subscription</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSkippedShipment(!skippedShipment);
                  setStatusMessage(
                    !skippedShipment
                      ? 'Skipped next shipment! Your account will skip this cycle and resume on the following interval.'
                      : 'Next shipment reinstated.'
                  );
                }}
                className="py-1.5 px-3 bg-white hover:bg-[#FAF7F2] border border-[#C5B59E] rounded-md font-medium text-[#1F1B17] flex items-center gap-1.5 cursor-pointer"
              >
                <SkipForward className="w-3.5 h-3.5 text-[#5B889C]" />
                <span>{skippedShipment ? 'Undo Skip' : 'Skip Next Delivery'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
