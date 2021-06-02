import logo from './logo.svg';
import './App.scss';

import { INTERVAL_TIME } from './utils/consts';

// App components
import Timer from './components/Timer';

function App() {
  return (
    <div className="App">
      <h1>{INTERVAL_TIME / 1000} Second Timer</h1>
      <Timer />
    </div>
  );
}

export default App;
