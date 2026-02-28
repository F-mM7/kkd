import { useCallback, useRef, useState } from 'react';
import type { AnimationState, CubeState, Direction } from '../types/game';
import { GRID_CELLS } from '../utils/constants';
import {
  INITIAL_ORIENTATION,
  calculatePivot,
  getNextPosition,
  isWithinBounds,
  updateOrientation,
} from '../utils/cubemath';

export function useCubeController() {
  const [cubeState, setCubeState] = useState<CubeState>({
    gridPosition: { x: 0, z: 0 },
    orientation: INITIAL_ORIENTATION,
    isAnimating: false,
  });

  const animationRef = useRef<AnimationState | null>(null);
  const [animation, setAnimation] = useState<AnimationState | null>(null);
  const inputQueue = useRef<Direction[]>([]);
  const stateRef = useRef(cubeState);
  stateRef.current = cubeState;

  const startRoll = useCallback(
    (direction: Direction, fromPos: { x: number; z: number }) => {
      const nextPos = getNextPosition(fromPos, direction);
      if (!isWithinBounds(nextPos, GRID_CELLS)) return false;

      const { pivot, axis } = calculatePivot(fromPos, direction);
      const anim: AnimationState = {
        direction,
        pivotPoint: pivot,
        rotationAxis: axis,
      };

      animationRef.current = anim;
      setCubeState((prev) => ({ ...prev, isAnimating: true }));
      setAnimation(anim);
      return true;
    },
    [],
  );

  const roll = useCallback(
    (direction: Direction) => {
      if (stateRef.current.isAnimating) {
        inputQueue.current.push(direction);
        return;
      }
      startRoll(direction, stateRef.current.gridPosition);
    },
    [startRoll],
  );

  const onAnimationComplete = useCallback(() => {
    const anim = animationRef.current;
    if (!anim) return;

    animationRef.current = null;
    setAnimation(null);

    setCubeState((prev) => {
      const nextPos = getNextPosition(prev.gridPosition, anim.direction);
      const nextOrientation = updateOrientation(
        prev.orientation,
        anim.direction,
      );
      const newState = {
        gridPosition: nextPos,
        orientation: nextOrientation,
        isAnimating: false,
      };
      stateRef.current = newState;

      // 先行入力キューから次を処理
      const next = inputQueue.current.shift();
      if (next) {
        requestAnimationFrame(() => {
          startRoll(next, stateRef.current.gridPosition);
        });
      }

      return newState;
    });
  }, [startRoll]);

  return { cubeState, animation, roll, onAnimationComplete };
}
