import { expect } from 'chai'
import puppeteer from 'puppeteer'
import fs from 'fs-extra'
import { PNG } from 'pngjs'
import pixelmatch from "pixelmatch"
import CREDS from "../creds"
import SegmentBuilder from '../pageobjects/WTsegments'

let browser, page, segmentBuilder
const viewport = { width: 1920, height: 1080 }
const showUI = {headless: false}
const showSlowMotion = {headless: false, slowMo: 300}

beforeEach(async () => {
  browser = await puppeteer.launch(showUI)
  page = await browser.newPage()
  await page.setViewport(viewport)
})

describe('element exist', async () => {
  beforeEach(async () => {
    segmentBuilder = new SegmentBuilder(page)
    await segmentBuilder.open()
    await segmentBuilder.logIn()
  })
  it('logoExist', async () => {
    expect(await segmentBuilder.logoExist()).to.be.true; 
  })
  it('titleExist', async () => {
    expect(await segmentBuilder.titleExist()).to.be.true; 
  })

})

afterEach(async () => {
  await browser.close()
})
