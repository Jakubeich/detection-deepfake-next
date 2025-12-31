import { ImageAnalysisResponse, VideoAnalysisResponse, HealthCheckResponse } from '@/types';

const API_BASE = 'http://127.0.0.1:5000/api';

export async function checkHealth(): Promise<HealthCheckResponse> {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) {
    throw new Error('Backend není dostupný');
  }
  return response.json();
}

export async function analyzeImage(file: File): Promise<ImageAnalysisResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/analyze/image`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Chyba při analýze obrázku');
  }

  return response.json();
}

export async function analyzeVideo(
  file: File,
  everyN: number = 10,
  maxFrames: number = 30
): Promise<VideoAnalysisResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('every_n', everyN.toString());
  formData.append('max_frames', maxFrames.toString());

  const response = await fetch(`${API_BASE}/analyze/video`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Chyba při analýze videa');
  }

  return response.json();
}

export async function analyzeFrame(imageBase64: string): Promise<ImageAnalysisResponse> {
  const response = await fetch(`${API_BASE}/analyze/frame`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: imageBase64 }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Chyba při analýze framu');
  }

  return response.json();
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function getConfidenceLevel(confidence: number): string {
  if (confidence >= 0.9) return 'Velmi vysoká';
  if (confidence >= 0.7) return 'Vysoká';
  if (confidence >= 0.5) return 'Střední';
  return 'Nízká';
}

export function getResultColor(isFake: boolean): string {
  return isFake ? '#ff3366' : '#00ff88';
}
