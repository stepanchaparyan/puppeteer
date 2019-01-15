import { expect } from 'chai'
import puppeteer from 'puppeteer'
import LocationManager from '../src/pageobjects/WTlocations';
import LoginPage from '../src/pageobjects/WTLoginPage';

let browser, page, loginPage, locationManager
let locations = 'manage/locations'
const viewport = { width: 1920, height: 1080 }
const showUI = {headless: false}
const showSlowMotion = {headless: false, slowMo: 300}

beforeEach(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
  await page.setViewport(viewport)
  locationManager = new LocationManager(page)
  loginPage = new LoginPage(page)
  await loginPage.open(locations)
  await loginPage.logIn()
})

describe(`Location Manager first page's elements exist`, async () => {
  context("pageHeader", async() => {
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
  context("orderLocationsByUse", async() => {
    it('InUseWorks', async () => {
      expect(await locationManager.orderByInUse()).to.be.true; 
    })
    it('notInUseWorks', async () => {
      expect(await locationManager.orderByNotInUse()).to.be.true; 
    })
    it('inUseLocationsCount', async () => {
      expect(await locationManager.inUseLocationsCount()).equal(14); 
    })
    it('notInUseLocationsCount', async () => {
      expect(await locationManager.notInUseLocationsCount()).equal(6) 
    })
    it('allLocationsCount', async () => {
      expect(await locationManager.allLocationsCount()).equal(20) 
    })
  })
  context("orderLocationsByHeader", async() => {
    it('orderByLocationName', async () => {
      expect(await locationManager.orderByLocationName()).to.deep.equal([ "WT222", "WT111" ])
    })
    it('orderByPageUseCount', async () => {
      expect(await locationManager.orderByPageUseCount()).equal(3)
    })
    it('orderByConversionUseCount', async () => {
      expect(await locationManager.orderByConversionUseCount()).equal(2); 
    })
    it('orderByModified', async () => {
      expect(await locationManager.orderByModified()).to.deep.equal([ '1/15/2019' ]) 
    })
    it('orderByCreated', async () => {
      expect(await locationManager.orderByCreated()).to.deep.equal([ '1/15/2019' ]) 
    })
  })
  context("navBarLocations", async() => {
    it('searchLocation', async () => {
      expect(await locationManager.searchLocation()).equal(3) 
    })
    it('gotoAddLocationPage', async () => {
      expect(await locationManager.gotoAddLocationPage()).to.be.true; 
    })
  })  
  context("updateLocation", async() => {
    it('usedLocationModalExist', async () => {
      await locationManager.makeScreenshotForUsedLocationUpdate()
      await locationManager.compareUpdateUsedLocationModal()
    })
    it('cancelUpdateForUsedLocation', async () => {
      expect(await locationManager.cancelUpdateUsedLocation()).to.be.true; 
    }) 
    it('updateUsedLocation', async () => {
      expect(await locationManager.updateUsedLocation()).to.be.true; 
    }) 
    it('updateNotUsedLocation', async () => {
      expect(await locationManager.updateNotUsedLocation()).to.be.true; 
    }) 
  })
  context("deleteLocation", async() => {
    it('usedLocationModalExist', async () => {
      await locationManager.makeScreenshotForUsedLocationDelete()
      await locationManager.compareDeleteUsedLocationModal()
    })
    it('cancelDeleteUsedLocation', async () => {
      expect(await locationManager.cancelDeleteUsedLocation()).to.be.true
    }) 
    it('deleteLocation', async () => {
      expect(await locationManager.deleteLocation()).to.be.true
    }) 
  })
  context("detailsPage", async() => {
    it('goToDetailsPageAndGoBack', async () => {
      expect(await locationManager.goToDetailsPageAndGoBack()).to.be.true
    })
  })
})    

afterEach(async () => {
  await browser.close()
})
