import { expect } from 'chai'
import puppeteer from 'puppeteer'
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

describe("Segment Builder first page's elements exist", async () => {
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

describe.only("first page's functionality", async () => {
  beforeEach(async () => {
    segmentBuilder = new SegmentBuilder(page)
    await segmentBuilder.open()
    await segmentBuilder.logIn()
  })
  context("orderSegmentsByUse", async() => {
    it('orderByInUse', async () => {
      expect(await segmentBuilder.orderByInUse()).to.be.true; 
    })
    it('orderByNotInUse', async () => {
      expect(await segmentBuilder.orderByNotInUse()).to.be.true; 
    })
    it('inUseSegmentsCount', async () => {
      expect(await segmentBuilder.inUseSegmentsCount()).equal(9); 
    })
    it('notInUseSegmentsCount', async () => {
      expect(await segmentBuilder.notInUseSegmentsCount()).equal(4) 
    })
    it('allSegmentsCount', async () => {
      expect(await segmentBuilder.allSegmentsCount()).equal(13) 
    })
  })
  context("orderSegmentsByHeader", async() => {
    it('orderBySegmentsName', async () => {
      expect(await segmentBuilder.orderBySegmentsName()).to.deep.equal([ "Armenia", "Armenia2" ])
    })
    it('orderByID', async () => {
      expect(await segmentBuilder.orderByID()).equal(1888514)
    })
    it('orderByUseCount', async () => {
      expect(await segmentBuilder.orderByUseCount()).equal(4); 
    })
    it('orderByModified', async () => {
      expect(await segmentBuilder.orderByModified()).to.deep.equal([ '12/21/2018' ]) 
    })
    it('orderByCreated', async () => {
      expect(await segmentBuilder.orderByCreated()).to.deep.equal([ '12/21/2018' ]) 
    })
  })
  context("navBarSegments", async() => {
    it('searchSegment', async () => {
      expect(await segmentBuilder.searchSegment()).equal(3) 
    })
    it('gotToAddSegmentPage', async () => {
      expect(await segmentBuilder.gotoAddSegmentPage()).to.be.true; 
    })
  })  
  context("updateSegment", async() => {
    it('usedSegmentModalExist', async () => {
      await segmentBuilder.makeScreenshotForSegUsedSegmentUpdate()
      await segmentBuilder.updateSegUsedSegmentModal()
    })
    it('notUsedSegmentModalExist', async () => {
      await segmentBuilder.makeScreenshotForTestUsedSegmentUpdate()
      await segmentBuilder.updateTestUsedSegmentModal()
    })
    it('updateSegment', async () => {
      expect(await segmentBuilder.updateSegment()).to.be.true; 
    }) 
    it('cancelUpdateSegmentUsedByOtherSegment', async () => {
      expect(await segmentBuilder.cancelUpdateSegmentUsedByOtherSegment()).to.be.true; 
    }) 
    it('cancelUpdateSegmentUsedByTest', async () => {
      expect(await segmentBuilder.cancelUpdateSegmentUsedByTest()).to.be.true; 
    })  
    it('editSegmentUsedByTest', async () => {
      expect(await segmentBuilder.editSegmentUsedByTest()).to.be.true; 
    }) 
  })
  context("deleteSegment", async() => {
    it('usedSegmentModalExist', async () => {
      await segmentBuilder.makeScreenshotForSegUsedSegmentDelete()
      await segmentBuilder.deleteSegUsedSegmentModal()
    })
    it('usedTestModalExist', async () => {
      await segmentBuilder.makeScreenshotForTestUsedSegmentDelete()
      await segmentBuilder.deleteTestUsedSegmentModal()
    })
    it.skip('deleteSegment', async () => {
      expect(await segmentBuilder.deleteSegment()).to.be.true
    }) 
    it('cancelDeleteSegment', async () => {
      expect(await segmentBuilder.cancelDeleteSegment()).to.be.true
    }) 
    it('cancelDeleteSegmentUsedByOtherSegment', async () => {
      expect(await segmentBuilder.cancelDeleteSegmentUsedByOtherSegment()).to.be.true 
    }) 
    it('cancelDeleteSegmentUsedByTest', async () => {
      expect(await segmentBuilder.cancelDeleteSegmentUsedByTest()).to.be.true
    })  
  })
  context("detailsPage", async() => {
    it('goToDetailsPageAndGoBack', async () => {
      expect(await segmentBuilder.goToDetailsPageAndGoBack()).to.be.true
    })
  })
})    

afterEach(async () => {
  await browser.close()
})
