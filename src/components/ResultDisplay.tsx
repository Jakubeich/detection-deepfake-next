import { motion } from 'framer-motion';
import { Shield, ShieldAlert, AlertTriangle, Info, Eye } from 'lucide-react';
import { ImageAnalysisResponse } from '@/types';
import { formatPercentage, getConfidenceLevel } from '@/lib/api';

interface ResultDisplayProps {
  result: ImageAnalysisResponse;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  if (!result.success || !result.result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="cyber-card p-6"
      >
        <div className="flex items-center gap-3 text-neon-yellow">
          <AlertTriangle className="w-6 h-6" />
          <span>{result.error || 'Analýza selhala'}</span>
        </div>
        
        {result.visualization && (
          <div className="mt-4">
            <img 
              src={result.visualization} 
              alt="Visualization" 
              className="max-w-full rounded-lg"
            />
          </div>
        )}
      </motion.div>
    );
  }

  const { fake_probability, real_probability, is_deepfake, confidence } = result.result;
  const isFake = is_deepfake;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Main result card */}
      <div 
        className={`cyber-card p-6 result-pulse ${isFake ? 'result-fake' : 'result-real'}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {isFake ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <ShieldAlert className="w-12 h-12 text-neon-red" strokeWidth={1.5} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <Shield className="w-12 h-12 text-neon-green" strokeWidth={1.5} />
              </motion.div>
            )}
            
            <div>
              <h2 className={`font-display text-2xl font-bold ${isFake ? 'neon-text-red' : 'neon-text-green'}`}>
                {isFake ? 'DEEPFAKE DETEKOVÁN' : 'OBSAH JE AUTENTICKÝ'}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Spolehlivost: {getConfidenceLevel(confidence)}
              </p>
            </div>
          </div>
        </div>

        {/* Probability bars */}
        <div className="space-y-4">
          <ProbabilityBar 
            label="Deepfake" 
            value={fake_probability} 
            color="red"
            isHighlighted={isFake}
          />
          <ProbabilityBar 
            label="Autentický" 
            value={real_probability} 
            color="green"
            isHighlighted={!isFake}
          />
        </div>
      </div>

      {/* Visualization */}
      {result.visualization && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="cyber-card p-4"
        >
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <Eye className="w-4 h-4" />
            <span className="text-sm font-display">VIZUALIZACE ANALÝZY</span>
          </div>
          
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={result.visualization} 
              alt="Analysis visualization" 
              className="w-full"
            />
            
            {/* Scan line effect */}
            <div className="absolute inset-0 scan-line pointer-events-none" />
          </div>
        </motion.div>
      )}

      {/* Info card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="cyber-card p-4"
      >
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-400">
            <p>
              Model analyzoval obličej na obrázku pomocí konvoluční neuronové sítě 
              (ResNet18 s transfer learningem). Výsledek ukazuje pravděpodobnost, 
              že obsah byl manipulován pomocí technologií deepfake.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ProbabilityBarProps {
  label: string;
  value: number;
  color: 'red' | 'green' | 'blue';
  isHighlighted?: boolean;
}

function ProbabilityBar({ label, value, color, isHighlighted }: ProbabilityBarProps) {
  const getBarColor = () => {
    switch(color) {
      case 'red': return 'var(--color-neon-red)';
      case 'green': return 'var(--color-neon-green)';
      case 'blue': return 'var(--color-neon-blue)';
    }
  };

  const getTextClass = () => {
    if (!isHighlighted) return 'text-gray-400';
    switch(color) {
      case 'red': return 'text-neon-red';
      case 'green': return 'text-neon-green';
      case 'blue': return 'text-neon-blue';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-display ${getTextClass()}`}>
          {label}
        </span>
        <span className={`font-display font-bold ${getTextClass()}`}>
          {formatPercentage(value)}
        </span>
      </div>
      
      <div 
        className="h-3 rounded-full overflow-hidden"
        style={{ background: 'var(--color-cyber-dark)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full progress-glow"
          style={{ 
            background: getBarColor(),
            boxShadow: isHighlighted ? `0 0 10px ${getBarColor()}` : 'none'
          }}
        />
      </div>
    </div>
  );
}
