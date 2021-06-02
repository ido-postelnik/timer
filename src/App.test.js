import { INTERVAL_TIME } from './utils/consts'
const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:3000/');
});

describe('On page load', () => {
  test('App title loads correctly', async() => {
    const appTitle = await page.$eval('.app-title', e => e.innerHTML);
    expect(appTitle).toBe(`${INTERVAL_TIME / 1000} Second Timer`);
  });
})