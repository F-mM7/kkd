import { GameScene } from './components/GameScene';
import { ArrowButtons } from './components/ArrowButtons';
import { useCubeController } from './hooks/useCubeController';
import { useKeyboardInput } from './hooks/useKeyboardInput';
import './App.css';

function App() {
  const { cubeState, animation, roll, onAnimationComplete } =
    useCubeController();
  useKeyboardInput(roll);

  return (
    <div className="app-container">
      <GameScene
        cubeState={cubeState}
        animation={animation}
        onAnimationComplete={onAnimationComplete}
      />
      <ArrowButtons onDirection={roll} disabled={false} />
    </div>
  );
}

export default App;
