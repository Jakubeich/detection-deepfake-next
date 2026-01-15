import { Shield, Cpu, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { StatusIndicator, StatusType } from './ui';

export interface HealthStatus {
  model: StatusType;
  system: StatusType;
}

interface HeaderProps {
  health?: HealthStatus;
}

export default function Header({ health }: HeaderProps) {
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
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(0,212,255,0.18)', filter: 'blur(14px)' }}
              />
              <Shield className="w-12 h-12 text-neon-blue relative z-10" strokeWidth={1.5} />
            </div>

            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wider">
                <span className="text-white">DEEP</span>
                <span className="neon-text-blue">FAKE</span>
                <span className="text-gray-400 ml-2">DETECTOR</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <StatusIndicator
              icon={<Cpu className="w-4 h-4" />}
              label="Model"
              status={health?.model ?? 'inactive'}
            />
            <StatusIndicator
              icon={<Activity className="w-4 h-4" />}
              label="System"
              status={health?.system ?? 'inactive'}
            />
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
