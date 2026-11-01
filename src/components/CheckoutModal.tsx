import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [formData, setFormData] = useState({
    name: 'Julian Wee',
    email: 'julian.wee@example.com',
    address: '142 Market Street, Suite 400',
    city: 'San Francisco',
    postalCode: '94105',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '08/28',
    cardCvc: '•••',
  });

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shipping = subtotal >= 50 ? 0 : 5.5;
  const total = subtotal + shipping;

  const [orderNumber, setOrderNumber] = useState('');

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    const randomOrderNum = `CG-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(randomOrderNum);
    setStep('confirmed');
    onOrderComplete();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] rounded-2xl max-w-2xl w-full border border-[#DECDB3] shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {step !== 'confirmed' && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-[#7A6E5D] hover:text-[#1E1B18] rounded-full hover:bg-[#EFE9DC] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Step 1: Customer & Shipping Details */}
        {step === 'details' && (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8A7966] mb-1">
              <span>Checkout</span>
              <span aria-hidden="true">·</span>
              <span>Step 1 of 2: Dispatch Address</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1E1B18] mb-4">
              Where should we send your harvest?
            </h3>

            <form onSubmit={handleSubmitDetails} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#695D4E] block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#DACFB9] rounded-lg text-xs text-[#1F1B17] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#695D4E] block mb-1">
                    Email Address (for tracking dispatch)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#DACFB9] rounded-lg text-xs text-[#1F1B17] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#695D4E] block mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#DACFB9] rounded-lg text-xs text-[#1F1B17] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#695D4E] block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#DACFB9] rounded-lg text-xs text-[#1F1B17] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#695D4E] block mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#DACFB9] rounded-lg text-xs text-[#1F1B17] focus:outline-none"
                  />
                </div>
              </div>

              {/* Order Quick Review */}
              <div className="mt-5 p-4 bg-[#F2ECE1] rounded-xl border border-[#DECDB3] text-xs">
                <div className="flex justify-between font-serif font-bold text-sm text-[#1F1B17] mb-2">
                  <span>Order Review ({items.length} item types)</span>
                  <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
                </div>
                <div className="space-y-1 text-[#695D4E] max-h-24 overflow-y-auto">
                  {items.map((i) => (
                    <div key={i.id} className="flex justify-between">
                      <span className="truncate max-w-[280px]">
                        {i.quantity}x {i.name} ({i.selectedWeight})
                      </span>
                      <span className="font-mono">${(i.price * i.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1F1B17] hover:bg-[#38332C] text-white font-medium text-xs rounded-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {step === 'payment' && (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8A7966] mb-1">
              <span>Checkout</span>
              <span aria-hidden="true">·</span>
              <span>Step 2 of 2: Secure Settlement</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1E1B18] mb-4">
              Select Payment Method
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#1E1B18] bg-white ring-1 ring-[#1E1B18]'
                      : 'border-[#DACFB9] bg-white/70'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#A86E38] mb-1.5" />
                  <div className="font-serif font-bold text-xs text-[#1F1B17]">
                    Credit / Debit Card
                  </div>
                  <div className="text-[10px] text-[#786C5B]">Encrypted 256-bit</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#1E1B18] bg-white ring-1 ring-[#1E1B18]'
                      : 'border-[#DACFB9] bg-white/70'
                  }`}
                >
                  <Truck className="w-4 h-4 text-[#427A50] mb-1.5" />
                  <div className="font-serif font-bold text-xs text-[#1F1B17]">
                    Cash On Delivery
                  </div>
                  <div className="text-[10px] text-[#786C5B]">Pay upon courier arrival</div>
                </button>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="p-4 bg-white rounded-xl border border-[#DACFB9] space-y-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#736657] block mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full p-2 border border-[#DECDB3] rounded text-xs font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#736657] block mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        className="w-full p-2 border border-[#DECDB3] rounded text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#736657] block mb-1">
                        CVC Security Code
                      </label>
                      <input
                        type="password"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full p-2 border border-[#DECDB3] rounded text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Total Due Pill */}
              <div className="p-4 bg-[#F2EDE1] rounded-xl border border-[#DECDB3] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#695D4E] block">Total Amount</span>
                  <span className="font-mono text-xl font-bold text-[#1E1B17] tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#3E654E]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Fresh Harvest Guaranteed</span>
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="py-3 px-4 bg-white border border-[#DACFB9] text-xs font-medium text-[#1F1B17] rounded-lg cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="flex-1 py-3 bg-[#1F1B17] hover:bg-[#38332C] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Authorize Order · ${total.toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Order Confirmed Receipt (PDP / E-Commerce §2.C requirement) */}
        {step === 'confirmed' && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#EAF5EC] border border-[#A7DBB2] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#2C6E3B]" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-[#2C6E3B] font-bold block mb-1">
              ROASTERY ORDER CONFIRMED
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#1F1B17] mb-2">
              We’re Preparing Your Harvest
            </h3>
            <p className="text-xs sm:text-sm text-[#615545] max-w-md mx-auto leading-relaxed">
              Thank you, {formData.name}. Your order{' '}
              <span className="font-mono font-bold text-[#1F1B17]">{orderNumber}</span> has been logged with our head roaster and tea cellar.
            </p>

            <div className="my-6 p-5 bg-[#F4EFE6] rounded-xl border border-[#DECDB3] text-left text-xs max-w-lg mx-auto space-y-2">
              <div className="flex justify-between border-b border-[#EAE3D4] pb-2 font-mono">
                <span className="text-[#847768]">Dispatch Schedule:</span>
                <span className="font-bold text-[#1F1B17]">Next Tuesday Roasting Run</span>
              </div>
              <div className="flex justify-between border-b border-[#EAE3D4] pb-2 font-mono">
                <span className="text-[#847768]">Delivery Destination:</span>
                <span className="font-bold text-[#1F1B17]">
                  {formData.address}, {formData.city}
                </span>
              </div>
              <div className="flex justify-between font-mono pt-1">
                <span className="text-[#847768]">Total Paid:</span>
                <span className="font-bold text-[#1F1B17]">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="py-3 px-8 bg-[#1F1B17] hover:bg-[#38332C] text-white text-xs font-medium rounded-lg cursor-pointer transition-colors shadow"
            >
              Return to Roastery Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
