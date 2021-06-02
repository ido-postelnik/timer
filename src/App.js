import logo from './logo.svg';
import './App.scss';

import { INTERVAL_TIME, RADIUS } from './utils/consts';

// App components
import Timer from './components/Timer';

function App() {
  return (
    <div className="App">
      <h1 className="app-title">{INTERVAL_TIME / 1000} Second Timer</h1>
      <Timer 
        intervalTime={INTERVAL_TIME}
        radius={RADIUS}
      />
    </div>
  );
}

export default App;
