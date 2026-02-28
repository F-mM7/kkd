import type { Direction } from '../types/game';
import './ArrowButtons.css';

interface ArrowButtonsProps {
  onDirection: (direction: Direction) => void;
  disabled: boolean;
}

export function ArrowButtons({ onDirection, disabled }: ArrowButtonsProps) {
  return (
    <div className="arrow-buttons">
      <div className="arrow-row">
        <button
          className="arrow-btn"
          onClick={() => onDirection('up')}
          disabled={disabled}
        >
          ▲
        </button>
      </div>
      <div className="arrow-row">
        <button
          className="arrow-btn"
          onClick={() => onDirection('left')}
          disabled={disabled}
        >
          ◀
        </button>
        <button
          className="arrow-btn"
          onClick={() => onDirection('down')}
          disabled={disabled}
        >
          ▼
        </button>
        <button
          className="arrow-btn"
          onClick={() => onDirection('right')}
          disabled={disabled}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
