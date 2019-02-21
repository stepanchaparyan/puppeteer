import puppeteer from 'puppeteer';
import {expect} from 'chai';
import LocationManager from '../src/pageobjects/WTlocations';
import LoginPage from '../src/pageobjects/WTloginPage';

let browser, page, loginPage, locationManager;
let locations = 'manage/locations';
const viewport = {width: 1920, height: 1080};
//const showUI = {headless: false};
//const showSlowMotion = {headless: false, slowMo: 300};

describe('Location Manager first page elements exist', () => {
    before(async() => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.setViewport(viewport);
        locationManager = new LocationManager(page);
        loginPage = new LoginPage(page);
        await loginPage.open(locations);
        await loginPage.logIn();
    });
    after(async() => {
        await browser.close();
    });
    context('pageHeader', () => {
        it('logoExist', async() => {
            expect(await locationManager.logoExist()).to.equal(true);
        });
        it('titleExist', async() => {
            expect(await locationManager.titleExist()).to.equal(true);
        });
        it('searchFieldExist', async() => {
            expect(await locationManager.searchFieldExist()).to.equal(true);
        });
        it('addLocationButtonExist', async() => {
            expect(await locationManager.addLocationButtonExist()).to.equal(true);
        });
        it('allLocationsFilterExist', async() => {
            expect(await locationManager.allLocationsFilterExist()).to.equal(true);
        });
        it('inUseFilterExist', async() => {
            expect(await locationManager.inUseFilterExist()).to.equal(true);
        });
        it('notInUseFilterExist', async() => {
            expect(await locationManager.notInUseFilterExist()).to.equal(true);
        });
    });
    context('tableHeads', () => {
        it('tableHeadLocationsExist', async() => {
            expect(await locationManager.tableHeadLocationsExist()).to.equal(true);
        });
        it('tableHeadPageUseCountExist', async() => {
            expect(await locationManager.tableHeadPageUseCountExist()).to.equal(true);
        });
        it('tableHeadConversionUseCountExist', async() => {
            expect(await locationManager.tableHeadConversionUseCountExist()).to.equal(true);
        });
        it('tableHeadModifiedExist', async() => {
            expect(await locationManager.tableHeadModifiedExist()).to.equal(true);
        });
        it('tableHeadCreatedExist', async() => {
            expect(await locationManager.tableHeadCreatedExist()).to.equal(true);
        });
    });
    context('tableRows', () => {
        it('tableRowLocationsExist', async() => {
            expect(await locationManager.tableRowLocationsExist()).to.equal(true);
        });
        it('tableRowPageUseCountExist', async() => {
            expect(await locationManager.tableRowPageUseCountExist()).to.equal(true);
        });
        it('tableRowConversionUseCountExist', async() => {
            expect(await locationManager.tableRowConversionUseCountExist()).to.equal(true);
        });
        it('tableRowModifiedExist', async() => {
            expect(await locationManager.tableRowModifiedExist()).to.equal(true);
        });
        it('tableRowCreatedExist', async() => {
            expect(await locationManager.tableRowCreatedExist()).to.equal(true);
        });
        context('tableRowIcons', () => {
            it('tableRowUpdateIconExist', async() => {
                expect(await locationManager.tableRowUpdateIconExist()).to.equal(true);
            });
            it('tableRowDeleteIconExist', async() => {
                expect(await locationManager.tableRowDeleteIconExist()).to.equal(true);
            });
            it('tableRowHiddenIconExist', async() => {
                expect(await locationManager.tableRowHiddenIconExist()).to.equal(true);
            });
        });
    });
});

describe('Location Manager first page functionality', () => {
    before(async() => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.setViewport(viewport);
        locationManager = new LocationManager(page);
        loginPage = new LoginPage(page);
        await loginPage.open(locations);
        await loginPage.logIn();
    });
    after(async() => {
        await browser.close();
    });
    context('orderLocationsByUse', () => {
        it('allLocationsCount', async() => {
            expect(await locationManager.allLocationsCount()).equal(19);
        });
        it('inUseLocationsCount', async() => {
            expect(await locationManager.inUseLocationsCount()).equal(14);
        });
        it('notInUseLocationsCount', async() => {
            expect(await locationManager.notInUseLocationsCount()).equal(5);
        });
        it('InUseFilter', async() => {
            expect(await locationManager.orderByInUse()).to.equal(true);
        });
        it('notInUseFilter', async() => {
            expect(await locationManager.orderByNotInUse()).to.equal(true);
        });
    });
    context('orderLocationsByHeader', () => {
        it('orderByLocationName', async() => {
            expect(await locationManager.orderByLocationName()).to.deep.equal([ 'WT222', 'WT111' ]);
        });
        it('orderByPageUseCount', async() => {
            expect(await locationManager.orderByPageUseCount()).equal(3);
        });
        it('orderByConversionUseCount', async() => {
            expect(await locationManager.orderByConversionUseCount()).equal(2);
        });
        it('orderByModified', async() => {
            expect(await locationManager.orderByModified()).to.deep.equal([ '1/23/2019' ]);
        });
        it('orderByCreated', async() => {
            expect(await locationManager.orderByCreated()).to.deep.equal([ '1/17/2019' ]);
        });
    });
    context('navBarLocations', () => {
        it('searchLocation', async() => {
            expect(await locationManager.searchLocation()).equal(1);
        });
        it('gotoAddLocationPage', async() => {
            expect(await locationManager.gotoAddLocationPage()).to.equal(true);
        });
    });
    context('updateLocation', () => {
        it('usedLocationModalExist', async() => {
            await locationManager.makeScreenshotForUsedLocationUpdate();
            await locationManager.compareUpdateUsedLocationModal();
        });
        it('cancelUpdateForUsedLocation', async() => {
            expect(await locationManager.cancelUpdateUsedLocation()).to.equal(true);
        });
        it('updateUsedLocation', async() => {
            expect(await locationManager.updateUsedLocation()).to.equal(true);
        });
        it('updateNotUsedLocation', async() => {
            expect(await locationManager.updateNotUsedLocation()).to.equal(true);
        });
    });
    context('deleteLocation', () => {
        it('usedLocationModalExist', async() => {
            await locationManager.makeScreenshotForUsedLocationDelete();
            await locationManager.compareDeleteUsedLocationModal();
        });
        it('cancelDeleteUsedLocation', async() => {
            expect(await locationManager.cancelDeleteUsedLocation()).to.equal(true);
        });
        it('deleteLocation', async() => {
            expect(await locationManager.deleteLocation()).to.equal(true);
        });
    });
    context('detailsPage', () => {
        it('goToDetailsPageAndGoBack', async() => {
            expect(await locationManager.goToDetailsPageAndGoBack()).to.equal(true);
        });
    });
});