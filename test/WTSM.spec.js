import { expect } from 'chai'
import puppeteer from 'puppeteer'
import fs from 'fs-extra'
import { PNG } from 'pngjs'
import pixelmatch from "pixelmatch"
import CREDS from "../creds"
import SegmentManager from '../pageobjects/WTSM'

let browser, page, segmentManager
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
})

describe.skip('start', async () => {
  beforeEach(async () => {
    segmentManager = new SegmentManager(page)
    await segmentManager.open()
    await segmentManager.logIn()
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
