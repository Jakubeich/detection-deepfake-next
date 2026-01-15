import { motion } from 'framer-motion';
import { Shield, ShieldAlert, AlertTriangle, Info, Eye } from 'lucide-react';
import { ImageAnalysisResponse } from '@/types';
import { getConfidenceLevel } from '@/lib/utils';
import { ProbabilityBar } from './ui';

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Main result card */}
      <div 
        className={`cyber-card p-6 ${isFake ? 'result-fake' : 'result-real'}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {isFake ? (
              <ShieldAlert className="w-12 h-12 text-neon-red" strokeWidth={1.5} />
            ) : (
              <Shield className="w-12 h-12 text-neon-green" strokeWidth={1.5} />
            )}
            
            <div>
              <h2 className={`font-display text-2xl font-bold ${isFake ? 'text-neon-red' : 'text-neon-green'}`}>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
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
              Obličej byl analyzován pomocí předtrénovaných modelů z Hugging Face. 
              Systém používá ensemble více modelů pro vyšší přesnost. 
              Výsledek ukazuje pravděpodobnost, že obsah byl manipulován pomocí technologií deepfake.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
