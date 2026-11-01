import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  activeTab: 'shop' | 'subscription' | 'brewing' | 'journal';
  onSelectTab: (tab: 'shop' | 'subscription' | 'brewing' | 'journal') => void;
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  cartSubtotal,
  onOpenCart,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE3D4] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element, no adjacent subtext/tags) */}
        <button
          onClick={() => onSelectTab('shop')}
          className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#1E1B18] hover:opacity-85 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
        >
          Common Ground
        </button>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5E564D]">
          <button
            onClick={() => onSelectTab('shop')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'shop'
                ? 'text-[#1E1B18] font-semibold border-b-2 border-[#1E1B18]'
                : 'hover:text-[#1E1B18]'
            }`}
          >
            Beans & Leaves
          </button>

          <button
            onClick={() => onSelectTab('subscription')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'subscription'
                ? 'text-[#1E1B18] font-semibold border-b-2 border-[#1E1B18]'
                : 'hover:text-[#1E1B18]'
            }`}
          >
            Subscriptions
          </button>

          <button
            onClick={() => onSelectTab('brewing')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'brewing'
                ? 'text-[#1E1B18] font-semibold border-b-2 border-[#1E1B18]'
                : 'hover:text-[#1E1B18]'
            }`}
          >
            Brewing Guides
          </button>

          <button
            onClick={() => onSelectTab('journal')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'journal'
                ? 'text-[#1E1B18] font-semibold border-b-2 border-[#1E1B18]'
                : 'hover:text-[#1E1B18]'
            }`}
          >
            Roastery Journal
          </button>
        </nav>

        {/* Zone 3: 1 primary action (Shopping Bag / Cart) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="Open Shopping Bag"
            className="flex items-center gap-2.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-[#1E1B18] bg-[#EFE9DC] hover:bg-[#E5DDCB] active:bg-[#DDD3BF] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer border border-[#DDD3BF]"
          >
            <ShoppingBag className="w-4 h-4 text-[#1E1B18]" />
            <span className="font-mono font-medium">Bag</span>
            <span className="w-5 h-5 rounded-full bg-[#1E1B18] text-white text-[11px] font-mono flex items-center justify-center font-bold">
              {cartCount}
            </span>
            {cartSubtotal > 0 && (
              <span className="hidden sm:inline-block font-mono text-xs text-[#5C5347] border-l border-[#D5C9B4] pl-2">
                ${cartSubtotal.toFixed(2)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Row (clean text-only links for mobile screens) */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-[#EAE3D4] bg-[#F5EFE4] text-xs font-medium text-[#5E564D] overflow-x-auto">
        <button
          onClick={() => onSelectTab('shop')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'shop' ? 'text-[#1E1B18] font-bold underline' : ''}`}
        >
          Shop
        </button>
        <button
          onClick={() => onSelectTab('subscription')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'subscription' ? 'text-[#1E1B18] font-bold underline' : ''}`}
        >
          Subscriptions
        </button>
        <button
          onClick={() => onSelectTab('brewing')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'brewing' ? 'text-[#1E1B18] font-bold underline' : ''}`}
        >
          Brew Guides
        </button>
        <button
          onClick={() => onSelectTab('journal')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'journal' ? 'text-[#1E1B18] font-bold underline' : ''}`}
        >
          Journal
        </button>
      </div>
    </header>
  );
};
