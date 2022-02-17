import { useState } from 'react';
import { FontAwesomeIcon, faPlay, faPause, faRedo } from '../common';

interface TimerProps {
  isRunning: boolean;
  toggleTimer: () => void;
  reset: () => void;
}

export function TimerControl({ isRunning, toggleTimer, reset }: TimerProps) {
  const [isClicked, setClicked] = useState(false);

  return (
    <section className='control-container'>
      <button type='button' className='icon' onClick={toggleTimer}>
        <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
      </button>
      <button
        type='button'
        className={`icon ${isClicked ? 'clicked' : ''}`}
        onAnimationEnd={() => setClicked(false)}
        onClick={reset}
      >
        <FontAwesomeIcon icon={faRedo} onClick={() => setClicked(true)} />
      </button>
    </section>
  );
}
