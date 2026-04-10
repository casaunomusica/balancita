/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [units, setUnits] = useState(2);

  const getMultiplier = (u: number): number => {
    switch (u) {
      case 2:
        return 12;
      case 3:
        return 34 / 3;
      case 4:
        return 10.75;
      case 5:
        return 10.2;
      case 6:
        return 59 / 6;
      case 7:
        return 66 / 7;
      case 8:
        return 73 / 8;
      case 9:
        return 80 / 9;
      case 10:
        return 8.6;
      case 11:
        return 92 / 11;
      case 12:
        return 98 / 12;
      case 13:
        return 8;
      default:
        // Solo por exhaustividad de TypeScript; la UI solo permite 2–13.
        return 12;
    }
  };

  const totalPrice = useMemo(() => {
    const multiplier = getMultiplier(units);
    return Math.round(units * multiplier);
  }, [units]);

  const increment = () => {
    if (units < 13) setUnits(prev => prev + 1);
  };

  const decrement = () => {
    if (units > 2) setUnits(prev => prev - 1);
  };

  const handleWhatsAppClick = () => {
    const formattedTotal = `${totalPrice}.000`;
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
              disabled={units >= 13}
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
                key={totalPrice}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.15 }}
                className={`text-7xl font-light ${theme.accent} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
              >
                {totalPrice}
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

        <div className="text-center mb-12">
          <p className={`${theme.muted} italic text-sm tracking-wide`}>
            Eficiencia por cantidad: + es -
          </p>
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
