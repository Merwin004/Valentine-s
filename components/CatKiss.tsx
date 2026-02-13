
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onNext: () => void;
}

const CatKiss: React.FC<Props> = ({ onNext }) => {
  const [isKissing, setIsKissing] = useState(false);

  const handleKiss = () => {
    setIsKissing(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center relative overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-4xl text-rose-600 font-cursive mb-6 z-10"
      >
        {isKissing ? "Mwah! I love you so much!" : "I have a surprise for you..."}
      </motion.h2>
      
      <div className="relative w-64 h-64 md:w-96 md:h-96 mb-8 bg-white rounded-3xl shadow-xl flex items-center justify-center overflow-hidden border-8 border-rose-100 p-4 z-10">
        <AnimatePresence mode="wait">
          {!isKissing ? (
            <motion.div 
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="cursor-pointer group flex flex-col items-center w-full h-full"
              onClick={handleKiss}
            >
              <img 
                src="https://media.tenor.com/7LpS_oUo_kQAAAAi/cat-cats.gif"
                className="w-full h-full object-contain"
                alt="Waiting cats"
              />
              <div className="absolute bottom-2 text-rose-400 font-bold italic text-sm">
                Tap to see! 👆
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="kissing"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img 
                src="https://gifdb.com/images/high/cat-kiss-love-you-4hjrxklo946blasy.gif"
                className="w-full h-full object-contain"
                alt="Kissing cats"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="min-h-[64px] flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          {!isKissing ? (
            <motion.button
              key="kiss-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleKiss}
              className="px-10 py-4 bg-rose-500 text-white rounded-full font-bold shadow-lg text-lg"
            >
              Give me a kiss? 💋
            </motion.button>
          ) : (
            <motion.button
              key="next-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-10 py-4 bg-rose-600 text-white rounded-full font-bold shadow-xl text-lg animate-pulse"
            >
              One more thing... →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CatKiss;
