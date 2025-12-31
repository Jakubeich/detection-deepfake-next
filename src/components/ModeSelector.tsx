import { Image, Video } from 'lucide-react';
import { AnalysisMode } from '@/types';

interface ModeSelectorProps {
  mode: AnalysisMode;
  onModeChange: (mode: AnalysisMode) => void;
  isDisabled?: boolean;
}

export default function ModeSelector({ mode, onModeChange, isDisabled }: ModeSelectorProps) {
  return (
    <div className="flex justify-center sm:justify-end">
      <div
        className="inline-flex rounded-xl p-1.5 gap-1 border"
        style={{
          background: 'rgba(18,18,26,0.6)',
          borderColor: 'rgba(0,212,255,0.18)',
        }}
      >
        <ModeButton
          icon={<Image className="w-5 h-5" />}
          label="Obrázek"
          isActive={mode === 'image'}
          onClick={() => onModeChange('image')}
          disabled={isDisabled}
        />
        <ModeButton
          icon={<Video className="w-5 h-5" />}
          label="Video"
          isActive={mode === 'video'}
          onClick={() => onModeChange('video')}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}

interface ModeButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

function ModeButton({ icon, label, isActive, onClick, disabled }: ModeButtonProps) {
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
