import { INTERVAL_TIME } from '../utils/consts';
const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ 
  toMatchImageSnapshot,
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:3000/');
});

afterAll(async () => {
  await browser.close();
});

afterEach(async () => {
  // Reset timer
  await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
});

describe('On timer init', () => {
  test('Counter is initialized', async() => {
    const counter = await page.$eval('.counter', e => e.innerHTML);
    expect(counter).toBe('0.00');
  });

  test('Timer is initialized', async() => {
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: './src/tests/__image_snapshots__', 
      customSnapshotIdentifier: 'timer-is-initialized'
    });
  });
});

describe('On timer completed', () => {
  const completedTime = INTERVAL_TIME / 1000;

  beforeEach(async () => {
    page.click('.ring');
    await page.waitForTimeout(INTERVAL_TIME);
  }, INTERVAL_TIME + 1000);  // Enable long-running test (a bit more than INTERVAL_TIME)

  test(`Counter is set to ${completedTime}`, async() => {
    const counter = await page.$eval('.counter', e => e.innerHTML);
    const counterParsed = parseFloat(counter);
    expect(counterParsed).toBeWithinRange(completedTime - 0.1, completedTime + 0.1); // Margin error
  });

  test('Timer progress is complete', async() => {
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: './src/tests/__image_snapshots__', 
      customSnapshotIdentifier: 'timer-is-completed',
      failureThreshold: 0.1, // Margin error
      failureThresholdType: 'percent'
    });
  });
});

describe('On timer paused after 2 sec', () => {
  beforeEach(async () => {
    page.click('.ring');
    await page.waitForTimeout(2000);
  });

  test(`Counter is set to 2`, async() => {
    const counter = await page.$eval('.counter', e => e.innerHTML);
    const counterParsed = parseFloat(counter);
    console.log('counterParsed: ', counterParsed);
    expect(counterParsed).toBeWithinRange(1.9, 2.1); // Margin error
  });

  test('Timer progress is 2 sec', async() => {
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: './src/tests/__image_snapshots__', 
      customSnapshotIdentifier: 'timer-is-two-sec',
      failureThreshold: 0.1, // Margin error
      failureThresholdType: 'percent'
    });
  });
});

describe('On timer paused after 2 sec, then continue for 1.5 sec, then paused again', () => {
  beforeEach(async () => {
    page.click('.ring'); // start timer
    await page.waitForTimeout(2000); // run for 2 sec
    page.click('.ring'); // pause timer
    await page.waitForTimeout(700); // waiting a moment
    page.click('.ring'); // start again
    await page.waitForTimeout(1500); // run for additional 1.5 sec
    page.click('.ring'); // pause timer
  });

  test(`Counter is set to 3.5`, async() => {
    const counter = await page.$eval('.counter', e => e.innerHTML);
    const counterParsed = parseFloat(counter);
    console.log('counterParsed: ', counterParsed);
    expect(counterParsed).toBeWithinRange(3.4, 3.6); // Margin error
  });

  test('Timer progress is 3.5 sec', async() => {
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: './src/tests/__image_snapshots__', 
      customSnapshotIdentifier: 'timer-is-three-and-half-sec',
      failureThreshold: 0.1, // Margin error
      failureThresholdType: 'percent'
    });
  });
});