// Typy pro API odpovědi a state

export interface AnalysisResult {
  fake_probability: number;
  real_probability: number;
  is_deepfake: boolean;
  confidence: number;
  face_detected: boolean;
  bounding_box?: number[];
}

export interface VideoResult {
  avg_fake_probability: number;
  avg_real_probability: number;
  std_deviation: number;
  is_deepfake: boolean;
  confidence: number;
  frames_analyzed: number;
  total_frames: number;
  fps: number;
  duration: number;
}

export interface FrameAnalysis {
  frame_index: number;
  timestamp: number;
  fake_probability: number;
  real_probability: number;
  is_deepfake: boolean;
  face_detected: boolean;
  bounding_box?: number[];
}

export interface KeyFrame {
  frame_index: number;
  visualization: string;
  fake_probability: number;
}

export interface Timeline {
  indices: number[];
  probabilities: number[];
  timestamps: number[];
}

export interface ImageAnalysisResponse {
  success: boolean;
  error?: string;
  result?: AnalysisResult;
  visualization?: string;
}

export interface VideoAnalysisResponse {
  success: boolean;
  error?: string;
  result?: VideoResult;
  frame_analysis?: FrameAnalysis[];
  key_frames?: KeyFrame[];
  timeline?: Timeline;
}

export interface HealthCheckResponse {
  status: string;
  model_loaded: boolean;
  device: string;
}

export type AnalysisMode = 'image' | 'video';

export type AnalysisStatus = 'idle' | 'uploading' | 'analyzing' | 'complete' | 'error';
