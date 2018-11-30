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
  browser = await puppeteer.launch()
  page = await browser.newPage()
  await page.setViewport(viewport)
})

describe('elements exist', async () => {
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
  it('searchFieldExist', async () => {
    expect(await segmentBuilder.searchFieldExist()).to.be.true; 
  })
  it('addSegmentButtonExist', async () => {
    expect(await segmentBuilder.addSegmentButtonExist()).to.be.true; 
  })
  it('allSegmentsFilterExist', async () => {
    expect(await segmentBuilder.allSegmentsFilterExist()).to.be.true; 
  })
  it('inUseFilterExist', async () => {
    expect(await segmentBuilder.inUseFilterExist()).to.be.true; 
  })
  it('notInUseFilterExist', async () => {
    expect(await segmentBuilder.notInUseFilterExist()).to.be.true; 
  })

  context("tableHeads", async() => {
    it('tableHeadSegmentsExist', async () => {
      expect(await segmentBuilder.tableHeadSegmentsExist()).to.be.true; 
    })
    it('tableHeadIDExist', async () => {
      expect(await segmentBuilder.tableHeadIDExist()).to.be.true; 
    })
    it('tableHeadUseCountExist', async () => {
      expect(await segmentBuilder.tableHeadUseCountExist()).to.be.true; 
    })
    it('tableHeadModifiedExist', async () => {
      expect(await segmentBuilder.tableHeadModifiedExist()).to.be.true; 
    })
    it('tableHeadCreatedExist', async () => {
      expect(await segmentBuilder.tableHeadCreatedExist()).to.be.true; 
    })
  })


  // it('searchFieldExist', async () => {
  //   expect(await segmentBuilder.searchFieldExist()).to.be.true; 
  // })
  // it('addSegmentButtonExist', async () => {
  //   expect(await segmentBuilder.addSegmentButtonExist()).to.be.true; 
  // })
  

})

afterEach(async () => {
  await browser.close()
})
