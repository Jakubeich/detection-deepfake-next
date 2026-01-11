import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, Video, X, FileCheck, AlertCircle } from 'lucide-react';
import { AnalysisMode } from '@/types';

interface FileUploadProps {
  mode: AnalysisMode;
  onFileSelect: (file: File) => void;
  isDisabled?: boolean;
}

export default function FileUpload({ mode, onFileSelect, isDisabled }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptString =
    mode === 'image' ? '.png,.jpg,.jpeg,.webp,.gif' : '.mp4,.avi,.mov,.webm,.mkv';

  const maxSize = mode === 'image' ? 10 * 1024 * 1024 : 100 * 1024 * 1024;

  const validateFile = useCallback(
    (file: File): boolean => {
      setError(null);
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

      if (mode === 'image') {
        const validImageExt = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
        if (!validImageExt.includes(fileExtension)) {
          setError(`Nepodporovaný formát. Povolené: ${validImageExt.join(', ')}`);
          return false;
        }
      }

      if (mode === 'video') {
        const validVideoExt = ['mp4', 'avi', 'mov', 'webm', 'mkv'];
        if (!validVideoExt.includes(fileExtension)) {
          setError(`Nepodporovaný formát. Povolené: ${validVideoExt.join(', ')}`);
          return false;
        }
      }

      if (file.size > maxSize) {
        const maxMB = maxSize / (1024 * 1024);
        setError(`Soubor je příliš velký. Maximum: ${maxMB}MB`);
        return false;
      }

      return true;
    },
    [mode, maxSize]
  );

  const handleFile = useCallback(
    (file: File) => {
      if (!validateFile(file)) return;

      setSelectedFile(file);

      if (mode === 'image') {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }

      onFileSelect(file);
    },
    [mode, validateFile, onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptString}
        onChange={handleInputChange}
        className="hidden"
        disabled={isDisabled}
      />

      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`
              dropzone relative rounded-xl p-8 sm:p-12
              text-center cursor-pointer
              min-h-[260px] flex items-center justify-center
              ${isDragging ? 'active' : ''}
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={isDisabled ? undefined : handleClick}
          >
            <div className="relative z-10 w-full max-w-xl mx-auto">
              <div className="mb-6">
                {mode === 'image' ? (
                  <Image className="w-16 h-16 mx-auto text-neon-blue opacity-70" strokeWidth={1} />
                ) : (
                  <Video className="w-16 h-16 mx-auto text-neon-blue opacity-70" strokeWidth={1} />
                )}
              </div>

              <h3 className="font-display text-lg sm:text-xl mb-2 text-white tracking-wide">
                {isDragging ? 'Pusťte soubor zde' : `Nahrajte ${mode === 'image' ? 'obrázek' : 'video'}`}
              </h3>

              <p className="text-gray-400 text-sm mb-5">
                Přetáhněte soubor sem nebo klikněte pro výběr
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Upload className="w-3 h-3" />
                  Max {maxSize / (1024 * 1024)}MB
                </span>
                <span className="hidden sm:inline">•</span>
                <span>{mode === 'image' ? 'PNG, JPG, WebP, GIF' : 'MP4, AVI, MOV, WebM, MKV'}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="cyber-card p-4 sm:p-5"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0"
                style={{ background: 'var(--color-cyber-dark)' }}
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video className="w-8 h-8 text-neon-blue opacity-60" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white font-medium truncate">{selectedFile.name}</p>
                    <p className="text-gray-400 text-sm">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>

                  {!isDisabled && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFile();
                      }}
                      className="p-2 rounded-lg transition-colors hover:bg-gray-700/40"
                      aria-label="Odebrat soubor"
                    >
                      <X className="w-4 h-4 text-gray-400 hover:text-white" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <FileCheck className="w-4 h-4 text-neon-green" />
                  <span className="text-neon-green text-sm">Připraveno k analýze</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 flex items-center gap-2 text-neon-red text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
