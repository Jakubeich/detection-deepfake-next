interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: 'red' | 'green' | 'blue' | 'default';
}

export default function StatCard({ icon, label, value, color = 'default' }: StatCardProps) {
  const getColorClass = () => {
    switch (color) {
      case 'red':
        return 'text-neon-red';
      case 'green':
        return 'text-neon-green';
      case 'blue':
        return 'text-neon-blue';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="rounded-lg p-3" style={{ background: 'rgba(18,18,26,0.5)' }}>
      <div className="flex items-center gap-2 text-gray-400 mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <span className={`font-display font-bold ${getColorClass()}`}>{value}</span>
    </div>
  );
}
