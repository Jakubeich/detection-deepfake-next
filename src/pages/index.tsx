import { useState, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, RotateCcw, Info } from 'lucide-react';

import Header from '@/components/Header';
import ModeSelector from '@/components/ModeSelector';
import FileUpload from '@/components/FileUpload';
import LoadingAnimation from '@/components/LoadingAnimation';
import ResultDisplay from '@/components/ResultDisplay';
import VideoResultDisplay from '@/components/VideoResultDisplay';

import { analyzeImage, analyzeVideo } from '@/lib/api';
import {
  AnalysisMode,
  AnalysisStatus,
  ImageAnalysisResponse,
  VideoAnalysisResponse
} from '@/types';

export default function Home() {
  const [mode, setMode] = useState<AnalysisMode>('image');
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageResult, setImageResult] = useState<ImageAnalysisResponse | null>(null);
  const [videoResult, setVideoResult] = useState<VideoAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setError(null);
    setImageResult(null);
    setVideoResult(null);
  }, []);

  const handleModeChange = useCallback((newMode: AnalysisMode) => {
    setMode(newMode);
    setSelectedFile(null);
    setError(null);
    setImageResult(null);
    setVideoResult(null);
    setStatus('idle');
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) return;

    setStatus('uploading');
    setError(null);

    try {
      setStatus('analyzing');

      if (mode === 'image') {
        const result = await analyzeImage(selectedFile);
        setImageResult(result);
      } else {
        const result = await analyzeVideo(selectedFile, 10, 30);
        setVideoResult(result);
      }

      setStatus('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Došlo k neočekávané chybě');
      setStatus('error');
    }
  }, [selectedFile, mode]);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setImageResult(null);
    setVideoResult(null);
    setError(null);
    setStatus('idle');
  }, []);

  const isAnalyzing = status === 'uploading' || status === 'analyzing';
  const hasResult = status === 'complete' && (imageResult || videoResult);

  return (
    <>
      <Head>
        <title>DeepFake Detector | AI-Powered Media Analysis</title>
      </Head>

      <main className="min-h-screen">
        <Header />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="mt-8 space-y-10">
            {/* Mode selector card */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="cyber-card p-4 sm:p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="font-display text-base sm:text-lg text-white tracking-wide">
                    Režim analýzy
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Vyberte typ souboru a nahrajte médium.
                  </p>
                </div>

                <ModeSelector
                  mode={mode}
                  onModeChange={handleModeChange}
                  isDisabled={isAnalyzing}
                />
              </div>
            </motion.section>

            {/* Main content */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="space-y-6"
            >
              <AnimatePresence mode="wait">
                {/* File upload */}
                {!hasResult && !isAnalyzing && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="cyber-card p-5 sm:p-6"
                  >
                    <FileUpload
                      mode={mode}
                      onFileSelect={handleFileSelect}
                      isDisabled={isAnalyzing}
                    />
                  </motion.div>
                )}

                {/* Loading */}
                {isAnalyzing && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <LoadingAnimation
                      stage={status === 'uploading' ? 'uploading' : 'analyzing'}
                    />
                  </motion.div>
                )}

                {/* Results */}
                {hasResult && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {mode === 'image' && imageResult && (
                      <ResultDisplay result={imageResult} />
                    )}
                    {mode === 'video' && videoResult && (
                      <VideoResultDisplay result={videoResult} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="cyber-card p-4 border-neon-red"
                  >
                    <p className="text-neon-red">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col sm:flex-row justify-center gap-3"
              >
                {!hasResult && !isAnalyzing && selectedFile && (
                  <button
                    onClick={handleAnalyze}
                    className="cyber-button flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Analyzovat
                  </button>
                )}

                {(hasResult || error) && (
                  <button
                    onClick={handleReset}
                    className="cyber-button flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Nová analýza
                  </button>
                )}
              </motion.div>
            </motion.section>

            {/* Info */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="cyber-card p-6 sm:p-7"
            >
              <div className="flex items-center gap-2 mb-5">
                <Info className="w-5 h-5 text-neon-blue" />
                <h3 className="font-display text-lg text-white tracking-wide">
                  O aplikaci
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-400 leading-relaxed">
                <div className="space-y-2">
                  <h4 className="text-neon-blue font-display">Technologie</h4>
                  <p>
                    Model využívá konvoluční neuronovou síť ResNet18 s transfer
                    learningem pro detekci manipulovaných obličejů.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-neon-blue font-display">Jak to funguje</h4>
                  <p>
                    Systém detekuje obličeje pomocí MTCNN, extrahuje features a
                    klasifikuje je jako reálné nebo deepfake.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-neon-blue font-display">Limitace</h4>
                  <p>
                    Model je trénován na omezeném datasetu. Přesnost závisí na
                    kvalitě vstupu a typu deepfake technologie.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-center text-gray-500 text-sm"
            >
              <p>Semestrální projekt • Umělá inteligence • 2024</p>
            </motion.footer>
          </div>
        </div>
      </main>
    </>
  );
}
