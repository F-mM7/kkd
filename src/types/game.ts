export type Direction = 'up' | 'down' | 'left' | 'right';

export interface GridPosition {
  x: number;
  z: number;
}

export type FaceId = 'top' | 'bottom' | 'front' | 'back' | 'left' | 'right';

export interface CubeOrientation {
  top: FaceId;
  bottom: FaceId;
  front: FaceId;
  back: FaceId;
  left: FaceId;
  right: FaceId;
}

export interface CubeState {
  gridPosition: GridPosition;
  orientation: CubeOrientation;
  isAnimating: boolean;
}

export interface AnimationState {
  direction: Direction;
  pivotPoint: [number, number, number];
  rotationAxis: [number, number, number];
}
