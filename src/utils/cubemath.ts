import * as THREE from 'three';
import type { CubeOrientation, Direction, GridPosition } from '../types/game';

export const INITIAL_ORIENTATION: CubeOrientation = {
  top: 'top',
  bottom: 'bottom',
  front: 'front',
  back: 'back',
  left: 'left',
  right: 'right',
};

export function updateOrientation(
  current: CubeOrientation,
  direction: Direction,
): CubeOrientation {
  const { top, bottom, front, back, left, right } = current;

  switch (direction) {
    case 'up':
      return { top: front, bottom: back, front: bottom, back: top, left, right };
    case 'down':
      return { top: back, bottom: front, front: top, back: bottom, left, right };
    case 'right':
      return { top: left, bottom: right, front, back, left: bottom, right: top };
    case 'left':
      return { top: right, bottom: left, front, back, left: top, right: bottom };
  }
}

export function calculatePivot(
  gridPos: GridPosition,
  direction: Direction,
): { pivot: [number, number, number]; axis: [number, number, number] } {
  const { x, z } = gridPos;

  switch (direction) {
    case 'right':
      return { pivot: [x + 0.5, 0, z], axis: [0, 0, -1] };
    case 'left':
      return { pivot: [x - 0.5, 0, z], axis: [0, 0, 1] };
    case 'up':
      return { pivot: [x, 0, z - 0.5], axis: [1, 0, 0] };
    case 'down':
      return { pivot: [x, 0, z + 0.5], axis: [-1, 0, 0] };
  }
}

export function getNextPosition(
  pos: GridPosition,
  direction: Direction,
): GridPosition {
  switch (direction) {
    case 'up':
      return { x: pos.x, z: pos.z - 1 };
    case 'down':
      return { x: pos.x, z: pos.z + 1 };
    case 'left':
      return { x: pos.x - 1, z: pos.z };
    case 'right':
      return { x: pos.x + 1, z: pos.z };
  }
}

export function isWithinBounds(pos: GridPosition, gridCells: number): boolean {
  const half = gridCells / 2;
  return pos.x >= -half && pos.x < half && pos.z >= -half && pos.z < half;
}

export function snapQuaternion(q: THREE.Quaternion): void {
  const targets = [0, 0.5, Math.SQRT1_2, 1];
  const snap = (v: number): number => {
    const sign = Math.sign(v);
    const abs = Math.abs(v);
    let closest = 0;
    let minDist = Infinity;
    for (const t of targets) {
      const dist = Math.abs(abs - t);
      if (dist < minDist) {
        minDist = dist;
        closest = t;
      }
    }
    return sign * closest;
  };

  q.set(snap(q.x), snap(q.y), snap(q.z), snap(q.w));
  q.normalize();
}
