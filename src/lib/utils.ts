/**
 * Formátování délky videa na mm:ss
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formátování čísla jako procenta
 */
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

/**
 * Získání textového popisu úrovně spolehlivosti
 */
export function getConfidenceLevel(confidence: number): string {
  if (confidence >= 0.9) return 'Velmi vysoká';
  if (confidence >= 0.7) return 'Vysoká';
  if (confidence >= 0.5) return 'Střední';
  return 'Nízká';
}

/**
 * Získání barvy výsledku podle toho, zda je obsah deepfake
 */
export function getResultColor(isFake: boolean): string {
  return isFake ? '#ff3366' : '#00ff88';
}
