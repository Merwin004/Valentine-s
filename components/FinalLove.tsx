
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onStartMusic: () => void;
  onReset: () => void;
}

const FinalLove: React.FC<Props> = ({ onStartMusic, onReset }) => {
  const [hasPlayed, setHasPlayed] = useState(false);

  const handlePlayMusic = () => {
    onStartMusic();
    setHasPlayed(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center overflow-hidden py-4">
      {/* Animated Heart */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mb-1"
      >
        <motion.span 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-[50px] md:text-[70px] leading-none block text-rose-500"
        >
            ❤
        </motion.span>
      </motion.div>

      {/* Images Row */}
      <div className="flex items-center justify-center gap-4 mb-4">
        {/* First Image (Replaced with Dancing Baby GIF) */}
        <motion.div
          initial={{ opacity: 0, x: -20, rotate: -5 }}
          animate={{ opacity: 1, x: 0, rotate: -2 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative p-1 bg-white rounded-lg shadow-md border border-rose-100">
              <img 
                  src="https://media1.tenor.com/m/vwWKm3i9INoAAAAC/dancing-baby.gif" 
                  alt="Dancing Baby"
                  className="w-24 md:w-32 h-auto rounded-md object-cover"
              />
          </div>
        </motion.div>

        {/* Second GIF (Hue Baby) */}
        <motion.div
          initial={{ opacity: 0, x: 20, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 3 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="relative p-1 bg-white rounded-lg shadow-md border border-rose-100">
              <img 
                  src="https://media.tenor.com/HAcDdN6X0FoAAAAM/hue-baby.gif" 
                  alt="Cute Cat GIF"
                  className="w-24 md:w-32 h-auto rounded-md object-cover"
              />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="max-w-md w-full"
      >
        <h2 className="text-3xl md:text-5xl text-rose-600 font-cursive mb-2">
            I Love You
        </h2>
        <p className="text-sm md:text-base text-rose-400 font-medium mb-4">
            Thank you for being you. You're the best thing that ever happened to me.
        </p>
        
        <div className="flex flex-col items-center gap-3 w-full">
            <AnimatePresence mode="wait">
              {!hasPlayed ? (
                <motion.button
                  key="play-btn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayMusic}
                  className="w-full max-w-[240px] px-6 py-3 bg-rose-500 text-white rounded-full font-bold shadow-lg text-base flex items-center justify-center gap-2 border-2 border-rose-300 animate-pulse"
                >
                  <span className="text-xl">▶</span> Play Our Song
                </motion.button>
              ) : (
                <motion.div
                  key="playing-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-1 mb-2"
                >
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                      <motion.div
                        key={i}
                        animate={{ height: [8, 16, 8] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                        className="w-1 bg-rose-400 rounded-full"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                    Music Playing
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onReset}
                className="w-full max-w-[240px] px-6 py-3 bg-rose-100 text-rose-500 rounded-full font-bold shadow-md text-base hover:bg-rose-200 transition-colors"
            >
                Go back to our story
            </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FinalLove;
