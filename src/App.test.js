import { render, screen } from '@testing-library/react';
import App from './App';
import { INTERVAL_TIME } from './utils/consts';
import { parseMsToSec } from './utils/utils';

describe('On page load', () => {
  test('App title renders correctly', () => {
    render(<App />);
    const title = screen.getByTestId("app-title");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe(`${INTERVAL_TIME / 1000} Second Timer`);
  });
});

describe('On parsing ms to sec', () => {
  test('1230 ms should be 1.23 sec', async() => {
    const sec = parseMsToSec(1230);
    expect(sec).toBe('1.23');
  });
});