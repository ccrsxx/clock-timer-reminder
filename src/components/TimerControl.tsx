import { useState } from 'react';
import { FontAwesomeIcon, faPlay, faPause, faRedo } from '../common';

interface TimerProps {
  isRunning: boolean;
  toggleTimer: () => void;
  reset: () => void;
}

export const TimerControl = (props: TimerProps) => {
  const [isClicked, setClicked] = useState(false);

  return (
    <section className='control-container'>
      <button id='start_stop' className='icon' onClick={props.toggleTimer}>
        <FontAwesomeIcon icon={props.isRunning ? faPause : faPlay} />
      </button>
      <button
        id='reset'
        className={`icon ${isClicked ? 'clicked' : ''}`}
        onAnimationEnd={() => setClicked(false)}
        onClick={props.reset}
      >
        <FontAwesomeIcon icon={faRedo} onClick={() => setClicked(true)} />
      </button>
    </section>
  );
};
