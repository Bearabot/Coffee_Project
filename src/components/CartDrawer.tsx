import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Sparkles, ArrowRight, Tag, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onExploreShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreShop,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const promoDiscount = appliedPromo === 'FIRSTCRAFT' ? rawSubtotal * 0.15 : 0;
  const subtotal = Math.max(0, rawSubtotal - promoDiscount);

  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoInput.trim().toUpperCase() === 'FIRSTCRAFT') {
      setAppliedPromo('FIRSTCRAFT');
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try FIRSTCRAFT for 15% off.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full flex flex-col justify-between shadow-2xl border-l border-[#DECDB3] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EAE3D4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1E1B18]" />
            <h3 className="font-serif text-lg font-bold text-[#1E1B18]">
              Your Shopping Bag
            </h3>
            <span className="text-xs font-mono text-[#8A7966] bg-[#EFE8DC] px-2 py-0.5 rounded-full font-semibold">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6E5D] hover:text-[#1E1B18] rounded-full hover:bg-[#EFE9DC] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#F4EDE0] border-b border-[#E7DDC9] text-xs">
          <div className="flex items-center justify-between text-[#5C5041] mb-1.5">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#3E654E]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#2B603A] font-bold">You unlocked Complimentary Shipping!</span>
              ) : (
                <span>Add ${remainingForFreeShipping.toFixed(2)} more for Free Shipping</span>
              )}
            </span>
            <span className="font-mono text-[10px] text-[#8C7D6D]">
              ${freeShippingThreshold} Goal
            </span>
          </div>
          <div className="w-full bg-[#E3DAC8] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#2B603A] h-full transition-all duration-300"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#786B5A]">
              <div className="w-14 h-14 rounded-full bg-[#EFE9DC] flex items-center justify-center mb-3">
                <ShoppingBag className="w-6 h-6 text-[#A89A86]" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#1E1B18]">
                Your bag is currently empty
              </h4>
              <p className="text-xs text-[#706454] mt-1 max-w-xs">
                Explore our fresh Tuesday roasts, single-estate oolong teas, or stone-milled matcha.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreShop();
                }}
                className="mt-5 py-2.5 px-4 bg-[#1F1B17] hover:bg-[#38332C] text-white text-xs font-medium rounded-lg cursor-pointer transition-colors"
              >
                Browse Fresh Harvests
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-white rounded-xl border border-[#E5DAC6] flex gap-3.5 shadow-sm"
              >
                {/* Visual miniature */}
                <div
                  className="w-16 h-18 rounded-lg flex items-center justify-center p-1.5 shrink-0 shadow-inner"
                  style={{
                    backgroundColor: item.visualTheme?.baseColor || '#2B231D',
                  }}
                >
                  <div
                    className="w-8 h-10 rounded border text-[7px] font-mono text-center flex flex-col justify-between p-0.5 bg-[#FAF7F2] text-[#1E1B18]"
                    style={{ borderColor: item.visualTheme?.accentColor || '#D97736' }}
                  >
                    <span>{item.category.toUpperCase()}</span>
                    <span className="font-bold truncate">{item.selectedWeight}</span>
                  </div>
                </div>

                {/* Info & Adjustments */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-sm font-bold text-[#1E1B18] leading-tight">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#9C8F7E] hover:text-[#C94A4A] p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#695D4E] mt-0.5">
                      {item.selectedWeight} · {item.selectedGrind}
                    </p>

                    {item.isSubscription && (
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-[#A85822]">
                        <Sparkles className="w-3 h-3" />
                        <span>Recurring: {item.subscriptionCadence} (15% off)</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[#F2ECE0]">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#DACFB9] rounded bg-[#FAF7F2] text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 hover:bg-[#EAE3D4] transition-colors cursor-pointer text-[#4A4034]"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono font-bold text-[#1E1B18]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 hover:bg-[#EAE3D4] transition-colors cursor-pointer text-[#4A4034]"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono text-sm font-bold text-[#1E1B18] tabular-nums">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#DECDB3] bg-[#F7F2E7] space-y-3">
            {/* Promo code bar */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#918171] absolute left-2.5 top-3" />
                <input
                  type="text"
                  placeholder="Promo Code (try FIRSTCRAFT)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-white border border-[#DACFB9] rounded-lg text-xs font-mono uppercase text-[#1F1B17] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-[#E2D8C3] hover:bg-[#D5CAAF] text-[#1E1B18] text-xs font-medium rounded-lg cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoError && <p className="text-[11px] text-[#A63A3A] font-mono">{promoError}</p>}
            {appliedPromo && (
              <p className="text-[11px] text-[#2C6E3B] font-mono font-bold">
                ✓ Code FIRSTCRAFT applied (-15% discount)
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#635748] pt-2 border-t border-[#EAE3D4]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono tabular-nums">${rawSubtotal.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-[#2C6E3B] font-medium">
                  <span>First Harvest Discount (15%)</span>
                  <span className="font-mono tabular-nums">-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono">
                  {remainingForFreeShipping === 0 ? 'Complimentary ($0.00)' : '$5.50'}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#1E1B18] pt-1.5 border-t border-[#EAE3D4]">
                <span>Total Due</span>
                <span className="font-mono text-lg tabular-nums">
                  ${(subtotal + (remainingForFreeShipping === 0 ? 0 : 5.5)).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 bg-[#1F1B17] hover:bg-[#38332C] active:bg-[#12100E] text-white font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
