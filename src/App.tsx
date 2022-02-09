import { Component } from 'react';
import {
  LengthControl,
  Header,
  Timer,
  TimerControl,
  Footer
} from './components';
import beep from './assets/beep.wav';

interface AppStates {
  sessionLength: number;
  breakLength: number;
  isRunning: boolean;
  isRinging: boolean;
  warning: boolean;
  currentTimer: 'session' | 'break';
  timeLeft: { m: number | string; s: number | string };
  seconds: number;
}

class App extends Component<{}, AppStates> {
  timer = 0;
  audio = new Audio(beep);

  constructor(props: {}) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      isRunning: false,
      isRinging: false,
      warning: false,
      currentTimer: 'session',
      timeLeft: { m: 0, s: 0 },
      seconds: 0
    };
    this.handleLengthControl = this.handleLengthControl.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidUpdate() {
    if (this.state.isRunning && this.state.seconds === 0) {
      this.audio.play();
    } else if (!this.state.isRunning) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  componentDidMount() {
    const seconds = this.state.sessionLength * 60;
    const timeLeft = this.secondsToTime(seconds);

    this.setState({
      timeLeft,
      seconds
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  secondsToTime(secs: number) {
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
  }

  countDown() {
    const seconds = this.state.seconds - 1;
    const timeLeft = this.secondsToTime(seconds);

    this.setState({
      timeLeft,
      seconds
    });

    if (seconds === 10) {
      this.setState({
        warning: true
      });
    } else if (seconds === 0) {
      this.setState({
        isRinging: true,
        warning: false
      });
    } else if (seconds === -1) {
      setTimeout(() => {
        this.setState({ isRinging: false });
      }, 3000);

      const currentTimer =
        this.state.currentTimer === 'session' ? 'break' : 'session';

      const seconds =
        currentTimer === 'session'
          ? this.state.sessionLength * 60
          : this.state.breakLength * 60;

      const timeLeft = this.secondsToTime(seconds);

      this.setState({
        currentTimer,
        timeLeft,
        seconds
      });
    }
  }

  toggleTimer() {
    if (!this.state.isRunning) {
      this.timer = window.setInterval(this.countDown, 1000);
      this.setState({
        isRunning: true
      });
    } else if (this.state.isRunning) {
      clearInterval(this.timer);
      this.setState({
        isRunning: false,
        isRinging: false
      });
    }
  }

  handleLengthControl(type: string) {
    if (!this.state.isRunning) {
      let [dataType, action]: number[] | string[] = type.split('-');
      let { sessionLength, breakLength } = this.state;

      action = action === 'increment' ? 1 : -1;

      [sessionLength, breakLength] = [sessionLength, breakLength].map((i) =>
        i + +action >= 60 ? 60 : !(i + +action) ? 1 : i + +action
      );

      if (dataType === 'session') {
        this.setState({
          sessionLength
        });
      } else if (dataType === 'break') {
        this.setState({
          breakLength
        });
      }

      const seconds =
        this.state.currentTimer === 'session' && dataType === 'session'
          ? sessionLength * 60
          : this.state.currentTimer === 'break' && dataType === 'break'
          ? breakLength * 60
          : null;

      // prevent updating the timeleft when it's not the current timer
      if (seconds) {
        const timeLeft = this.secondsToTime(seconds);

        this.setState({
          seconds,
          timeLeft
        });
      }
    }
  }

  clear() {
    clearInterval(this.timer);
    this.audio.pause();
    this.audio.currentTime = 0;

    this.setState({
      sessionLength: 25,
      breakLength: 5,
      isRunning: false,
      isRinging: false,
      warning: false,
      currentTimer: 'session',
      timeLeft: { m: 25, s: '00' },
      seconds: 25 * 60
    });
  }

  render() {
    return (
      <div className='App'>
        <main className='clock-container'>
          <Header />
          <LengthControl
            isRunning={this.state.isRunning}
            sessionLength={this.state.sessionLength}
            breakLength={this.state.breakLength}
            handleLengthControl={this.handleLengthControl}
          />
          <Timer
            isRunning={this.state.isRunning}
            isRinging={this.state.isRinging}
            warning={this.state.warning}
            currentTimer={this.state.currentTimer}
            timeLeft={this.state.timeLeft}
          />
          <TimerControl
            isRunning={this.state.isRunning}
            toggleTimer={this.toggleTimer}
            clear={this.clear}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
