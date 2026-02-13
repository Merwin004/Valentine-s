
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LETTER_CONTENT } from '../constants';

interface Props {
  onNext: () => void;
}

const EnvelopeLetter: React.FC<Props> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 relative overflow-hidden">
      {/* Title - visible when envelope is closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl md:text-3xl text-rose-600 font-cursive mb-12 absolute top-20"
          >
            I have a message for you...
          </motion.h2>
        )}
      </AnimatePresence>
      
      {/* Envelope Container */}
      <div className="relative w-72 h-48 md:w-96 md:h-64 perspective-1000">
        {/* Envelope Body (Back) */}
        <div 
          onClick={toggleEnvelope}
          className={`absolute inset-0 bg-rose-200 rounded-b-lg shadow-xl cursor-pointer z-10 transition-all duration-1000 ease-in-out ${isOpen ? 'translate-y-48 opacity-20 scale-90 blur-sm' : ''}`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-rose-300/20 to-transparent" />
        </div>

        {/* Envelope Flap (Front) */}
        <motion.div 
          onClick={toggleEnvelope}
          initial={false}
          animate={{ rotateX: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-rose-300 origin-top z-30 cursor-pointer shadow-md"
          style={{ clipPath: 'polygon(0% 0%, 50% 50%, 100% 0%)' }}
        />
      </div>

      {/* The Letter - Centered Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Clickable Backdrop to close and put letter back */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-rose-900/5 cursor-pointer backdrop-blur-[2px]"
            />
            
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
              <motion.div
                key="letter"
                initial={{ y: 100, opacity: 0, scale: 0.7, rotate: -2 }}
                animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                exit={{ y: 100, opacity: 0, scale: 0.7, rotate: 2 }}
                transition={{ 
                  duration: 0.8, 
                  type: "spring",
                  stiffness: 70,
                  damping: 15
                }}
                className="w-full max-w-xl h-[70vh] max-h-[550px] bg-[#fffdfa] p-8 md:p-16 paper-shadow rounded-sm overflow-y-auto border-t-8 border-rose-100 flex flex-col pointer-events-auto relative scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                
                <div className="font-serif text-lg md:text-2xl text-gray-700 leading-relaxed italic text-center mb-12 pt-4">
                  {LETTER_CONTENT}
                </div>
                
                <div className="mt-auto pt-10 border-t border-rose-50 text-center flex flex-col items-center">
                  <p className="mt-4 text-xs text-rose-300 italic opacity-60">
                    (Tap outside to put it back)
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Persistent Navigation Button at the bottom of the screen */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="fixed bottom-10 inset-x-0 z-[60] flex justify-center pointer-events-none"
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="pointer-events-auto px-16 py-4 bg-rose-500 text-white rounded-full font-bold shadow-2xl hover:bg-rose-600 transform transition-all hover:scale-105 active:scale-95 flex items-center gap-3 group"
              >
                Continue Our Story
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Helper Prompt */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 flex flex-col items-center gap-2 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-rose-400 text-4xl"
            >
              💌
            </motion.div>
            <p className="text-rose-400 text-xs font-bold tracking-[0.2em] uppercase opacity-70">
              Tap the envelope
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnvelopeLetter;
