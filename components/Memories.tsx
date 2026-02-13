
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEMORIES } from '../constants';

interface Props {
  onNext: () => void;
}

const Memories: React.FC<Props> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastMemory = currentIndex === MEMORIES.length - 1;

  const next = () => {
    if (currentIndex < MEMORIES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 overflow-hidden relative">
      <h2 className="text-2xl md:text-4xl text-rose-600 font-cursive mb-4">Memories of Us</h2>
      
      <div className="relative w-full max-w-[280px] md:max-w-sm aspect-[3/4] mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-white p-2 rounded-xl shadow-xl border-4 border-white flex flex-col overflow-hidden"
          >
            <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                src={MEMORIES[currentIndex].url} 
                alt="Memory" 
                className="w-full h-full object-contain select-none pointer-events-none"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 mb-6">
        {MEMORIES.map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? "bg-rose-500 scale-125" : "bg-rose-200"}`}
          />
        ))}
      </div>

      <div className="flex gap-4">
        {!isLastMemory ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={next}
            className="px-8 py-3 bg-rose-500 text-white rounded-full font-bold shadow-md text-base"
          >
            Next Memory
          </motion.button>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-8 py-3 bg-rose-600 text-white rounded-full font-bold shadow-lg flex items-center gap-2 animate-bounce text-base"
          >
            That's not all... →
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Memories;
