interface ModeButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function ModeButton({ icon, label, isActive, onClick, disabled }: ModeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-5 sm:px-6 py-2.5 rounded-lg font-display text-sm tracking-wider
        transition-all duration-300 flex items-center gap-2
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isActive ? 'text-neon-blue' : 'text-gray-400 hover:text-gray-200'}
      `}
      style={
        isActive
          ? {
              background: 'rgba(42,42,58,0.85)',
              border: '1px solid rgba(0,212,255,0.55)',
              boxShadow: '0 0 14px rgba(0,212,255,0.22)',
            }
          : {
              background: 'transparent',
              border: '1px solid transparent',
            }
      }
      aria-pressed={isActive}
    >
      <span className="relative z-10">{icon}</span>
      <span className="relative z-10">{label}</span>
    </button>
  );
}
