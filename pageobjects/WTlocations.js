import puppeteer from 'puppeteer'
import CREDS from "../creds"
import { expect } from 'chai'
import fs from 'fs-extra'
import { PNG } from 'pngjs'
import pixelmatch from "pixelmatch"

export default class LocationManager {
    constructor(page) {
        this.page = page;
    }   
    async getTitle() {
        return this.page.title();
    }
    async open () {
        return await this.page.goto('https://app.webtrends-optimize.com/optimize/manage/locations')
    }
    async logIn () {
        await this.page.waitForSelector('#emailInput')
        await this.page.type('#emailInput', CREDS.usernameSm)
        await this.page.type('#passwordInput', CREDS.passwordSm)
        await this.page.click('.submit-button')
        //await this.page.waitFor(5000)
        //await this.page.click('body > main > div > div > div > div:nth-child(2) > div > div.account-groups > div:nth-child(2) > div > a')
        await this.page.waitFor(25000)
        await this.page.screenshot({ path: 'screenshots/locationManager/locationLogin.png' })
    }
    async logoExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__title > span > svg > path') !== null
    }    
    async titleExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__title > h1') !== null
    }
    async searchFieldExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > div > input') !== null
    }    
    async addLocationButtonExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > button > svg > path') !== null
    }

    // Filter by Use/Not Use
    async allLocationsFilterExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.locationsFilter.row > div > span.activeFilter') !== null
    }    
    async inUseFilterExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.locationsFilter.row > div > span:nth-child(2)') !== null
    }
    async notInUseFilterExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.locationsFilter.row > div > span:nth-child(3)') !== null
    }
    
    // Table Head Elements
    async tableHeadLocationsExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(1)') !== null
    }
    async tableHeadPageUseCountExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(2)') !== null
    }
    async tableHeadConversionUseCountExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(3)') !== null
    }
    async tableHeadModifiedExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(4)') !== null
    }
    async tableHeadCreatedExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(5)') !== null
    }

    // Table Row elements and buttons
    async tableRowLocationsExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)') !== null
    }
    async tableRowPageUseCountExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)') !== null
    }
    async tableRowConversionUseCountExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)') !== null
    }
    async tableRowModifiedExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3)') !== null
    }
    async tableRowCreatedExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)') !== null
    }
    async tableRowUpdateIconExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg > path') !== null
    }
    async tableRowDeleteIconExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > button.icon-button.delete.btn.btn-link > svg > path') !== null
    }
    async tableRowHiddenIconExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > svg > path') !== null
    }

    // order By Use/In Use and counts
    async orderByInUse () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.locationsFilter.row > div > span:nth-child(2)')
        const isNotZero = (currentValue) => currentValue > 0 
        const inUseLocations = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(2)'))
        return cards.map(card => card.innerText)
        })
        return await inUseLocations.every(isNotZero)
    }
    async inUseLocationsCount () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.locationsFilter.row > div > span:nth-child(2)')
        const inUseLocationsCount = await this.page.$$eval('body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(2)', locations => locations.length);
        return await inUseLocationsCount
    }
    async orderByNotInUse () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div.segments-filter.row > div > span:nth-child(3)')
        const isZero = (currentValue) => currentValue == 0 
        const notInUseSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(3)'))
            return cards.map(card => card.innerText)
        })
        return await notInUseSegments.every(isZero)
    }
    async notInUseLocationsCount () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div.segments-filter.row > div > span:nth-child(3)')
        const notInUseSegmentsCount = await this.page.$$eval('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(3)', segments => segments.length);
        return await notInUseSegmentsCount
    }
    async allLocationsCount () {
        const allSegmentsCount = await this.page.$$eval('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(3)', segments => segments.length);
        return await allSegmentsCount
    }

    //  
    async searchSegment () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > div > input')
        await this.page.type('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(3)', 'Arm')
        const allSegmentsCount = await this.page.$$eval('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(3)', segments => segments.length);
        return await allSegmentsCount
    }
    async gotoAddSegmentPage () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > button > svg')
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li.category.category-header') !== null
    }

    async orderBySegmentsName () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(1)')
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(1)')
        const orderedSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(1)'))
            return cards.map(card => card.innerText).slice(0,2)
        })
        return await orderedSegments
    }
    async orderByID () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(2)')
        const orderedSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(2)'))
            return cards.map(card => card.innerText)
        })
        return await Math.max(...orderedSegments)
    }
    async orderByUseCount () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(3)')
        const orderedSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(3)'))
            return cards.map(card => card.innerText)
        })
        return await Math.max(...orderedSegments)
    }
    async orderByModified () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(4)')
        const orderedSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(4)'))
            return cards.map(card => card.innerText)
        })
        return await orderedSegments.slice(0,1)
    }
    async orderByCreated () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(5)')
        const orderedSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(5)'))
            return cards.map(card => card.innerText)
        })
        return await orderedSegments.slice(0,1)
    }

    async makeScreenshotForSegUsedSegmentUpdate() {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(11) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg')
        await this.page.waitForSelector('body > div > div.fade.warning.modal-fixed.in.modal > div > div', {visible: true})
        const overlay = await this.page.$('body > div > div.fade.warning.modal-fixed.in.modal > div > div')  
        await this.page.waitFor(1000)
        await overlay.screenshot({path: 'screenshots/segmentBuilder/updateSegUsedSegment1.png'})
    }
    async makeScreenshotForTestUsedSegmentUpdate() {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(4) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg')
        await this.page.waitForSelector('body > div > div.fade.warning.modal-fixed.in.modal > div > div', {visible: true})
        const overlay = await this.page.$('body > div > div.fade.warning.modal-fixed.in.modal > div > div')  
        await this.page.waitFor(1000)
        await overlay.screenshot({path: 'screenshots/segmentBuilder/updateTestUsedSegment1.png'})
    }
    async updateSegUsedSegmentModal () {
        const img1 = fs.createReadStream('screenshots/segmentBuilder/updateSegUsedSegment1.png').pipe(new PNG()).on('parsed', doneReading)
        const img2 = fs.createReadStream('screenshots/segmentBuilder/updateSegUsedSegment2.png').pipe(new PNG()).on('parsed', doneReading)
        let filesRead = 0
        let numDiffPixel

        function doneReading() {
            if (++filesRead < 2) return
            let diff = new PNG({width: img1.width, height: img1.height})
            numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
            //console.log("pixel diff is: " + numDiffPixel)
            //diff.pack().pipe(fs.createWriteStream('screenshots/segmentBuilder/diff1.png'))
            expect(numDiffPixel).equal(0)
        }
    }
    async updateTestUsedSegmentModal () {
        const img1 = fs.createReadStream('screenshots/segmentBuilder/updateTestUsedSegment1.png').pipe(new PNG()).on('parsed', doneReading)
        const img2 = fs.createReadStream('screenshots/segmentBuilder/updateTestUsedSegment2.png').pipe(new PNG()).on('parsed', doneReading)
        let filesRead = 0
        let numDiffPixel

        function doneReading() {
            if (++filesRead < 2) return
            let diff = new PNG({width: img1.width, height: img1.height})
            numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
            //console.log("pixel diff is: " + numDiffPixel)
            //diff.pack().pipe(fs.createWriteStream('screenshots/segmentBuilder/diff2.png'))
            expect(numDiffPixel).equal(0)
        }
    }

    // edit/update segment which is not used by other test/target or segment
    async updateSegment() {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(6) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg')
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-header.row > div > div:nth-child(1) > div > span.section-label.section-label__edit') !== null
    }
    // cancel button on update modal if segment used by other segment
    async cancelUpdateSegmentUsedByOtherSegment() {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(11) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg')
        await this.page.waitForSelector('body > div > div.fade.warning.modal-fixed.in.modal > div > div', {visible: true})
        await this.page.$('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button') !== null
        await this.page.click('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button')
        return await this.page.$('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button') == null
    }
    // cancel button on update modal if segment used by other test/target
    async cancelUpdateSegmentUsedByTest() {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(4) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg')
        await this.page.waitForSelector('body > div > div.fade.warning.modal-fixed.in.modal > div > div', {visible: true})
        await this.page.$('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-link') !== null
        await this.page.click('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button')
        return await this.page.$('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button') == null
    }
    // edit button on update modal if segment used by other test/target
    async editSegmentUsedByTest() {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(4) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg')
        await this.page.waitForSelector('body > div > div.fade.warning.modal-fixed.in.modal > div > div', {visible: true})
        await this.page.$('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button.edit.with-text.btn.btn-primary') !== null
        await this.page.click('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button.edit.with-text.btn.btn-primary')
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-header.row > div > div:nth-child(1) > div > span.section-label.section-label__edit') !== null
    }

    async makeScreenshotForSegUsedSegmentDelete() {
        await this.page.hover('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(2)')
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(2) > td:nth-child(6) > button:nth-child(2)')
        await this.page.waitForSelector('body > div > div.fade.warning.modal-fixed.in.modal > div > div', {visible: true})
        const overlay = await this.page.$('body > div > div.fade.warning.modal-fixed.in.modal > div > div')  
        await this.page.waitFor(1000)
        await overlay.screenshot({path: 'screenshots/segmentBuilder/deleteSegUsedSegment1.png'})
    }
    async makeScreenshotForTestUsedSegmentDelete() {
        await this.page.hover('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(4)')
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(4) > td:nth-child(6) > button:nth-child(2)')
        await this.page.waitForSelector('body > div > div.fade.warning.modal-fixed.in.modal > div > div', {visible: true})
        const overlay = await this.page.$('body > div > div.fade.warning.modal-fixed.in.modal > div > div')  
        await this.page.waitFor(1000)
        await overlay.screenshot({path: 'screenshots/segmentBuilder/deleteTestUsedSegment1.png'})
    }
    async deleteSegUsedSegmentModal () {
        const img1 = fs.createReadStream('screenshots/segmentBuilder/deleteSegUsedSegment1.png').pipe(new PNG()).on('parsed', doneReading)
        const img2 = fs.createReadStream('screenshots/segmentBuilder/deleteSegUsedSegment2.png').pipe(new PNG()).on('parsed', doneReading)
        let filesRead = 0
        let numDiffPixel

        function doneReading() {
            if (++filesRead < 2) return
            let diff = new PNG({width: img1.width, height: img1.height})
            numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
            //console.log("pixel diff is: " + numDiffPixel)
            //diff.pack().pipe(fs.createWriteStream('screenshots/segmentBuilder/diff1.png'))
            expect(numDiffPixel).equal(0)
        }
    }
    async deleteTestUsedSegmentModal () {
        const img1 = fs.createReadStream('screenshots/segmentBuilder/updateTestUsedSegment1.png').pipe(new PNG()).on('parsed', doneReading)
        const img2 = fs.createReadStream('screenshots/segmentBuilder/updateTestUsedSegment2.png').pipe(new PNG()).on('parsed', doneReading)
        let filesRead = 0
        let numDiffPixel

        function doneReading() {
            if (++filesRead < 2) return
            let diff = new PNG({width: img1.width, height: img1.height})
            numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
            //console.log("pixel diff is: " + numDiffPixel)
            //diff.pack().pipe(fs.createWriteStream('screenshots/segmentBuilder/diff2.png'))
            expect(numDiffPixel).equal(0)
        }
    }
    // test only check that the modal is disappear
    // TODO but need to test that current segment is deleted checking by name or by count of segments
    async deleteSegment() {
        await this.page.hover('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(3)')
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(3) > td:nth-child(6) > button:nth-child(2)')
        await this.page.waitForSelector('body > div > div.fade.danger.modal-fixed.in.modal > div > div', {visible: true})
        await this.page.$('body > div > div.fade.danger.modal-fixed.in.modal > div > div > div.modal-footer > button.delete.with-text.btn.btn-primary') !== null
        await this.page.click('body > div > div.fade.danger.modal-fixed.in.modal > div > div > div.modal-footer > button.delete.with-text.btn.btn-primary')
        await this.page.waitFor(3000)
        return await this.page.$('body > div > div.fade.danger.modal-fixed.in.modal > div > div > div.modal-footer > button.delete.with-text.btn.btn-primary') == null
    }
    async cancelDeleteSegment() {
        await this.page.hover('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(3)')
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(3) > td:nth-child(6) > button:nth-child(2)')
        await this.page.waitForSelector('body > div > div.fade.danger.modal-fixed.in.modal > div > div', {visible: true})
        await this.page.$('body > div > div.fade.danger.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-link') !== null
        await this.page.click('body > div > div.fade.danger.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-link')
        return await this.page.$('body > div > div.fade.danger.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-link') == null
    }
    async cancelDeleteSegmentUsedByOtherSegment() {
        await this.page.hover('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(2)')
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(2) > td:nth-child(6) > button:nth-child(2)')
        await this.page.waitForSelector('body > div > div.fade.warning.modal-fixed.in.modal > div > div', {visible: true})
        await this.page.$('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button') !== null
        await this.page.click('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button')
        return await this.page.$('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button') == null
    }
    async cancelDeleteSegmentUsedByTest() {
        await this.page.hover('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(4)')
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(4) > td:nth-child(6) > button:nth-child(2)')
        await this.page.waitForSelector('body > div > div.fade.warning.modal-fixed.in.modal > div > div', {visible: true})
        await this.page.$('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button') !== null
        await this.page.click('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button')
        return await this.page.$('body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button') == null
    }

    async goToDetailsPageAndGoBack() {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(2) > td:nth-child(6) > button:nth-child(2)')
        await this.page.waitForSelector('body > main > div > div.app-content.row > div > div > div.segments-filter.row > div:nth-child(2) > button', {visible: true})
        await this.page.click('body > main > div > div.app-content.row > div > div > div.segments-filter.row > div:nth-child(2) > button', {visible: true})
        await this.page.waitFor(1000)        
        return await this.page.$('body > main > div > div.app-content.row > div > div > div.segments-filter.row > div:nth-child(2) > button') == null
    }
}
