import {expect} from 'chai';
import fs from 'fs-extra';
import {PNG} from 'pngjs';
import pixelmatch from 'pixelmatch';
import {LOCATIONS, CREATE_LOCATIONS} from '../helpers/constants/locationManagerConstants.js';
import Utils from '../helpers/utils';


export default class LocationManager {
    constructor(page) {
        this.page = page;
        this.utils = new Utils(page);
    }
    async logoExist() {
        return await this.page.$(LOCATIONS.SELECTORS.LOGO) !== null;
    }
    async titleExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TITLE) !== null;
    }
    async searchFieldExist() {
        return await this.page.$(LOCATIONS.SELECTORS.SEARCH_FIELD) !== null;
    }
    async addLocationButtonExist() {
        return await this.page.$(LOCATIONS.SELECTORS.ADD_LOCATION_BUTTON) !== null;
    }
    // Filter by Use/Not Use
    async allLocationsFilterExist() {
        return await this.page.$(LOCATIONS.SELECTORS.ALL_LOCATIONS_FILTER) !== null;
    }
    async inUseFilterExist() {
        return await this.page.$(LOCATIONS.SELECTORS.IN_USE_FILTER) !== null;
    }
    async notInUseFilterExist() {
        return await this.page.$(LOCATIONS.SELECTORS.NOT_IN_USE_FILTER) !== null;
    }
    // Table Head Elements
    async tableHeadLocationsExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TABLE_HEADER_LOCATIONS) !== null;
    }
    async tableHeadPageUseCountExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TABLE_HEADER_PAGE_USE_COUNT) !== null;
    }
    async tableHeadConversionUseCountExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TABLE_HEADER_CONV_USE_COUNT) !== null;
    }
    async tableHeadModifiedExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TABLE_HEADER_MODIFIED) !== null;
    }
    async tableHeadCreatedExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TABLE_HEADER_CREATED) !== null;
    }
    // Table Row elements and buttons
    async tableRowLocationsExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TABLE_ROW_LOCATIONS) !== null;
    }
    async tableRowPageUseCountExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TABLE_ROW_PAGE_USE_COUNT) !== null;
    }
    async tableRowConversionUseCountExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TABLE_ROW_CONV_USE_COUNT) !== null;
    }
    async tableRowModifiedExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TABLE_ROW_MODIFIED) !== null;
    }
    async tableRowCreatedExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TABLE_ROW_CREATED) !== null;
    }
    async tableRowUpdateIconExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TABLE_ROW_EDIT_ICON) !== null;
    }
    async tableRowDeleteIconExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TABLE_ROW_DELETE_ICON) !== null;
    }
    async tableRowHiddenIconExist() {
        return await this.page.$(LOCATIONS.SELECTORS.TABLE_ROW_HIDDEN_ICON) !== null;
    }
    // order By Use/In Use and counts
    async allLocationsCount() {
        const allLocationsCount = await this.page.$$eval(LOCATIONS.SELECTORS.ROWS, locations => locations.length);
        return await allLocationsCount;
    }
    async notInUseLocationsCount() {
        await this.page.click(LOCATIONS.SELECTORS.NOT_IN_USE_FILTER);
        const notInUseLocationsCount = await this.page.$$eval(LOCATIONS.SELECTORS.ROWS, locations => locations.length);
        return await notInUseLocationsCount;
    }
    async inUseLocationsCount() {
        await this.page.click(LOCATIONS.SELECTORS.IN_USE_FILTER);
        const inUseLocationsCount = await this.page.$$eval(LOCATIONS.SELECTORS.ROWS_CHILD_2, locations => locations.length);
        return await inUseLocationsCount;
    }
    async orderByInUse() {
        await this.page.click(LOCATIONS.SELECTORS.IN_USE_FILTER);
        const isNotZero = (currentValue) => currentValue > 0;
        const inUseLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(2)'));
            return cards.map(card => card.innerText);
        });
        return await inUseLocations.every(isNotZero);
    }
    async orderByNotInUse() {
        await this.page.click(LOCATIONS.SELECTORS.NOT_IN_USE_FILTER);
        const isZero = (currentValue) => currentValue == 0;
        const notInUseLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(2)'));
            return cards.map(card => card.innerText);
        });
        return await notInUseLocations.every(isZero);
    }

    async orderByLocationName() {
        await this.page.click(LOCATIONS.SELECTORS.TABLE_HEADER_LOCATIONS);
        const orderedLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(1)'));
            return cards.map(card => card.innerText).slice(0,2);
        });
        return await orderedLocations;
    }
    async orderByPageUseCount() {
        await this.page.click(LOCATIONS.SELECTORS.ALL_LOCATIONS_FILTER);
        await this.page.click(LOCATIONS.SELECTORS.TABLE_HEADER_PAGE_USE_COUNT);
        const orderedLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(2)'));
            return cards.map(card => card.innerText);
        });
        return await Math.max(...orderedLocations);
    }
    async orderByConversionUseCount() {
        await this.page.click(LOCATIONS.SELECTORS.ALL_LOCATIONS_FILTER);
        await this.page.click(LOCATIONS.SELECTORS.TABLE_HEADER_CONV_USE_COUNT);
        const orderedLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(3)'));
            return cards.map(card => card.innerText);
        });
        return await Math.max(...orderedLocations);
    }
    async orderByModified() {
        await this.page.click(LOCATIONS.SELECTORS.TABLE_HEADER_MODIFIED);
        const orderedLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(4)'));
            return cards.map(card => card.innerText);
        });
        return await orderedLocations.slice(0,1);
    }
    async orderByCreated() {
        await this.page.click(LOCATIONS.SELECTORS.TABLE_HEADER_CREATED);
        const orderedLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(5)'));
            return cards.map(card => card.innerText);
        });
        return await orderedLocations.slice(0,1);
    }
    //  search segment
    async searchLocation() {
        await this.page.type(LOCATIONS.SELECTORS.SEARCH_INPUT, 'w');
        const allLocationsCount = await this.page.$$eval(LOCATIONS.SELECTORS.ROWS, locations => locations.length);
        await this.page.keyboard.down('Backspace');
        return await allLocationsCount;
    }
    //  go to add segment page
    async gotoAddLocationPage() {
        await this.page.click(LOCATIONS.SELECTORS.ADD_LOCATION_BUTTON);
        await this.page.click(CREATE_LOCATIONS.SELECTORS.CANCELL_BUTTON);
        await this.page.waitForSelector(CREATE_LOCATIONS.SELECTORS.MODAL_CANCELL_CHANGES, {visible: true});
        await this.page.click(CREATE_LOCATIONS.SELECTORS.YES_BUTTON_ON_MODAL_CANCELL_CHANGES);
        return await this.page.$(LOCATIONS.SELECTORS.ADD_LOCATION_PAGE_ADD_ICON) === null;
    }

    async makeScreenshotForUsedLocationUpdate() {
        await this.page.reload();
        await this.page.waitForSelector(LOCATIONS.SELECTORS.TITLE, {visible:true});

        const number = await this.utils.getCorrespondingRow('for_testing_used_location');
        await this.page.hover(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number})`);
        await this.page.click(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`);
        await this.page.waitForSelector(LOCATIONS.SELECTORS.MODAL_UPDATE_USED_LOCATION, {visible: true});
        const overlay = await this.page.$(LOCATIONS.SELECTORS.MODAL_UPDATE_USED_LOCATION);
        await this.page.waitFor(1000);
        await overlay.screenshot({path: `${LOCATIONS.TEMPORARY_SCREENSHOTS}/updateLocation1.png`});
    }

    async compareUpdateUsedLocationModal() {
        const img1 = fs.createReadStream(`${LOCATIONS.TEMPORARY_SCREENSHOTS}/updateLocation1.png`).pipe(new PNG()).on('parsed', doneReading);
        const img2 = fs.createReadStream(`${LOCATIONS.SCREENSHOTS}/updateLocation2.png`).pipe(new PNG()).on('parsed', doneReading);
        let filesRead = 0;
        let numDiffPixel;

        function doneReading() {
            if (++filesRead < 2) {return;}
            let diff = new PNG({width: img1.width, height: img1.height});
            numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1});
            //console.log('pixel diff is: ' + numDiffPixel);
            //diff.pack().pipe(fs.createWriteStream(LOCATIONS.TEMPORARY_SCREENSHOTS + '/diff1.png'));
            expect(numDiffPixel).equal(0);
        }
    }

    // cancel update location (for used locations)
    async cancelUpdateUsedLocation() {
        const number = await this.utils.getCorrespondingRow('for_testing_used_location');
        await this.page.hover(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number})`);
        await this.page.click(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`);
        await this.page.waitForSelector(LOCATIONS.SELECTORS.MODAL_UPDATE_USED_LOCATION, {visible: true});
        await this.page.click(LOCATIONS.SELECTORS.NO_BUTTON_ON_UPDATE_MODAL_USED_LOCATION);
        return await this.page.$(LOCATIONS.SELECTORS.MODAL_UPDATE_USED_LOCATION) === null;
    }
    // edit/update location which is used by other test/conversion
    async updateUsedLocation() {
        await this.page.reload();
        await this.page.waitForSelector(LOCATIONS.SELECTORS.TITLE, {visible:true});

        const number = await this.utils.getCorrespondingRow('for_testing_used_location');
        await this.page.hover(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number})`);
        await this.page.click(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`);
        await this.page.waitForSelector(LOCATIONS.SELECTORS.YES_BUTTON_ON_UPDATE_MODAL_USED_LOCATION, {visible: true});
        await this.page.click(LOCATIONS.SELECTORS.YES_BUTTON_ON_UPDATE_MODAL_USED_LOCATION);
        await this.page.waitForSelector(LOCATIONS.SELECTORS.DESCRIPTION_INPUT, {visible: true});
        let descriptionInputField = await this.page.$(LOCATIONS.SELECTORS.DESCRIPTION_INPUT);
        let descriptionOldText = await descriptionInputField.getProperty('value');
        await this.page.waitFor(1000);
        await this.page.type(LOCATIONS.SELECTORS.DESCRIPTION_INPUT, 'A');
        await this.page.click(LOCATIONS.SELECTORS.SAVE_BUTTON_EDIT_LOCATION);
        await this.page.waitForSelector(LOCATIONS.SELECTORS.YES_BUTTON_ON_SAVE_MODAL_EDIT_LOCATION, {visible: true});
        await this.page.click(LOCATIONS.SELECTORS.YES_BUTTON_ON_SAVE_MODAL_EDIT_LOCATION);
        descriptionInputField = await this.page.$(LOCATIONS.SELECTORS.DESCRIPTION_INPUT);
        let descriptionNewText = await descriptionInputField.getProperty('value');
        //console.log('11 ' + descriptionNewText)
        let condition = descriptionOldText < descriptionNewText ? true : false;

        // return to description default value
        await this.page.waitFor(2000);
        await this.page.hover(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number})`);
        await this.page.click(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`);
        await this.page.waitForSelector(LOCATIONS.SELECTORS.YES_BUTTON_ON_UPDATE_MODAL_USED_LOCATION, {visible: true});
        await this.page.click(LOCATIONS.SELECTORS.YES_BUTTON_ON_UPDATE_MODAL_USED_LOCATION);
        await this.page.waitForSelector(LOCATIONS.SELECTORS.DESCRIPTION_INPUT, {visible: true});
        await this.page.waitFor(1000);
        await this.page.click(LOCATIONS.SELECTORS.DESCRIPTION_INPUT);
        await this.page.keyboard.down('Backspace');
        await this.page.click(LOCATIONS.SELECTORS.SAVE_BUTTON_EDIT_LOCATION);
        await this.page.click(LOCATIONS.SELECTORS.YES_BUTTON_ON_SAVE_MODAL_EDIT_LOCATION);
        descriptionInputField = await this.page.$(LOCATIONS.SELECTORS.DESCRIPTION_INPUT);
        //let descriptionDefault = await descriptionInputField.getProperty('value');
        //console.log('22 ' + descriptionDefault);
        return await condition;
    }
    // edit/update segment which is not used by other test/target or segment
    async updateNotUsedLocation() {
        await this.page.reload();
        await this.page.waitForSelector(LOCATIONS.SELECTORS.TITLE, {visible:true});

        const number = await this.utils.getCorrespondingRow('for_testing_not_used_location');
        await this.page.hover(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number})`);
        await this.page.click(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`);
        await this.page.waitForSelector(LOCATIONS.SELECTORS.DESCRIPTION_INPUT, {visible: true});
        let descriptionInputField = await this.page.$(LOCATIONS.SELECTORS.DESCRIPTION_INPUT);
        let descriptionOldText = await descriptionInputField.getProperty('value');
        await this.page.type(LOCATIONS.SELECTORS.DESCRIPTION_INPUT, 'A');
        await this.page.click(LOCATIONS.SELECTORS.SAVE_BUTTON_EDIT_LOCATION);
        await this.page.click(LOCATIONS.SELECTORS.YES_BUTTON_ON_SAVE_MODAL_EDIT_LOCATION);
        await this.page.hover(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number})`);
        await this.page.click(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`);
        await this.page.waitForSelector(LOCATIONS.SELECTORS.DESCRIPTION_INPUT, {visible: true});
        descriptionInputField = await this.page.$(LOCATIONS.SELECTORS.DESCRIPTION_INPUT);
        let descriptionNewText = await descriptionInputField.getProperty('value');
        //console.log('33 ' + descriptionNewText)
        let condition = descriptionOldText < descriptionNewText ? true : false;

        // return to description default value
        await this.page.waitFor(2000);
        await this.page.hover(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number})`);
        await this.page.click(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`);
        await this.page.waitForSelector(LOCATIONS.SELECTORS.DESCRIPTION_INPUT, {visible: true});
        await this.page.click(LOCATIONS.SELECTORS.DESCRIPTION_INPUT);
        await this.page.keyboard.down('Backspace');
        await this.page.click(LOCATIONS.SELECTORS.SAVE_BUTTON_EDIT_LOCATION);
        await this.page.click(LOCATIONS.SELECTORS.YES_BUTTON_ON_SAVE_MODAL_EDIT_LOCATION);
        await this.page.hover(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number})`);
        await this.page.click(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`);
        await this.page.waitForSelector(LOCATIONS.SELECTORS.DESCRIPTION_INPUT, {visible: true});
        descriptionInputField = await this.page.$(LOCATIONS.SELECTORS.DESCRIPTION_INPUT);
        //let descriptionDefault = await descriptionInputField.getProperty('value');
        //console.log('44 ' + descriptionDefault);
        return await condition;
    }

    async makeScreenshotForUsedLocationDelete() {
        await this.page.reload();
        await this.page.waitForSelector(LOCATIONS.SELECTORS.TITLE, {visible:true});

        const number = await this.utils.getCorrespondingRow('for_testing_used_location');
        await this.page.hover(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number})`);
        await this.page.click(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number}) > td.td--buttons > button.icon-button.delete.btn.btn-link > svg`);
        await this.page.waitForSelector(LOCATIONS.SELECTORS.MODAL_DELETE_USED_LOCATION, {visible: true});
        const overlay = await this.page.$(LOCATIONS.SELECTORS.MODAL_DELETE_USED_LOCATION);
        await this.page.waitFor(5000);
        await overlay.screenshot({path: `${LOCATIONS.TEMPORARY_SCREENSHOTS}/deleteLocation1.png`});
    }
    async compareDeleteUsedLocationModal() {
        const img1 = fs.createReadStream(`${LOCATIONS.TEMPORARY_SCREENSHOTS}/deleteLocation1.png`).pipe(new PNG()).on('parsed', doneReading);
        const img2 = fs.createReadStream(`${LOCATIONS.SCREENSHOTS}/deleteLocation2.png`).pipe(new PNG()).on('parsed', doneReading);
        let filesRead = 0;
        let numDiffPixel;

        function doneReading() {
            if (++filesRead < 2) {return;}
            let diff = new PNG({width: img1.width, height: img1.height});
            numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1});
            //console.log('pixel diff is: ' + numDiffPixel)
            //diff.pack().pipe(fs.createWriteStream(LOCATIONS.TEMPORARY_SCREENSHOTS + '/diff1.png'))
            expect(numDiffPixel).equal(0);
        }
    }
    async cancelDeleteUsedLocation() {
        await this.page.reload();
        await this.page.waitForSelector(LOCATIONS.SELECTORS.TITLE, {visible:true});

        const number = await this.utils.getCorrespondingRow('for_testing_used_location');
        await this.page.hover(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number})`);
        await this.page.click(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number}) > td.td--buttons > button.icon-button.delete.btn.btn-link > svg`);
        await this.page.waitForSelector(LOCATIONS.SELECTORS.MODAL_DELETE_USED_LOCATION, {visible: true});
        await this.page.click(LOCATIONS.SELECTORS.CANCELL_BUTTON_DELETE_USED_LOCATION);
        return await this.page.$(LOCATIONS.SELECTORS.MODAL_DELETE_USED_LOCATION) === null;
    }

    async createNewLocation(name, url) {
        await this.page.click(LOCATIONS.SELECTORS.ADD_LOCATION_BUTTON);
        await this.page.waitForSelector(CREATE_LOCATIONS.SELECTORS.LOCATION_NAME_INPUT, {visible: true});
        await this.page.type(CREATE_LOCATIONS.SELECTORS.LOCATION_NAME_INPUT, name);
        await this.page.waitForSelector(CREATE_LOCATIONS.SELECTORS.URL_INPUT, {visible: true});
        await this.page.type(CREATE_LOCATIONS.SELECTORS.URL_INPUT, url);
        await this.page.click(CREATE_LOCATIONS.SELECTORS.SAVE_BUTTON);
        await this.page.click(CREATE_LOCATIONS.SELECTORS.YES_BUTTON_ON_SAVE_MODAL);
        await this.page.waitFor(3000);
    }

    async deleteNotUsedLocation(number) {
        await this.page.hover(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number})`);
        await this.page.click(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number}) > td.td--buttons > button.icon-button.delete.btn.btn-link > svg`);
        await this.page.waitFor(1000);
        await this.page.click(LOCATIONS.SELECTORS.YES_BUTTON_DELETE_LOCATION);
        await this.page.waitFor(3000);
    }

    async deleteLocation() {
        await this.page.reload();
        await this.page.waitForSelector(LOCATIONS.SELECTORS.TITLE, {visible:true});

        const number = await this.utils.getCorrespondingRow('for_testing_for_delete');
        let locationName;
        if (number === 0) {
            await this.createNewLocation('for_testing_for_delete', 'www.youtube.com');
            const number = await this.utils.getCorrespondingRow('for_testing_for_delete');
            await this.deleteNotUsedLocation(number);
        } else {
            await this.deleteNotUsedLocation(number);
            locationName = await this.page.$eval(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(${number}) > td:nth-child(1)`, el => el.innerText);
        }
        return (locationName !== 'for_testing_for_delete' ? true : false);
    }

    async goToDetailsPageAndGoBack() {
        await this.page.reload();
        await this.page.waitForSelector(LOCATIONS.SELECTORS.TITLE, {visible:true});

        await this.page.click(`${LOCATIONS.SELECTORS.ROWS_NTH_CHILD}(3)`);
        await this.page.waitForSelector(CREATE_LOCATIONS.SELECTORS.BACK_BUTTON_DETAILS_PAGE, {visible: true});
        await this.page.click(CREATE_LOCATIONS.SELECTORS.BACK_BUTTON_DETAILS_PAGE, {visible: true});
        return await this.page.$(CREATE_LOCATIONS.SELECTORS.BACK_BUTTON_DETAILS_PAGE) === null;
    }
}
