import { useState, useRef, useEffect } from 'react';
import {
  Header,
  LengthControl,
  Timer,
  TimerControl,
  Footer
} from './components';
import beep from './assets/beep.wav';

type currentTimerType = 'session' | 'break';
type timeLeftType = { m: number | string; s: number | string };

const audio = new Audio(beep);

export default function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [warning, setWarning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState<currentTimerType>('session');
  const [timeLeft, setTimeLeft] = useState<timeLeftType>({ m: '25', s: '00' });
  const [seconds, setSeconds] = useState(1500);

  const ref = useRef({ intervalId: 0, currentTimer: '', seconds: 0 });

  // reset everything when unmounting
  useEffect(() => () => reset(), []);

  // get the newest seconds state value
  useEffect(() => {
    ref.current.seconds = seconds;
  }, [seconds]);

  // cycle between session and break
  useEffect(() => {
    ref.current.currentTimer = currentTimer;
  }, [currentTimer]);

  const secondsToTime = (secs: number) => {
    let [minutes, seconds]: number[] | string[] = [
      Math.floor(secs / 60),
      secs % 60
    ];

    // add zero if second or minute is less than 10
    [minutes, seconds] = [minutes, seconds].map((i) => (i < 10 ? `0${i}` : i));

    return {
      m: minutes,
      s: seconds
    };
  };

  const countDown = () => {
    const seconds = --ref.current.seconds;

    setTimeLeft(secondsToTime(seconds));
    setSeconds(seconds);

    if (seconds === 10) {
      setWarning(true);
    } else if (seconds === 0) {
      audio.play();
      setIsRinging(true);
      setWarning(false);
    } else if (seconds === -1) {
      setTimeout(() => {
        setIsRinging(false);
      }, 3000);

      const currentTimer =
        ref.current.currentTimer === 'session' ? 'break' : 'session';
      const seconds =
        currentTimer === 'session' ? sessionLength * 60 : breakLength * 60;
      const timeLeft = secondsToTime(seconds);
      setCurrentTimer(currentTimer);
      setTimeLeft(timeLeft);
      setSeconds(seconds);
    }
  };

  const toggleTimer = () => {
    if (!isRunning) {
      ref.current.intervalId = window.setInterval(countDown, 1000);
      setIsRunning(true);
    } else if (isRunning) {
      audio.pause();
      audio.currentTime = 0;
      clearInterval(ref.current.intervalId);
      setIsRunning(false);
      setIsRinging(false);
    }
  };

  const handleLengthControl = (type: string) => {
    if (!isRunning) {
      let [dataType, action]: number[] | string[] = type.split('-');
      let [currentSession, currentBreak] = [sessionLength, breakLength];

      action = action === 'increment' ? 1 : -1;

      [currentSession, currentBreak] = [currentSession, currentBreak].map((i) =>
        i + +action >= 60 ? 60 : !(i + +action) ? 1 : i + +action
      );

      if (dataType === 'session') {
        setSessionLength(currentSession);
      } else if (dataType === 'break') {
        setBreakLength(currentBreak);
      }

      const currentSeconds =
        currentTimer === 'session' && dataType === 'session'
          ? currentSession * 60
          : currentTimer === 'break' && dataType === 'break'
          ? currentBreak * 60
          : null;

      if (currentSeconds) {
        const timeLeft = secondsToTime(currentSeconds);
        setTimeLeft(timeLeft);
        setSeconds(currentSeconds);
      }
    }
  };

  const reset = () => {
    // reset side effect and audio state
    clearInterval(ref.current.intervalId);
    audio.pause();
    audio.currentTime = 0;

    // reset all states
    setSessionLength(25);
    setBreakLength(5);
    setIsRunning(false);
    setIsRinging(false);
    setWarning(false);
    setCurrentTimer('session');
    setTimeLeft({ m: '25', s: '00' });
    setSeconds(1500);
  };

  return (
    <div className='App'>
      <main className='clock-container'>
        <Header />
        <LengthControl
          isRunning={isRunning}
          sessionLength={sessionLength}
          breakLength={breakLength}
          handleLengthControl={handleLengthControl}
        />
        <Timer
          isRunning={isRunning}
          isRinging={isRinging}
          warning={warning}
          currentTimer={currentTimer}
          timeLeft={timeLeft}
        />
        <TimerControl
          isRunning={isRunning}
          toggleTimer={toggleTimer}
          reset={reset}
        />
      </main>
      <Footer />
    </div>
  );
}
