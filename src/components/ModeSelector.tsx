import { Image, Video } from 'lucide-react';
import { AnalysisMode } from '@/types';
import { ModeButton } from './ui';

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
