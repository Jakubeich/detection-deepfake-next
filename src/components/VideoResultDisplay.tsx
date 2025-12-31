import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, ShieldAlert, AlertTriangle, Film, Clock, 
  BarChart3, Eye, ChevronLeft, ChevronRight, Info 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { VideoAnalysisResponse } from '@/types';
import { formatPercentage, formatDuration, getConfidenceLevel } from '@/lib/api';

interface VideoResultDisplayProps {
  result: VideoAnalysisResponse;
}

export default function VideoResultDisplay({ result }: VideoResultDisplayProps) {
  const [currentKeyFrame, setCurrentKeyFrame] = useState(0);

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
      </motion.div>
    );
  }

  const { 
    avg_fake_probability, 
    avg_real_probability, 
    std_deviation,
    is_deepfake, 
    confidence,
    frames_analyzed,
    total_frames,
    fps,
    duration
  } = result.result;

  const isFake = is_deepfake;
  const keyFrames = result.key_frames || [];
  const timeline = result.timeline;

  const chartData = timeline ? timeline.indices.map((idx, i) => ({
    frame: idx,
    time: timeline.timestamps[i],
    probability: timeline.probabilities[i],
  })) : [];

  const nextKeyFrame = () => {
    setCurrentKeyFrame((prev) => (prev + 1) % keyFrames.length);
  };

  const prevKeyFrame = () => {
    setCurrentKeyFrame((prev) => (prev - 1 + keyFrames.length) % keyFrames.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Main result card */}
      <div className={`cyber-card p-6 result-pulse ${isFake ? 'result-fake' : 'result-real'}`}>
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
                {isFake ? 'DEEPFAKE DETEKOVÁN' : 'VIDEO JE AUTENTICKÉ'}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Spolehlivost: {getConfidenceLevel(confidence)}
              </p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            icon={<BarChart3 className="w-4 h-4" />}
            label="Deepfake"
            value={formatPercentage(avg_fake_probability)}
            color={isFake ? 'red' : 'default'}
          />
          <StatCard 
            icon={<Film className="w-4 h-4" />}
            label="Framů"
            value={`${frames_analyzed}/${total_frames}`}
            color="blue"
          />
          <StatCard 
            icon={<Clock className="w-4 h-4" />}
            label="Délka"
            value={formatDuration(duration)}
            color="blue"
          />
          <StatCard 
            icon={<BarChart3 className="w-4 h-4" />}
            label="Odchylka"
            value={`±${formatPercentage(std_deviation)}`}
            color="default"
          />
        </div>

        {/* Probability bars */}
        <div className="space-y-4">
          <ProbabilityBar 
            label="Průměrná pravděpodobnost Deepfake" 
            value={avg_fake_probability} 
            color="red"
            isHighlighted={isFake}
          />
          <ProbabilityBar 
            label="Průměrná pravděpodobnost Autenticity" 
            value={avg_real_probability} 
            color="green"
            isHighlighted={!isFake}
          />
        </div>
      </div>

      {/* Timeline chart */}
      {chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="cyber-card p-6"
        >
          <div className="flex items-center gap-2 mb-6 text-gray-400">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-display">ČASOVÁ OSA ANALÝZY</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="probabilityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isFake ? '#ff3366' : '#00ff88'} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={isFake ? '#ff3366' : '#00ff88'} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="frame" 
                  stroke="#4a4a5a"
                  tick={{ fill: '#8a8a9a', fontSize: 12 }}
                  axisLine={{ stroke: '#2a2a3a' }}
                />
                <YAxis 
                  domain={[0, 1]}
                  stroke="#4a4a5a"
                  tick={{ fill: '#8a8a9a', fontSize: 12 }}
                  axisLine={{ stroke: '#2a2a3a' }}
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#12121a', 
                    border: '1px solid #00d4ff',
                    borderRadius: '8px',
                    color: '#e0e0e0'
                  }}
                  formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Pravděpodobnost']}
                  labelFormatter={(label) => `Frame ${label}`}
                />
                <ReferenceLine 
                  y={0.5} 
                  stroke="#ffd60a" 
                  strokeDasharray="5 5" 
                />
                <Area
                  type="monotone"
                  dataKey="probability"
                  stroke={isFake ? '#ff3366' : '#00ff88'}
                  strokeWidth={2}
                  fill="url(#probabilityGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-neon-yellow" />
              Práh detekce (50%)
            </span>
            <span className="flex items-center gap-1">
              <div className={`w-3 h-0.5 ${isFake ? 'bg-neon-red' : 'bg-neon-green'}`} />
              Pravděpodobnost deepfake
            </span>
          </div>
        </motion.div>
      )}

      {/* Key frames gallery */}
      {keyFrames.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="cyber-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-display">KLÍČOVÉ SNÍMKY</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={prevKeyFrame}
                className="p-2 hover:bg-gray-700 rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
              <span className="text-sm text-gray-400 font-display">
                {currentKeyFrame + 1} / {keyFrames.length}
              </span>
              <button
                onClick={nextKeyFrame}
                className="p-2 hover:bg-gray-700 rounded transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentKeyFrame}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={keyFrames[currentKeyFrame].visualization}
                    alt={`Frame ${keyFrames[currentKeyFrame].frame_index}`}
                    className="w-full"
                  />
                  
                  {/* Overlay info */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9), transparent)' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        Frame #{keyFrames[currentKeyFrame].frame_index}
                      </span>
                      <span className={`font-display font-bold ${
                        keyFrames[currentKeyFrame].fake_probability >= 0.5 
                          ? 'text-neon-red' 
                          : 'text-neon-green'
                      }`}>
                        {formatPercentage(keyFrames[currentKeyFrame].fake_probability)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {keyFrames.map((frame, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentKeyFrame(idx)}
                  className="flex-shrink-0 w-16 h-12 rounded overflow-hidden transition-all"
                  style={{
                    border: idx === currentKeyFrame 
                      ? '2px solid var(--color-neon-blue)' 
                      : '2px solid transparent',
                    opacity: idx === currentKeyFrame ? 1 : 0.5
                  }}
                >
                  <img 
                    src={frame.visualization} 
                    alt={`Thumbnail ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
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
              Video bylo analyzováno po jednotlivých snímcích. Model detekoval a analyzoval 
              obličeje v {frames_analyzed} snímcích z celkových {total_frames}. Výsledná 
              pravděpodobnost deepfake je průměrem všech analyzovaných snímků. 
              Směrodatná odchylka {formatPercentage(std_deviation)} indikuje 
              {std_deviation < 0.1 ? ' konzistentní ' : std_deviation < 0.2 ? ' mírně variabilní ' : ' vysoce variabilní '}
              výsledky napříč snímky.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: 'red' | 'green' | 'blue' | 'default';
}

function StatCard({ icon, label, value, color = 'default' }: StatCardProps) {
  const getColorClass = () => {
    switch(color) {
      case 'red': return 'text-neon-red';
      case 'green': return 'text-neon-green';
      case 'blue': return 'text-neon-blue';
      default: return 'text-white';
    }
  };

  return (
    <div 
      className="rounded-lg p-3"
      style={{ background: 'rgba(18,18,26,0.5)' }}
    >
      <div className="flex items-center gap-2 text-gray-400 mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <span className={`font-display font-bold ${getColorClass()}`}>
        {value}
      </span>
    </div>
  );
}

interface ProbabilityBarProps {
  label: string;
  value: number;
  color: 'red' | 'green';
  isHighlighted?: boolean;
}

function ProbabilityBar({ label, value, color, isHighlighted }: ProbabilityBarProps) {
  const getBarColor = () => {
    return color === 'red' ? 'var(--color-neon-red)' : 'var(--color-neon-green)';
  };

  const getTextClass = () => {
    if (!isHighlighted) return 'text-gray-400';
    return color === 'red' ? 'text-neon-red' : 'text-neon-green';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm ${getTextClass()}`}>
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
