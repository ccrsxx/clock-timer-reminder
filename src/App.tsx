import { useState, useRef, useEffect } from 'react';
import {
  Header,
  LengthControl,
  Timer,
  TimerControl,
  Footer
} from './components';
import beep from './assets/beep.wav';

type CurrentTimerType = 'session' | 'break';
type TimeLeftType = { mm: number | string; ss: number | string };

const audio = new Audio(beep);

export default function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [warning, setWarning] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(1500);
  const [currentTimer, setCurrentTimer] = useState<CurrentTimerType>('session');
  const [currentTimeLeft, setCurrentTimeLeft] = useState<TimeLeftType>({
    mm: '25',
    ss: '00'
  });

  // ref to get the interval id
  const ref = useRef({ intervalId: 0 });

  // reset everything when unmounting
  useEffect(() => () => reset(), []);

  // control all the life cycle of the timer
  useEffect(() => {
    if (currentSeconds !== -1) {
      setCurrentTimeLeft(secondsToTime(currentSeconds));
    }

    if (currentSeconds === 10) {
      setWarning(true);
    } else if (currentSeconds === 0) {
      audio.play();
      setIsRinging(true);
      setWarning(false);
    } else if (currentSeconds === -1) {
      setTimeout(() => {
        setIsRinging(false);
      }, 3000);

      const nextTimer = currentTimer === 'session' ? 'break' : 'session';
      const nextSeconds =
        nextTimer === 'session' ? sessionLength * 60 : breakLength * 60;
      const nextTimeLeft = secondsToTime(nextSeconds);

      setCurrentTimer(nextTimer);
      setCurrentTimeLeft(nextTimeLeft);
      setCurrentSeconds(nextSeconds);
    }
  }, [currentSeconds]);

  const secondsToTime = (seconds: number) => {
    let [minute, second]: number[] | string[] = [
      Math.floor(seconds / 60),
      seconds % 60
    ];

    // add zero if second or minute is less than 10
    [minute, second] = [minute, second].map((i) => (i < 10 ? `0${i}` : i));

    return {
      mm: minute,
      ss: second
    };
  };

  const toggleTimer = () => {
    if (!isRunning) {
      ref.current.intervalId = window.setInterval(
        () => setCurrentSeconds((prevSeconds) => prevSeconds - 1),
        1000
      );
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
      // eslint-disable-next-line prefer-const
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

      const nextSeconds =
        currentTimer === 'session' && dataType === 'session'
          ? currentSession * 60
          : currentTimer === 'break' && dataType === 'break'
          ? currentBreak * 60
          : null;

      if (nextSeconds) {
        const nextTimeLeft = secondsToTime(nextSeconds);
        setCurrentTimeLeft(nextTimeLeft);
        setCurrentSeconds(nextSeconds);
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
    setCurrentSeconds(1500);
    setCurrentTimer('session');
    setCurrentTimeLeft({ mm: '25', ss: '00' });
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
          timeLeft={currentTimeLeft}
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
