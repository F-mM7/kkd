import { Canvas } from '@react-three/fiber';
import type { AnimationState, CubeState } from '../types/game';
import { CAMERA_FOV, CAMERA_POSITION } from '../utils/constants';
import { Lighting } from './Lighting';
import { Ground } from './Ground';
import { Cube } from './Cube';

interface GameSceneProps {
  cubeState: CubeState;
  animation: AnimationState | null;
  onAnimationComplete: () => void;
}

export function GameScene({
  cubeState,
  animation,
  onAnimationComplete,
}: GameSceneProps) {
  return (
    <Canvas
      camera={{
        position: CAMERA_POSITION,
        fov: CAMERA_FOV,
        near: 0.1,
        far: 100,
      }}
      shadows
      style={{ width: '100vw', height: '100vh' }}
    >
      <color attach="background" args={['#1a1a2e']} />
      <Lighting />
      <Ground />
      <Cube
        cubeState={cubeState}
        animation={animation}
        onAnimationComplete={onAnimationComplete}
      />
    </Canvas>
  );
}
