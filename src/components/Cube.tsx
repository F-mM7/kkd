import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { AnimationState, CubeState } from '../types/game';
import { CUBE_SIZE, ROLL_DURATION } from '../utils/constants';
import { snapQuaternion } from '../utils/cubemath';

const FACE_COLORS = [
  '#ffffff', // +X right
  '#ffff44', // -X left
  '#ff4444', // +Y top
  '#ff8844', // -Y bottom
  '#44ff44', // +Z front
  '#4444ff', // -Z back
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface CubeProps {
  cubeState: CubeState;
  animation: AnimationState | null;
  onAnimationComplete: () => void;
}

export function Cube({ cubeState, animation, onAnimationComplete }: CubeProps) {
  const pivotRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const accumulatedQuat = useRef(new THREE.Quaternion());
  const progressRef = useRef(0);

  useFrame((_, delta) => {
    if (!animation || !pivotRef.current || !meshRef.current) return;

    progressRef.current += delta / ROLL_DURATION;

    if (progressRef.current >= 1) {
      // アニメーション完了: ワールド変換を取得して累積
      meshRef.current.updateWorldMatrix(true, false);
      const worldQuat = new THREE.Quaternion();
      meshRef.current.getWorldQuaternion(worldQuat);
      snapQuaternion(worldQuat);
      accumulatedQuat.current.copy(worldQuat);

      progressRef.current = 0;
      onAnimationComplete();
      return;
    }

    const t = easeOutCubic(progressRef.current);
    const angle = t * (-Math.PI / 2);
    const axis = new THREE.Vector3(...animation.rotationAxis);
    pivotRef.current.quaternion.identity();
    pivotRef.current.rotateOnAxis(axis, angle);
  });

  const staticPosition: [number, number, number] = [
    cubeState.gridPosition.x,
    0.5,
    cubeState.gridPosition.z,
  ];

  const cubeMesh = (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      {FACE_COLORS.map((color, i) => (
        <meshStandardMaterial key={i} attach={`material-${i}`} color={color} />
      ))}
    </mesh>
  );

  if (animation) {
    const offset: [number, number, number] = [
      staticPosition[0] - animation.pivotPoint[0],
      staticPosition[1] - animation.pivotPoint[1],
      staticPosition[2] - animation.pivotPoint[2],
    ];

    return (
      <group position={animation.pivotPoint} ref={pivotRef}>
        <group position={offset} quaternion={accumulatedQuat.current}>
          {cubeMesh}
        </group>
      </group>
    );
  }

  return (
    <group position={staticPosition} quaternion={accumulatedQuat.current}>
      {cubeMesh}
    </group>
  );
}
