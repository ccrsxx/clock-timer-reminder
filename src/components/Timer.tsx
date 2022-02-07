interface TimerProps {
  currentTimer: 'session' | 'break';
  time: { m: number | string; s: number | string };
}

export const Timer = (props: TimerProps) => (
  <figure className='timer-container'>
    <figcaption id='timer-label' className='timer-label'>
      {props.currentTimer[0].toLocaleUpperCase() + props.currentTimer.slice(1)}
    </figcaption>
    <p id='timer-left' className='timer-left'>
      {`${props.time.m}:${props.time.s}`}
    </p>
  </figure>
);
