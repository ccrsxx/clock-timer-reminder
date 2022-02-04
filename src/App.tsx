import { Component } from 'react';

interface AppStates {}

class App extends Component<{}, AppStates> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <div className='App'>
        <div className='clock-container'>
          <h1 className='title'>25 + 5 Clock</h1>
          <div className='switch-container'>
            <div className='length-control'></div>
            <div className='length-control'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
