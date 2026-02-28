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

  const roll = useCallback(
    (direction: Direction) => {
      if (cubeState.isAnimating) return;

      const nextPos = getNextPosition(cubeState.gridPosition, direction);
      if (!isWithinBounds(nextPos, GRID_CELLS)) return;

      const { pivot, axis } = calculatePivot(
        cubeState.gridPosition,
        direction,
      );

      const anim: AnimationState = {
        direction,
        pivotPoint: pivot,
        rotationAxis: axis,
      };

      animationRef.current = anim;
      setCubeState((prev) => ({ ...prev, isAnimating: true }));
      setAnimation(anim);
    },
    [cubeState.isAnimating, cubeState.gridPosition],
  );

  const onAnimationComplete = useCallback(() => {
    const anim = animationRef.current;
    if (!anim) return;

    setCubeState((prev) => {
      const nextPos = getNextPosition(prev.gridPosition, anim.direction);
      const nextOrientation = updateOrientation(prev.orientation, anim.direction);
      return {
        gridPosition: nextPos,
        orientation: nextOrientation,
        isAnimating: false,
      };
    });
    animationRef.current = null;
    setAnimation(null);
  }, []);

  return { cubeState, animation, roll, onAnimationComplete };
}
