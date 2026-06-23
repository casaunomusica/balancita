/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PRICING: Record<number, { unitPrice: number; totalPrice: number }> = {
  2: { unitPrice: 15, totalPrice: 30 },
  3: { unitPrice: 14, totalPrice: 42 },
  4: { unitPrice: 13, totalPrice: 52 },
  5: { unitPrice: 12, totalPrice: 60 },
  6: { unitPrice: 11.75, totalPrice: 70.5 },
  7: { unitPrice: 11.5, totalPrice: 80.5 },
  8: { unitPrice: 11, totalPrice: 88 },
  9: { unitPrice: 10.5, totalPrice: 94.5 },
  10: { unitPrice: 10, totalPrice: 100 },
};

const formatTotalMil = (total: number): string => {
  if (total % 1 === 0) {
    return `${total}.000`;
  }
  const [integer, decimal] = total.toFixed(2).split('.');
  return `${integer}.${decimal.padEnd(3, '0')}`;
};

export default function App() {
  const [units, setUnits] = useState(2);

  const totalPrice = PRICING[units].totalPrice;
  const formattedTotal = formatTotalMil(totalPrice);

  const increment = () => {
    if (units < 10) setUnits(prev => prev + 1);
  };

  const decrement = () => {
    if (units > 2) setUnits(prev => prev - 1);
  };

  const handleWhatsAppClick = () => {
    const message = `*Unidades:* ${units}\n*Total:* ${formattedTotal}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
  };

  // Paleta fija (sin variación día/noche)
  const theme = {
    bg: 'balancita-bg bg-[#2F4F4F]',
    text: 'text-[#F0E6D2]',
    card: 'balancita-card bg-[#2F4F4F] border-[#F0E6D2]/10',
    accent: 'text-[#B28742]',
    muted: 'text-[#F0E6D2]',
    divider: 'bg-[#F0E6D2]',
    hover: 'hover:bg-[#F0E6D2]/10',
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-serif flex flex-col items-center justify-center p-6`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md ${theme.card} rounded-[2rem] shadow-xl py-14 px-8 border`}
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 mb-12 relative">
          {/* Vertical Divider */}
          <div className={`absolute left-1/2 top-0 bottom-0 w-px ${theme.divider} -translate-x-1/2 pointer-events-none`} />

          {/* Fila 1 – Contador (izq): flecha ↑, número centrado, flecha ↓ */}
          <div className="flex flex-col items-center min-h-[220px]">
            <button
              onClick={increment}
              disabled={units >= 10}
              className={`p-4 -m-2 rounded-full ${theme.hover} transition-colors disabled:opacity-20 flex items-center justify-center shrink-0`}
              aria-label="Aumentar unidades"
            >
              <ChevronUp size={32} strokeWidth={1.5} />
            </button>
            <div className="flex-1 w-full flex items-center justify-center relative min-h-[5rem]">
              <AnimatePresence initial={false}>
                <motion.span
                  key={units}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="text-6xl font-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  {units}
                </motion.span>
              </AnimatePresence>
            </div>
            <button
              onClick={decrement}
              disabled={units <= 2}
              className={`p-4 -m-2 rounded-full ${theme.hover} transition-colors disabled:opacity-20 flex items-center justify-center shrink-0`}
              aria-label="Disminuir unidades"
            >
              <ChevronDown size={32} strokeWidth={1.5} />
            </button>
          </div>

          {/* Fila 1 – Precio (der) */}
          <div className="flex flex-col items-center justify-center min-h-[220px] relative">
            <AnimatePresence initial={false}>
              <motion.div
                key={formattedTotal}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.15 }}
                className={`text-5xl font-light ${theme.accent} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap`}
              >
                {formattedTotal}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Fila 2 – Etiquetas a la misma altura */}
          <div className="flex items-end justify-center pt-1">
            <span className={`text-[10px] uppercase tracking-widest ${theme.muted} font-sans`}>Unidades</span>
          </div>
          <div className="flex items-end justify-center pt-1">
            <span className={`text-[10px] uppercase tracking-widest ${theme.muted} font-sans`}>Valor Total</span>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppClick}
            className="w-16 h-16 bg-[#4A657A] text-[#F0E6D2] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-black/30"
            aria-label="Enviar por WhatsApp"
          >
            <MessageCircle size={32} strokeWidth={1.2} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
