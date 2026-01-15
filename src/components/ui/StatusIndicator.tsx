import { motion } from 'framer-motion';

export type StatusType = 'active' | 'inactive';

interface StatusIndicatorProps {
  icon: React.ReactNode;
  label: string;
  status: StatusType;
}

export default function StatusIndicator({ icon, label, status }: StatusIndicatorProps) {
  const isActive = status === 'active';

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={isActive ? 'text-neon-green' : 'text-red-500'}>{icon}</span>
      <span className="text-gray-400">{label}</span>
      <motion.div
        className={`w-2 h-2 rounded-full ${isActive ? 'bg-neon-green' : 'bg-red-500'}`}
        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}
