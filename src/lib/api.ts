import { ImageAnalysisResponse, VideoAnalysisResponse, HealthCheckResponse } from '@/types';

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

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
