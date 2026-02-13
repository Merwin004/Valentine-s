
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chapter } from './types';
import Greeting from './components/Greeting';
import EnvelopeLetter from './components/EnvelopeLetter';
import ScratchCards from './components/ScratchCards';
import Memories from './components/Memories';
import CatKiss from './components/CatKiss';
import FinalLove from './components/FinalLove';

const App: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState<Chapter>(Chapter.GREETING);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const nextChapter = useCallback(() => {
    setCurrentChapter((prev) => (prev < Chapter.LOVE ? prev + 1 : prev));
  }, []);

  const resetToStart = useCallback(() => {
    setCurrentChapter(Chapter.GREETING);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const startMusic = useCallback(() => {
    if (audioRef.current) {
        audioRef.current.volume = 0.5;
        // The play() call is typically successful if triggered by a user click
        audioRef.current.play().catch(e => {
          console.warn("Audio play blocked or failed. This usually requires user interaction.", e);
        });
    }
  }, []);

  return (
    <div className="h-screen w-full bg-pink-50 overflow-hidden relative selection:bg-rose-200">
      {/* Google Drive direct download link for the music */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        src="https://docs.google.com/uc?id=1uvQuKaXIBw5oZpwWgYkeCmHYY3QZiYnv&export=download" 
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentChapter}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-full w-full relative z-10"
        >
          {currentChapter === Chapter.GREETING && (
            <Greeting onNext={nextChapter} />
          )}
          {currentChapter === Chapter.ENVELOPE && (
            <EnvelopeLetter onNext={nextChapter} />
          )}
          {currentChapter === Chapter.SCRATCH && (
            <ScratchCards onNext={nextChapter} />
          )}
          {currentChapter === Chapter.MEMORIES && (
            <Memories onNext={nextChapter} />
          )}
          {currentChapter === Chapter.KISS && (
            <CatKiss onNext={nextChapter} />
          )}
          {currentChapter === Chapter.LOVE && (
            <FinalLove onStartMusic={startMusic} onReset={resetToStart} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.4, 0],
              rotate: [0, 45, -45, 0]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 20,
              ease: "linear"
            }}
            className="absolute text-rose-200 text-2xl"
          >
            ❤
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default App;
