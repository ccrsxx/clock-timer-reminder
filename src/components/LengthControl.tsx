import { FontAwesomeIcon, faArrowUp, faArrowDown } from '../common';

interface LengthControlProps {
  isRunning: boolean;
  sessionLength: number;
  breakLength: number;
  handleLengthControl: (type: string) => void;
}

export const LengthControl = (props: LengthControlProps) => (
  <section className='input-container'>
    <div
      className={`length-control-container ${props.isRunning ? 'running' : ''}`}
    >
      <p id='session-label' className='label'>
        Session Length
      </p>
      <div className='length-control'>
        <button
          id='session-increment'
          className={`icon ${props.isRunning ? 'disabled' : ''}`}
          onClick={() => props.handleLengthControl('session-increment')}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <p id='session-length' className='length-value'>
          {props.sessionLength}
        </p>
        <button
          id='session-decrement'
          className={`icon ${props.isRunning ? 'disabled' : ''}`}
          onClick={() => props.handleLengthControl('session-decrement')}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
    </div>
    <div
      className={`length-control-container ${props.isRunning ? 'running' : ''}`}
    >
      <p id='break-label' className='label'>
        Break Length
      </p>
      <div className='length-control'>
        <button
          id='break-increment'
          className={`icon ${props.isRunning ? 'disabled' : ''}`}
          onClick={() => props.handleLengthControl('break-increment')}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <p id='break-length' className='length-value'>
          {props.breakLength}
        </p>
        <button
          id='break-decrement'
          className={`icon ${props.isRunning ? 'disabled' : ''}`}
          onClick={() => props.handleLengthControl('break-decrement')}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
    </div>
  </section>
);
