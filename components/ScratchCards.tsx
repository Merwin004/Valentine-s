
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SCRATCH_REVEALS } from '../constants';

interface Props {
  onNext: () => void;
}

const ScratchCard: React.FC<{ imageUrl: string; onComplete: () => void }> = ({ imageUrl, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const [revealedPercent, setRevealedPercent] = useState(0);

  useEffect(() => {
    const initCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#a1a1aa');
      gradient.addColorStop(0.2, '#f4f4f5');
      gradient.addColorStop(0.5, '#d4d4d8');
      gradient.addColorStop(0.8, '#71717a');
      gradient.addColorStop(1, '#a1a1aa');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for(let i = 0; i < 1000; i++) {
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#3f3f46';
      ctx.font = 'bold 16px "Quicksand", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SCRATCH TO REVEAL', canvas.width / 2, canvas.height / 2);
    };

    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const { x, y } = getPos(e);
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 0; i < pixels.length; i += 80) {
      if (pixels[i + 3] === 0) transparent++;
    }
    const percent = (transparent / (pixels.length / 80)) * 100;
    setRevealedPercent(percent);
    if (percent > 40) onComplete();
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    scratch(e);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden border-4 border-white"
    >
      <img 
        src={imageUrl} 
        alt="Revealed surprise" 
        className="w-full h-full object-contain p-2 select-none pointer-events-none"
      />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={() => isDrawing.current = false}
        onMouseMove={scratch}
        onMouseLeave={() => isDrawing.current = false}
        onTouchStart={startDrawing}
        onTouchEnd={() => isDrawing.current = false}
        onTouchMove={scratch}
        className="absolute inset-0 cursor-crosshair touch-none z-10 transition-opacity"
        style={{ opacity: revealedPercent > 90 ? 0 : 1 }}
      />
    </div>
  );
};

const ScratchCards: React.FC<Props> = ({ onNext }) => {
  const [completed, setCompleted] = useState([false, false]);

  const handleComplete = (index: number) => {
    setCompleted(prev => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const allCompleted = completed.every(c => c);

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center max-w-lg mx-auto py-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 md:mb-8"
      >
        <h2 className="text-2xl md:text-4xl text-rose-600 font-cursive mb-2">
          What I think about you...
        </h2>
        <div className="w-16 h-1 bg-rose-200 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full mb-6 max-w-[400px]">
        {SCRATCH_REVEALS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            <ScratchCard 
              imageUrl={item.imageUrl} 
              onComplete={() => handleComplete(i)} 
            />
          </motion.div>
        ))}
      </div>
      
      <div className="min-h-[80px] flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {allCompleted ? (
            <motion.button
              key="next-btn"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-10 py-4 bg-rose-500 text-white rounded-full font-bold shadow-xl text-lg flex items-center gap-2"
            >
              Continue Our Journey ❤
            </motion.button>
          ) : (
            <p className="text-rose-400 font-bold text-sm tracking-wide uppercase opacity-80">
              Scratch both to proceed
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScratchCards;
