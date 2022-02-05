import { FontAwesomeIcon, faPlay, faPause, faRedo } from '../common';

export const TimerControl = () => (
  <section className='control-container'>
    <FontAwesomeIcon id='start_stop' className='icon' icon={faPlay} />
    <FontAwesomeIcon id='reset' className='icon' icon={faRedo} />
  </section>
);
