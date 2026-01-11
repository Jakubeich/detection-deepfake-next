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
      subtitle: 'Ensemble modelů zpracovává data...',
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="cyber-card p-8 text-center"
    >
      {/* Animated icon */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        {/* Simplified loading indicator */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '2px solid rgba(0,212,255,0.3)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-neon-blue">
          {currentStage.icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-bold text-neon-blue mb-2">
        {currentStage.title}
      </h3>

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
              className="h-full bg-neon-blue rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">{progress}%</p>
        </div>
      )}
    </motion.div>
  );
}
