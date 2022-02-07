import { FontAwesomeIcon, faPlay, faPause, faRedo } from '../common';

interface TimerProps {
  startTimer: () => void;
  clear: () => void;
  isRunning: boolean;
}

export const TimerControl = (props: TimerProps) => (
  <section className='control-container'>
    <FontAwesomeIcon
      id='start_stop'
      className='icon'
      icon={props.isRunning ? faPause : faPlay}
      onClick={props.startTimer}
    />
    <FontAwesomeIcon
      id='reset'
      className='icon'
      icon={faRedo}
      onClick={props.clear}
    />
  </section>
);
