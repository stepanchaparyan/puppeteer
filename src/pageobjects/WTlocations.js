import { expect } from 'chai'
import fs from 'fs-extra'
import { PNG } from 'pngjs'
import pixelmatch from "pixelmatch"
import { LOCATIONS } from '../constants/locationManagerConstants.js'

export default class LocationManager {
    constructor(page) {
        this.page = page;
    }   
    async logoExist () {
        return await this.page.$(LOCATIONS.LOGO) !== null
    }    
    async titleExist () {
        return await this.page.$(LOCATIONS.TITLE) !== null
    }
    async searchFieldExist () {
        return await this.page.$(LOCATIONS.SEARCH_FIELD) !== null
    }    
    async addLocationButtonExist () {
        return await this.page.$(LOCATIONS.ADD_LOCATION_BUTTON) !== null
    }
    // Filter by Use/Not Use
    async allLocationsFilterExist () {
        return await this.page.$(LOCATIONS.ALL_LOCATIONS_FILTER) !== null
    }    
    async inUseFilterExist () {
        return await this.page.$(LOCATIONS.IN_USE_FILTER) !== null
    }
    async notInUseFilterExist () {
        return await this.page.$(LOCATIONS.NOT_IN_USE_FILTER) !== null
    }    
    // Table Head Elements
    async tableHeadLocationsExist () {
        return await this.page.$(LOCATIONS.TABLEHEADERLOCATIONS) !== null
    }
    async tableHeadPageUseCountExist () {
        return await this.page.$(LOCATIONS.TABLEHEADERPAGEUSECOUNT) !== null
    }
    async tableHeadConversionUseCountExist () {
        return await this.page.$(LOCATIONS.TABLEHEADERCONVUSECOUNT) !== null
    }
    async tableHeadModifiedExist () {
        return await this.page.$(LOCATIONS.TABLEHEADERMODIFIED) !== null
    }
    async tableHeadCreatedExist () {
        return await this.page.$(LOCATIONS.TABLEHEADERCREATED) !== null
    }
    // Table Row elements and buttons
    async tableRowLocationsExist () {
        return await this.page.$(LOCATIONS.TABLEROWLOCATIONS) !== null
    }
    async tableRowPageUseCountExist () {
        return await this.page.$(LOCATIONS.TABLEROWPAGEUSECOUNT) !== null
    }
    async tableRowConversionUseCountExist () {
        return await this.page.$(LOCATIONS.TABLEROWCONVUSECOUNT) !== null
    }
    async tableRowModifiedExist () {
        return await this.page.$(LOCATIONS.TABLEROWMODIFIED) !== null
    }
    async tableRowCreatedExist () {
        return await this.page.$(LOCATIONS.TABLEROWCREATED) !== null
    }
    async tableRowUpdateIconExist () {
        return await this.page.$(LOCATIONS.TABLEROWEDITICON) !== null
    }
    async tableRowDeleteIconExist () {
        return await this.page.$(LOCATIONS.TABLEROWDELETEICON) !== null
    }
    async tableRowHiddenIconExist () {
        return await this.page.$(LOCATIONS.TABLEROWHIDDENICON) !== null
    }
    // order By Use/In Use and counts
    async orderByInUse () {
        await this.page.click(LOCATIONS.IN_USE_FILTER)
        const isNotZero = (currentValue) => currentValue > 0 
        const inUseLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(2)'))
        return cards.map(card => card.innerText)
        })
        return await inUseLocations.every(isNotZero)
    }
    async inUseLocationsCount () {
        await this.page.click(LOCATIONS.IN_USE_FILTER)
        const inUseLocationsCount = await this.page.$$eval(LOCATIONS.ROWSCHILD2, locations => locations.length)
        return await inUseLocationsCount
    }
    async orderByNotInUse () {
        await this.page.click(LOCATIONS.NOT_IN_USE_FILTER)        
        const isZero = (currentValue) => currentValue == 0 
        const notInUseLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(2)'))
            return cards.map(card => card.innerText)
        })
        return await notInUseLocations.every(isZero)
    }
    async notInUseLocationsCount () {
        await this.page.click(LOCATIONS.NOT_IN_USE_FILTER)
        const notInUseLocationsCount = await this.page.$$eval(LOCATIONS.ROWS, locations => locations.length)
        return await notInUseLocationsCount
    }
    async allLocationsCount () {
        const allLocationsCount = await this.page.$$eval(LOCATIONS.ROWS, locations => locations.length)
        return await allLocationsCount
    }

    async orderByLocationName () {
        await this.page.click(LOCATIONS.TABLEHEADERLOCATIONS)
        const orderedLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(1)'))
            return cards.map(card => card.innerText).slice(0,2)
        })
        return await orderedLocations
    }
    async orderByPageUseCount () {
        await this.page.click(LOCATIONS.TABLEHEADERPAGEUSECOUNT)
        const orderedLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(2)'))
            console.log(cards)
            return cards.map(card => card.innerText)
        })
        return await Math.max(...orderedLocations)
    }
    async orderByConversionUseCount () {
        await this.page.click(LOCATIONS.TABLEHEADERCONVUSECOUNT)
        const orderedLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(3)'))
            return cards.map(card => card.innerText)
        })
        return await Math.max(...orderedLocations)
    }
    async orderByModified () {
        await this.page.click(LOCATIONS.TABLEHEADERMODIFIED)
        const orderedLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(4)'))
            return cards.map(card => card.innerText)
        })
        return await orderedLocations.slice(0,1)
    }
    async orderByCreated () {
        await this.page.click(LOCATIONS.TABLEHEADERCREATED)
        const orderedLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(5)'))
            return cards.map(card => card.innerText)
        })
        return await orderedLocations.slice(0,1)
    }
    //  search segment
    async searchLocation () {
        await this.page.type(LOCATIONS.SEARCHINPUT, 'WT')
        const allLocationsCount = await this.page.$$eval(LOCATIONS.ROWS, locations => locations.length)
        return await allLocationsCount
    }
    //  add segment
    async gotoAddLocationPage () {
        await this.page.click(LOCATIONS.ADDLOCATIONBUTTON)        
        return await this.page.$(LOCATIONS.ADDLOCATIONPAGEADDICON) !== null
    }
    // get corresponding row
    async getCorrespondingRow(locationtName) {
        const allLocationsCount = await this.page.$$eval(LOCATIONS.ROWS, locations => locations.length);
        for (var i = 1; i < allLocationsCount; i++) {
            let row = `body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`
            let anyNextLocation = await this.page.$eval(row, element => element.innerText);
            if (anyNextLocation == locationtName) { break }    
        }
        return await i
    }
    async makeScreenshotForUsedLocationUpdate() {
        const number = await this.getCorrespondingRow('for_testing_used_location')
        await this.page.hover(LOCATIONS.ROWSnthCHILD + `(${number})`)
        await this.page.click(LOCATIONS.ROWSnthCHILD + `(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`)
        await this.page.waitForSelector(LOCATIONS.MODALUPDATEUSEDLOCATION, {visible: true})
        const overlay = await this.page.$(LOCATIONS.MODALUPDATEUSEDLOCATION)  
        await this.page.waitFor(3000)
        await overlay.screenshot({path: LOCATIONS.TEMPORARY_SCREENSHOTS + '/updateLocation1.png'})
    }

    async compareUpdateUsedLocationModal () {
        const img1 = fs.createReadStream(LOCATIONS.TEMPORARY_SCREENSHOTS + '/updateLocation1.png').pipe(new PNG()).on('parsed', doneReading)
        const img2 = fs.createReadStream(LOCATIONS.TEMPORARY_SCREENSHOTS + '/updateLocation2.png').pipe(new PNG()).on('parsed', doneReading)
        let filesRead = 0
        let numDiffPixel

        function doneReading() {
            if (++filesRead < 2) return
            let diff = new PNG({width: img1.width, height: img1.height})
            numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
            //console.log("pixel diff is: " + numDiffPixel)
            //diff.pack().pipe(fs.createWriteStream(LOCATIONS.TEMPORARY_SCREENSHOTS + '/diff1.png'))
            expect(numDiffPixel).equal(0)
        }
    }
    // cancel update location (for used locations)
    async cancelUpdateUsedLocation() {
        const number = await this.getCorrespondingRow('for_testing_used_location')
        await this.page.hover(LOCATIONS.ROWSnthCHILD + `(${number})`)
        await this.page.click(LOCATIONS.ROWSnthCHILD + `(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`)
        await this.page.waitForSelector(LOCATIONS.MODALUPDATEUSEDLOCATION, {visible: true})
        await this.page.click(LOCATIONS.NOBUTTONONUPDATEMODALUSEDLOCATION)
        return await this.page.$(LOCATIONS.MODALUPDATEUSEDLOCATION) == null
    }
    // edit/update location which is used by other test/conversion
    async updateUsedLocation() {
        const number = await this.getCorrespondingRow('for_testing_used_location')
        await this.page.hover(LOCATIONS.ROWSnthCHILD + `(${number})`)
        await this.page.click(LOCATIONS.ROWSnthCHILD + `(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`)
        await this.page.click(LOCATIONS.YESBUTTONONUPDATEMODALUSEDLOCATION)
        await this.page.waitFor(1000)
        const descriptionOldText = await this.page.$eval(LOCATIONS.DESCRIPTIONINPUT, el => el.innerText);
        await this.page.type(LOCATIONS.DESCRIPTIONINPUT, 'test')
        await this.page.click(LOCATIONS.SAVEBUTTONEDITLOCATION)
        await this.page.click(LOCATIONS.YESBUTTONONSAVEMODALEDITLOCATION)

        await this.page.hover(LOCATIONS.ROWSnthCHILD + `(${number})`)
        await this.page.waitFor(2000)
        await this.page.click(LOCATIONS.ROWSnthCHILD + `(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`)
        await this.page.click(LOCATIONS.YESBUTTONONUPDATEMODALUSEDLOCATION)
        const descriptionNewText = await this.page.$eval(LOCATIONS.DESCRIPTIONINPUT, el => el.innerText);
        const difference = descriptionNewText.localeCompare(descriptionOldText)
        return (difference == 0 ? true : false)
    }
    // edit/update segment which is not used by other test/target or segment
    async updateNotUsedLocation() {
        const number = await this.getCorrespondingRow('for_testing_not_used_location')
        await this.page.hover(LOCATIONS.ROWSnthCHILD + `(${number})`)
        await this.page.click(LOCATIONS.ROWSnthCHILD + `(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`)
        await this.page.waitFor(1000)
        const descriptionOldText = await this.page.$eval(LOCATIONS.DESCRIPTIONINPUT, el => el.innerText);
        await this.page.type(LOCATIONS.DESCRIPTIONINPUT, 'test')
        await this.page.click(LOCATIONS.SAVEBUTTONEDITLOCATION)
        await this.page.click(LOCATIONS.YESBUTTONONSAVEMODALEDITLOCATION)

        await this.page.hover(LOCATIONS.ROWSnthCHILD + `(${number})`)
        await this.page.waitFor(2000)
        await this.page.click(LOCATIONS.ROWSnthCHILD + `(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`)
        const descriptionNewText = await this.page.$eval(LOCATIONS.DESCRIPTIONINPUT, el => el.innerText);
        const difference = descriptionNewText.localeCompare(descriptionOldText)
        return (difference == 0 ? true : false)
    }

    async makeScreenshotForUsedLocationDelete() {
        const number = await this.getCorrespondingRow('for_testing_used_location')
        await this.page.hover(LOCATIONS.ROWSnthCHILD + `(${number})`)
        await this.page.click(LOCATIONS.ROWSnthCHILD + `(${number}) > td.td--buttons > button.icon-button.delete.btn.btn-link > svg`)
        await this.page.waitForSelector(LOCATIONS.MODALDELETEUSEDLOCATION, {visible: true})
        const overlay = await this.page.$(LOCATIONS.MODALDELETEUSEDLOCATION)  
        await this.page.waitFor(3000)
        await overlay.screenshot({path: LOCATIONS.TEMPORARY_SCREENSHOTS + '/deleteLocation1.png'})
    }
    async compareDeleteUsedLocationModal () {
        const img1 = fs.createReadStream(LOCATIONS.TEMPORARY_SCREENSHOTS + '/deleteLocation1.png').pipe(new PNG()).on('parsed', doneReading)
        const img2 = fs.createReadStream(LOCATIONS.TEMPORARY_SCREENSHOTS + '/deleteLocation2.png').pipe(new PNG()).on('parsed', doneReading)
        let filesRead = 0
        let numDiffPixel

        function doneReading() {
            if (++filesRead < 2) return
            let diff = new PNG({width: img1.width, height: img1.height})
            numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
            //console.log("pixel diff is: " + numDiffPixel)
            //diff.pack().pipe(fs.createWriteStream(LOCATIONS.TEMPORARY_SCREENSHOTS + '/diff1.png'))
            expect(numDiffPixel).equal(0)
        }
    }
    async cancelDeleteUsedLocation() {
        const number = await this.getCorrespondingRow('for_testing_used_location')
        await this.page.hover(LOCATIONS.ROWSnthCHILD + `(${number})`)
        await this.page.click(LOCATIONS.ROWSnthCHILD + `(${number}) > td.td--buttons > button.icon-button.delete.btn.btn-link > svg`)
        await this.page.waitForSelector(LOCATIONS.MODALDELETEUSEDLOCATION, {visible: true})
        await this.page.click(LOCATIONS.CANCELLBUTTONDELETEUSEDLOCATION)
        return await this.page.$(LOCATIONS.MODALDELETEUSEDLOCATION) == null
    }
    async deleteLocation() {
        const number = await this.getCorrespondingRow('for_delete')
        await this.page.hover(LOCATIONS.ROWSnthCHILD + `(${number})`)
        await this.page.click(LOCATIONS.ROWSnthCHILD + `(${number}) > td.td--buttons > button.icon-button.delete.btn.btn-link > svg`)
        await this.page.waitFor(1000)
        await this.page.click(LOCATIONS.YESBUTTONDELETELOCATION)
        await this.page.waitFor(3000)
        const locationName = await this.page.$eval(LOCATIONS.ROWSnthCHILD + `(${number}) > td:nth-child(1)`, el => el.innerText)
        return (locationName !== 'for_delete' ? true : false)
    }

    async goToDetailsPageAndGoBack() {
        await this.page.click(LOCATIONS.ROWSnthCHILD + '(1)')
        await this.page.waitForSelector(LOCATIONS.BACKBUTTONDETAILSPAGE, {visible: true})
        await this.page.click(LOCATIONS.BACKBUTTONDETAILSPAGE, {visible: true})        
        return await this.page.$(LOCATIONS.BACKBUTTONDETAILSPAGE) == null
    }
}
