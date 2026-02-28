import { GRID_CELLS } from '../utils/constants';

export function Ground() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[GRID_CELLS, GRID_CELLS]} />
        <meshStandardMaterial color="#2a5a2a" />
      </mesh>
      <gridHelper
        args={[GRID_CELLS, GRID_CELLS, '#4a8a4a', '#3a7a3a']}
        position={[0, 0, 0]}
      />
    </group>
  );
}
