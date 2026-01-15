import { motion } from 'framer-motion';
import { formatPercentage } from '@/lib/utils';

interface ProbabilityBarProps {
  label: string;
  value: number;
  color: 'red' | 'green' | 'blue';
  isHighlighted?: boolean;
}

export default function ProbabilityBar({ label, value, color, isHighlighted }: ProbabilityBarProps) {
  const getBarColor = () => {
    switch (color) {
      case 'red':
        return 'var(--color-neon-red)';
      case 'green':
        return 'var(--color-neon-green)';
      case 'blue':
        return 'var(--color-neon-blue)';
    }
  };

  const getTextClass = () => {
    if (!isHighlighted) return 'text-gray-400';
    switch (color) {
      case 'red':
        return 'text-neon-red';
      case 'green':
        return 'text-neon-green';
      case 'blue':
        return 'text-neon-blue';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-display ${getTextClass()}`}>{label}</span>
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
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: getBarColor(),
            boxShadow: isHighlighted ? `0 0 6px ${getBarColor()}` : 'none',
          }}
        />
      </div>
    </div>
  );
}
