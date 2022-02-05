import { FontAwesomeIcon, faArrowUp, faArrowDown } from '../common';

interface LengthControlProps {
  sessionLength: number;
  breakLength: number;
  handleLengthControl: (type: string) => void;
}

export const LengthControl = (props: LengthControlProps) => (
  <section className='input-container'>
    <div className='length-control-container'>
      <p id='session-label' className='label'>
        Session Length
      </p>
      <div className='length-control'>
        <FontAwesomeIcon
          id='session-increment'
          className='icon'
          icon={faArrowUp}
          onClick={() => props.handleLengthControl('session-increment')}
        />
        <p id='session-length' className='length-value'>
          {props.sessionLength}
        </p>
        <FontAwesomeIcon
          id='session-decrement'
          className='icon'
          icon={faArrowDown}
          onClick={() => props.handleLengthControl('session-decrement')}
        />
      </div>
    </div>
    <div className='length-control-container'>
      <p id='break-label' className='label'>
        Break Length
      </p>
      <div className='length-control'>
        <FontAwesomeIcon
          id='break-increment'
          className='icon'
          icon={faArrowUp}
          onClick={() => props.handleLengthControl('break-increment')}
        />
        <p id='break-length' className='length-value'>
          {props.breakLength}
        </p>
        <FontAwesomeIcon
          id='break-decrement'
          className='icon'
          icon={faArrowDown}
          onClick={() => props.handleLengthControl('break-decrement')}
        />
      </div>
    </div>
  </section>
);
