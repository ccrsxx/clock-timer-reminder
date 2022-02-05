import { FontAwesomeIcon, faArrowUp, faArrowDown } from '../common';

interface LengthControlProps {
  sessionLength: number;
  breakLength: number;
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
        />
        <p id='session-length' className='length-value'>
          {props.sessionLength}
        </p>
        <FontAwesomeIcon
          id='session-decrement'
          className='icon'
          icon={faArrowDown}
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
        />
        <p id='break-length' className='length-value'>
          {props.breakLength}
        </p>
        <FontAwesomeIcon
          id='break-decrement'
          className='icon'
          icon={faArrowDown}
        />
      </div>
    </div>
  </section>
);
