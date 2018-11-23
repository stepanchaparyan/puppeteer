import { assert } from 'chai'
import { expect } from 'chai'
import puppeteer from 'puppeteer'
import fs from 'fs-extra'
import { PNG } from 'pngjs'
import pixelmatch from "pixelmatch"
import CREDS from "../creds"
import GoogleSearchPage from "../pageobjects/googlesearchpage"
import MenuBar from '../pageobjects/menuBar'


let browser, page, googlesearchpage, menuBar
const viewport = { width: 1920, height: 1080 }
const showUI = {headless: false}
const showSlowMotion = {headless: false, slowMo: 300}

beforeEach(async () => {
  browser = await puppeteer.launch(showUI)
  page = await browser.newPage()
  await page.setViewport(viewport)
})

describe.only('browser version', async () => {
    it('ChromeVersion', async () => {
      expect(await browser.version()).to.include(`Chrome/64.0.3264.0`);
    })
    it('DOM test with "Google title', async () => {
      googlesearchpage = new GoogleSearchPage(page)
      await googlesearchpage.open()
      const title = await googlesearchpage.getTitle()
      assert.equal(title, 'Google')
    });
})

describe.skip('start', async () => {
  beforeEach(async () => {
    await page.goto('https://app.webtrends-optimize.com/optimize/manage/assets')
    await page.waitForSelector('#emailInput')
    await page.type('#emailInput', CREDS.usernameA)
    await page.type('#passwordInput', CREDS.passwordA)
    await page.click('.submit-button')
    await page.waitFor(5000)
    await page.click('body > main > div > div > div > div:nth-child(2) > div > div.account-groups > div:nth-child(2) > div > a')
    await page.waitFor(15000)
    await page.screenshot({ path: 'screenshots/wtlogin.png' })
  })
  it('asset', async () => {  
    await page.goto('https://app.webtrends-optimize.com/optimize/manage/assets')
    await page.waitFor(20000)
    await page.click('body > main > div > div.app-content.row > div > div.container > div > section > div > div.tableBody > div:nth-child(2)')
    await page.waitFor(3000)
    await page.screenshot({ path: 'screenshots/wtAsset.png' })
  })
  it('availableSpace', async () => {  
    await page.goto('https://app.webtrends-optimize.com/optimize/manage/assets')
    await page.waitFor(20000)
    await page.click('body > main > div > div.app-content.row > div > div.container > div > div:nth-child(1) > div > div:nth-child(1) > div > div > div > span')
    await page.waitFor(3000)
    await page.screenshot({ path: 'screenshots/wtSpace.png' })
  })
})

afterEach(async () => {
  await browser.close()
})
