import { expect } from 'chai'
import puppeteer from 'puppeteer'
import fs from 'fs-extra'
import { PNG } from 'pngjs'
import pixelmatch from "pixelmatch"
import LocationManager from '../pageobjects/WTlocations';

let browser, page, locationManager
const viewport = { width: 1920, height: 1080 }
const showUI = {headless: false}
const showSlowMotion = {headless: false, slowMo: 300}

beforeEach(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
  await page.setViewport(viewport)
})

describe(`Location Manager first page's elements exist`, async () => {
  beforeEach(async () => {
    locationManager = new LocationManager(page)
    await locationManager.open()
    await locationManager.logIn()
  })
  context("mainPart", async() => {
    it('logoExist', async () => {
      expect(await locationManager.logoExist()).to.be.true; 
    })
    it('titleExist', async () => {
      expect(await locationManager.titleExist()).to.be.true; 
    })
    it('searchFieldExist', async () => {
      expect(await locationManager.searchFieldExist()).to.be.true; 
    })
    it('addLocationButtonExist', async () => {
      expect(await locationManager.addLocationButtonExist()).to.be.true; 
    })
    it('allLocationsFilterExist', async () => {
      expect(await locationManager.allLocationsFilterExist()).to.be.true; 
    })
    it('inUseFilterExist', async () => {
      expect(await locationManager.inUseFilterExist()).to.be.true; 
    })
    it('notInUseFilterExist', async () => {
      expect(await locationManager.notInUseFilterExist()).to.be.true; 
    })
  })
  context("tableHeads", async() => {
    it('tableHeadLocationsExist', async () => {
      expect(await locationManager.tableHeadLocationsExist()).to.be.true; 
    })
    it('tableHeadPageUseCountExist', async () => {
      expect(await locationManager.tableHeadPageUseCountExist()).to.be.true; 
    })
    it('tableHeadConversionUseCountExist', async () => {
      expect(await locationManager.tableHeadConversionUseCountExist()).to.be.true; 
    })
    it('tableHeadModifiedExist', async () => {
      expect(await locationManager.tableHeadModifiedExist()).to.be.true; 
    })
    it('tableHeadCreatedExist', async () => {
      expect(await locationManager.tableHeadCreatedExist()).to.be.true; 
    })
  })
  context("tableRows", async() => {
    it('tableRowLocationsExist', async () => {
      expect(await locationManager.tableRowLocationsExist()).to.be.true; 
    })
    it('tableRowPageUseCountExist', async () => {
      expect(await locationManager.tableRowPageUseCountExist()).to.be.true; 
    })
    it('tableRowConversionUseCountExist', async () => {
      expect(await locationManager.tableRowConversionUseCountExist()).to.be.true; 
    })
    it('tableRowModifiedExist', async () => {
      expect(await locationManager.tableRowModifiedExist()).to.be.true; 
    })
    it('tableRowCreatedExist', async () => {
      expect(await locationManager.tableRowCreatedExist()).to.be.true; 
    })
    context("tableRowIcons", async() => {
      it('tableRowUpdateIconExist', async () => {
        expect(await locationManager.tableRowUpdateIconExist()).to.be.true; 
      })
      it('tableRowDeleteIconExist', async () => {
        expect(await locationManager.tableRowDeleteIconExist()).to.be.true; 
      })
      it('tableRowHiddenIconExist', async () => {
        expect(await locationManager.tableRowHiddenIconExist()).to.be.true; 
      })
    })
  })
})

describe(`Location Manager first page's functionality`, async () => {
  beforeEach(async () => {
    locationManager = new LocationManager(page)
    await locationManager.open()
    await locationManager.logIn()
  })
  context.only("orderLocationsByUse", async() => {
    it.only('InUseWorks', async () => {
      expect(await locationManager.orderByInUse()).to.be.true; 
    })
    it('notInUseWorks', async () => {
      expect(await locationManager.orderByNotInUse()).to.be.true; 
    })
    it.only('inUseLocationsCount', async () => {
      expect(await locationManager.inUseLocationsCount()).equal(11); 
    })
    it('notInUseLocationsCount', async () => {
      expect(await locationManager.notInUseLocationsCount()).equal(2) 
    })
    it('allLocationsCount', async () => {
      expect(await locationManager.allLocationsCount()).equal(10) 
    })
  })
  context("orderSegmentsByHeader", async() => {
    it('orderBySegmentsName', async () => {
      expect(await segmentBuilder.orderBySegmentsName()).to.deep.equal([ "Armenia", "Armenia 2" ])
    })
    it('orderByID', async () => {
      expect(await segmentBuilder.orderByID()).equal(1883375)
    })
    it('orderByUseCount', async () => {
      expect(await segmentBuilder.orderByUseCount()).equal(3); 
    })
    it('orderByModified', async () => {
      expect(await segmentBuilder.orderByModified()).to.deep.equal([ '12/4/2018' ]) 
    })
    it('orderByCreated', async () => {
      expect(await segmentBuilder.orderByCreated()).to.deep.equal([ '12/4/2018' ]) 
    })
  })
  context("navBarSegments", async() => {
    it('searchSegment', async () => {
      expect(await segmentBuilder.searchSegment()).equal(2) 
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
    it('deleteSegment', async () => {
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
