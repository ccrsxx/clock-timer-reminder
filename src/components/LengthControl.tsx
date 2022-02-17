import { FontAwesomeIcon, faArrowUp, faArrowDown } from '../common';

interface LengthControlProps {
  isRunning: boolean;
  sessionLength: number;
  breakLength: number;
  handleLengthControl: (type: string) => void;
}

export function LengthControl({
  isRunning,
  sessionLength,
  breakLength,
  handleLengthControl
}: LengthControlProps) {
  return (
    <section className='input-container'>
      <div className={`length-control-container ${isRunning ? 'running' : ''}`}>
        <p className='label'>Session Length</p>
        <div className='length-control'>
          <button
            type='button'
            className={`icon ${isRunning ? 'disabled' : ''}`}
            onClick={() => handleLengthControl('session-increment')}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <p className='length-value'>{sessionLength}</p>
          <button
            type='button'
            className={`icon ${isRunning ? 'disabled' : ''}`}
            onClick={() => handleLengthControl('session-decrement')}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      </div>
      <div className={`length-control-container ${isRunning ? 'running' : ''}`}>
        <p className='label'>Break Length</p>
        <div className='length-control'>
          <button
            type='button'
            className={`icon ${isRunning ? 'disabled' : ''}`}
            onClick={() => handleLengthControl('break-increment')}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <p className='length-value'>{breakLength}</p>
          <button
            type='button'
            className={`icon ${isRunning ? 'disabled' : ''}`}
            onClick={() => handleLengthControl('break-decrement')}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      </div>
    </section>
  );
}
