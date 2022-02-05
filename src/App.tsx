import { Component } from 'react';
import { LengthControl, Header, Timer, TimerControl } from './components';

interface AppStates {
  sessionLength: number;
  breakLength: number;
}

class App extends Component<{}, AppStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5
    };
  }

  render() {
    return (
      <div className='App'>
        <main className='clock-container'>
          <Header />
          <LengthControl
            sessionLength={this.state.sessionLength}
            breakLength={this.state.breakLength}
          />
          <Timer />
          <TimerControl />
        </main>
      </div>
    );
  }
}

export default App;
