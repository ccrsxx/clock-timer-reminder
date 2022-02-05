import { Component } from 'react';
import { LengthControl, Header, Timer, TimerControl } from './components';

interface AppStates {
  sessionLength: number;
  breakLength: number;
  isRunning: boolean;
}

class App extends Component<{}, AppStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      isRunning: false
    };
    this.handleLengthControl = this.handleLengthControl.bind(this);
  }

  handleLengthControl(type: string) {
    const [dataType, action] = type.split('-');

    dataType === 'session'
      ? this.setState((state) => ({
          sessionLength: state.sessionLength + (action === 'increment' ? 1 : -1)
        }))
      : this.setState((state) => ({
          breakLength: state.breakLength + (action === 'increment' ? 1 : -1)
        }));
  }

  render() {
    return (
      <div className='App'>
        <main className='clock-container'>
          <Header />
          <LengthControl
            sessionLength={this.state.sessionLength}
            breakLength={this.state.breakLength}
            handleLengthControl={this.handleLengthControl}
          />
          <Timer />
          <TimerControl />
        </main>
      </div>
    );
  }
}

export default App;
