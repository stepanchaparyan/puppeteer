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

describe.skip(`first page's elements exist`, async () => {
  beforeEach(async () => {
    segmentBuilder = new SegmentBuilder(page)
    await segmentBuilder.open()
    await segmentBuilder.logIn()
  })
  context("mainPart", async() => {
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
  context("tableRows", async() => {
    it('tableRowSegmentsExist', async () => {
      expect(await segmentBuilder.tableRowSegmentsExist()).to.be.true; 
    })
    it('tableRowIDExist', async () => {
      expect(await segmentBuilder.tableRowIDExist()).to.be.true; 
    })
    it('tableRowUseCountExist', async () => {
      expect(await segmentBuilder.tableRowUseCountExist()).to.be.true; 
    })
    it('tableRowModifiedExist', async () => {
      expect(await segmentBuilder.tableRowModifiedExist()).to.be.true; 
    })
    it('tableRowCreatedExist', async () => {
      expect(await segmentBuilder.tableRowCreatedExist()).to.be.true; 
    })
    context("tableRowIcons", async() => {
      it('tableRowUpdateIconExist', async () => {
        expect(await segmentBuilder.tableRowUpdateIconExist()).to.be.true; 
      })
      it('tableRowDeleteIconExist', async () => {
        expect(await segmentBuilder.tableRowDeleteIconExist()).to.be.true; 
      })
      it('tableRowHiddenIconExist', async () => {
        expect(await segmentBuilder.tableRowHiddenIconExist()).to.be.true; 
      })
    })
  })
})

describe.skip(`addSegment page's elements exist`, async () => {
  beforeEach(async () => {
    segmentBuilder = new SegmentBuilder(page)
    await segmentBuilder.open()
    await segmentBuilder.logIn()
    await segmentBuilder.goToAddSegmentPage()
  })
  context(`mainPart's elements`, async() => {
    it('sectionCreateSegmentExist', async () => {
      expect(await segmentBuilder.sectionCreateSegmentExist()).to.be.true; 
    })
    it('segmentNameInputExist', async () => {
      expect(await segmentBuilder.segmentNameInputExist()).to.be.true; 
    })
    it('segmentDescriptionTitleExist', async () => {
      expect(await segmentBuilder.segmentDescriptionTitleExist()).to.be.true; 
    })
    it('segmentDescriptionInputExist', async () => {
      expect(await segmentBuilder.segmentDescriptionInputExist()).to.be.true; 
    })
    it('segmentCreatedDateExist', async () => {
      expect(await segmentBuilder.segmentCreatedDateExist()).to.be.true; 
    })
    it('dropAttributeHereFieldExist', async () => {
      expect(await segmentBuilder.dropAttributeHereFieldExist()).to.be.true; 
    })
    it('droppableSectionArrowExist', async () => {
      expect(await segmentBuilder.droppableSectionArrowExist()).to.be.true; 
    })
    it('cancellButtonExist', async () => {
      expect(await segmentBuilder.cancelButtonExist()).to.be.true; 
    })
    it('saveButtonExist', async () => {
      expect(await segmentBuilder.saveButtonExist()).to.be.true; 
    })

    it('categoryMySegmentsExist', async () => {
      expect(await segmentBuilder.categoryMySegmentsExist()).to.be.true; 
    })
    it('categoryMySegmentsImageExist', async () => {
      expect(await segmentBuilder.categoryMySegmentsImageExist()).to.be.true; 
    })
    it('categoryMySegmentsAngleRightExist', async () => {
      expect(await segmentBuilder.categoryMySegmentsAngleRightExist()).to.be.true; 
    })   
  })
})

describe.skip(`mySegment page's elements exist`, async () => {
  beforeEach(async () => {
    segmentBuilder = new SegmentBuilder(page)
    await segmentBuilder.open()
    await segmentBuilder.logIn()
    await segmentBuilder.goToAddSegmentPage()
    await segmentBuilder.goToMySegmentsList()
  })
  it('categoryMySegmentsIcon1Exist', async () => {
    expect(await segmentBuilder.categoryMySegmentsIcon1Exist()).to.be.true; 
  })
  it('categoryMySegmentsIcon2Exist', async () => {
    expect(await segmentBuilder.categoryMySegmentsIcon2Exist()).to.be.true; 
  })
  it('categoryMySegmentsNameExist', async () => {
    expect(await segmentBuilder.categoryMySegmentsNameExist()).to.be.true; 
  })
  it('mySegmentsCount', async () => {
    expect(await segmentBuilder.mySegmentsCount()).to.equal(8); 
  })
})

describe(`segments' categories exist`, async () => {
  beforeEach(async () => {
    segmentBuilder = new SegmentBuilder(page)
    await segmentBuilder.open()
    await segmentBuilder.logIn()
    await segmentBuilder.goToAddSegmentPage()
  })
  it('categoryTrafficSourceExist', async () => {
    expect(await segmentBuilder.categoryTrafficSourceList()).to.deep.equal([ `Referrer\n`, `Current URL\n`, `Referrer: Host\n`, `Search Engine Keyword\n`, `Referrer: Attribute\n` ]);
  })
  
  // it('categoryMySegmentsIcon2Exist', async () => {
  //   expect(await segmentBuilder.categoryMySegmentsIcon2Exist()).to.be.true; 
  // })
  // it('categoryMySegmentsNameExist', async () => {
  //   expect(await segmentBuilder.categoryMySegmentsNameExist()).to.be.true; 
  // })
  // it('mySegmentsCount', async () => {
  //   expect(await segmentBuilder.mySegmentsCount()).to.equal(8); 
  // })
})

afterEach(async () => {
  await browser.close()
})
