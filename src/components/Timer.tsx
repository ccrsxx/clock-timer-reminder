interface TimerProps {
  isRunning: boolean;
  isRinging: boolean;
  warning: boolean;
  currentTimer: 'session' | 'break';
  timeLeft: { mm: number | string; ss: number | string };
}

export function Timer({
  isRunning,
  isRinging,
  warning,
  currentTimer,
  timeLeft
}: TimerProps) {
  return (
    <figure
      style={isRunning ? { borderColor: 'lightgreen' } : {}}
      className={`timer-container ${
        isRunning && [warning, isRinging].some((i) => i)
          ? warning
            ? 'warning'
            : 'ringing'
          : ''
      }`}
    >
      <figcaption className='timer-label'>
        {currentTimer[0].toUpperCase() + currentTimer.slice(1)}
      </figcaption>
      <p className='time-left'>{`${timeLeft.mm}:${timeLeft.ss}`}</p>
    </figure>
  );
}
