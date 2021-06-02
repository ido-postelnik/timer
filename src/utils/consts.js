export const INTERVAL_TIME = 5000; // ms
export const PROGRESS_SPEED = 10; // ms
export const RESET_TIME = 300; // ms

export const RADIUS = 80; // px

export const TIMER_STATES = {
  stopped: 'stopped', // Used for 'initial' and 'paused' states. *Please see explenation below.
  running: 'running',
  complete: 'complete',
  blockTaps: 'blockTaps' // Used while timer is resetting
};

/* 
  For the current requirements, it is enough to have 1 state that represents both 'initial' and 'paused' states,
  beacuse from this 'stopped' state, the timer just runs - it doesn't care whether from 'initial or 'paused' modes.
  If a different behavior than 'initial' will be required for the 'paused' mode, then we'll need 2 separate states.
*/