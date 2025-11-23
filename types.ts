
export interface BoundingBox {
  ymin: number;
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface ExtractedData {
  reference: string;
  length: string;
  quantity: string;
  boundingBox?: BoundingBox;
}

export interface ScanRecord {
  id: string;
  reference: string;
  length: string;
  quantity: string;
  originalImage: string; // Base64
  croppedImage: string; // Base64
  timestamp: number;
  // Nuevos campos para empaque
  boxSize?: string; 
  packingPhoto?: string; // Base64
}

export type AppTab = 'scan' | 'history' | 'data' | 'admin';

export interface CropCoordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}
