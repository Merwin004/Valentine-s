
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onNext: () => void;
}

const Greeting: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="max-w-md w-full"
      >
        <h1 className="text-4xl md:text-7xl text-rose-600 font-cursive mb-4 md:mb-6">
          Happy Valentine's Day, Love
        </h1>
        <p className="text-base md:text-xl text-rose-400 font-medium mb-8 md:mb-12">
          Today is all about you. I've prepared something special to show you how much you mean to me.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold shadow-lg shadow-rose-200 transition-colors text-lg"
        >
          Begin the Journey
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Greeting;
