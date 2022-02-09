interface TimerProps {
  isRunning: boolean;
  isRinging: boolean;
  warning: boolean;
  currentTimer: 'session' | 'break';
  timeLeft: { m: number | string; s: number | string };
}

export const Timer = (props: TimerProps) => (
  <figure
    style={props.isRunning ? { borderColor: 'lightgreen' } : {}}
    className={`timer-container ${
      props.isRunning && [props.warning, props.isRinging].some((i) => i)
        ? props.warning
          ? 'warning'
          : 'ringing'
        : ''
    }`}
  >
    <figcaption id='timer-label' className='timer-label'>
      {props.currentTimer[0].toLocaleUpperCase() + props.currentTimer.slice(1)}
    </figcaption>
    <p id='time-left' className='time-left'>
      {`${props.timeLeft.m}:${props.timeLeft.s}`}
    </p>
  </figure>
);
