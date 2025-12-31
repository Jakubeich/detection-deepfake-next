import { Shield, Cpu, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      className="relative pt-10 pb-8 px-4 sm:px-6"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(18,18,26,0.75), transparent)' }}
      />

      <div className="relative max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(0,212,255,0.18)', filter: 'blur(14px)' }}
              />
              <Shield className="w-12 h-12 text-neon-blue relative z-10" strokeWidth={1.5} />
            </motion.div>

            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wider">
                <span className="text-white">DEEP</span>
                <span className="neon-text-blue">FAKE</span>
                <span className="text-gray-400 ml-2">DETECTOR</span>
              </h1>
              <p className="text-xs text-gray-500 tracking-widest uppercase mt-1">
                AI-Powered Media Analysis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <StatusIndicator icon={<Cpu className="w-4 h-4" />} label="Model" status="active" />
            <StatusIndicator icon={<Activity className="w-4 h-4" />} label="System" status="active" />
          </div>
        </div>

        <motion.div
          className="mt-7 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.45), transparent)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        />
      </div>
    </motion.header>
  );
}

interface StatusIndicatorProps {
  icon: React.ReactNode;
  label: string;
  status: 'active' | 'inactive' | 'loading';
}

function StatusIndicator({ icon, label, status }: StatusIndicatorProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'text-neon-green';
      case 'loading':
        return 'text-neon-yellow';
      default:
        return 'text-gray-500';
    }
  };

  const getBgColor = () => {
    switch (status) {
      case 'active':
        return 'bg-neon-green';
      case 'loading':
        return 'bg-neon-yellow';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={getStatusColor()}>{icon}</span>
      <span className="text-gray-400">{label}</span>
      <motion.div
        className={`w-2 h-2 rounded-full ${getBgColor()}`}
        animate={status === 'active' ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}
