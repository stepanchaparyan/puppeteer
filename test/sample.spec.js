const { expect } = require('chai')
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch')
const CREDS = require('../creds');

let browser, page
const viewport = { width: 1920, height: 1080 }
const showUI = {headless: false}
const showSlowMotion = {headless: false, slowMo: 300}

beforeEach(async () => {
  browser = await puppeteer.launch(showUI)
  page = await browser.newPage()
  await page.setViewport(viewport)
})

describe('browser version', async () => {
    // it('HeadlessChromeVersion', async () => {
    //   expect(`HeadlessChrome/64.0.3264.0`).to.equal(await browser.version())
    // })
    it('ChromeVersion', async () => {
      expect(`Chrome/64.0.3264.0`).to.equal(await browser.version())
    })
})

describe('start', async () => {
  it('loginWT', async () => {  
    await page.goto('https://app.webtrends-optimize.com/optimize/manage/assets')
    await page.waitForSelector('#emailInput')
    await page.type('#emailInput', CREDS.usernameA)
    await page.type('#passwordInput', CREDS.passwordA)
    await page.click('.submit-button')
    await page.waitFor(15000)
    await page.screenshot({ path: 'screenshots/wtlogin.png' })
  })

})

afterEach(async () => {
  await browser.close()
})
