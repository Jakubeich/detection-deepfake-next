import { motion } from 'framer-motion';
import { Scan, Brain, Cpu } from 'lucide-react';

interface LoadingAnimationProps {
  stage?: 'uploading' | 'analyzing' | 'processing';
  progress?: number;
}

export default function LoadingAnimation({ stage = 'analyzing', progress }: LoadingAnimationProps) {
  const stages = {
    uploading: {
      icon: <Scan className="w-12 h-12" />,
      title: 'NAHRÁVÁNÍ',
      subtitle: 'Přenos dat na server...',
    },
    analyzing: {
      icon: <Brain className="w-12 h-12" />,
      title: 'ANALYZUJI',
      subtitle: 'Neuronová síť zpracovává data...',
    },
    processing: {
      icon: <Cpu className="w-12 h-12" />,
      title: 'ZPRACOVÁNÍ',
      subtitle: 'Vyhodnocování výsledků...',
    },
  };

  const currentStage = stages[stage];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="cyber-card p-8 text-center"
    >
      {/* Animated icon */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '2px solid rgba(0,212,255,0.3)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute rounded-full"
          style={{ 
            top: '8px', right: '8px', bottom: '8px', left: '8px',
            border: '2px solid rgba(0,212,255,0.5)' 
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Pulsing background */}
        <motion.div
          className="absolute rounded-full"
          style={{ 
            top: '16px', right: '16px', bottom: '16px', left: '16px',
            background: 'rgba(0,212,255,0.1)' 
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-neon-blue"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentStage.icon}
        </motion.div>
      </div>

      {/* Title */}
      <motion.h3
        className="font-display text-xl font-bold neon-text-blue mb-2"
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {currentStage.title}
      </motion.h3>

      {/* Subtitle */}
      <p className="text-gray-400 text-sm mb-6">
        {currentStage.subtitle}
      </p>

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="max-w-xs mx-auto">
          <div 
            className="h-2 rounded-full overflow-hidden"
            style={{ background: 'var(--color-cyber-dark)' }}
          >
            <motion.div
              className="h-full bg-neon-blue progress-glow rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">{progress}%</p>
        </div>
      )}

      {/* Activity indicators */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <ActivityIndicator label="CPU" />
        <ActivityIndicator label="GPU" />
        <ActivityIndicator label="RAM" />
      </div>

      {/* Scan line effect */}
      <div 
        className="relative h-1 mt-6 rounded overflow-hidden"
        style={{ background: 'var(--color-cyber-dark)' }}
      >
        <motion.div
          className="absolute inset-y-0 w-1/4"
          style={{ background: 'linear-gradient(to right, transparent, var(--color-neon-blue), transparent)' }}
          animate={{ x: ['-100%', '400%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}

function ActivityIndicator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1 bg-neon-blue rounded-full"
            animate={{ height: ['8px', '16px', '8px'] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </motion.div>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}
