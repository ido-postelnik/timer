import React, { useState, useRef } from "react";

import { PROGRESS_SPEED, RESET_TIME, TIMER_STATES } from '../utils/consts';
import { parseMsToSec } from '../utils/utils';

export default function Timer({intervalTime = 5000, radius = 80}) {
  //#region Initialize states and refs
  const [ringProgress, setRingProgress] = useState(1);
  const [timePassed, setTimePassed] = useState(0); 
  const [timerState, setTimerState] = useState(TIMER_STATES.stopped);
  const intervalRef = useRef(); // Used like a global variable that can be accessed from within the handler function while keeping its value (Closure style)
  //#endregion

  //#region Timer functionality
  const handleTimerTapping = () => {
    switch(timerState) {
      case TIMER_STATES.stopped:
        setTimerState(TIMER_STATES.running); // Update timer state

        // Start interval
        intervalRef.current = setInterval(() => {
          setTimePassed(timePassed => {
            if(timePassed + PROGRESS_SPEED === intervalTime){ // End interval after fully reached "INTERVAL_TIME" ms
              clearInterval(intervalRef.current);
              setTimerState(TIMER_STATES.complete);
            }

            return timePassed + PROGRESS_SPEED;
          });

          setRingProgress(ringProgress => ringProgress - (PROGRESS_SPEED / intervalTime));
        }, PROGRESS_SPEED);

        break;
      case TIMER_STATES.running:
        setTimerState(TIMER_STATES.stopped); // Update timer state
        clearInterval(intervalRef.current); // Stop interval (but keep the timer states)

        break;
      case TIMER_STATES.complete:
        setTimerState(TIMER_STATES.blockTaps); // Block timer from tapping while reseting

        let timePassed = 0;
        let resetInterval = setInterval(() => {
          timePassed += PROGRESS_SPEED;
          if(timePassed === RESET_TIME){
            clearInterval(resetInterval);

            // Init timer states
            setTimerState(TIMER_STATES.stopped);
            setTimePassed(0)
          }

          setRingProgress(ringProgress => ringProgress + (PROGRESS_SPEED / RESET_TIME));
        }, PROGRESS_SPEED);

        break;
      case TIMER_STATES.blockTaps:
        break;
      default:
        break;
    }
  };
  //#endregion

  return (
    <div className="timer">
      <svg 
        className="ring" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        height="200" 
        width="200" 
        viewBox="0 0 200 200"
        onClick={handleTimerTapping} 
      >
        <circle 
          className="ring__back"
          cx="100" 
          cy="100" 
          r={radius} 
          pathLength="1"
        />
        <circle 
          className="ring__progress"
          cx="100" 
          cy="100" 
          r={radius} 
          pathLength="1"
          style={{
            strokeDashoffset: ringProgress
          }}
        />
      </svg>

      <p className="counter">{parseMsToSec(timePassed)}</p>
    </div>
  );
}