import CREDS from "../creds"
import { expect } from 'chai'
import fs from 'fs-extra'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { SEGMENTS } from '../pageobjects/constants/segmentsBuilderConstants.js'

export default class SegmentBuilder {
    constructor(page) {
        this.page = page;
    }   
    async getTitle() {
        return this.page.title();
    }
    async open () {
        return await this.page.goto('https://app.webtrends-optimize.com/optimize/manage/segments')
    }
    async logIn () {
        await this.page.waitForSelector('#emailInput')
        await this.page.type('#emailInput', CREDS.usernameSm)
        await this.page.type('#passwordInput', CREDS.passwordSm)
        await this.page.click('.submit-button')
        //await this.page.waitFor(5000)
        //await this.page.click('body > main > div > div > div > div:nth-child(2) > div > div.account-groups > div:nth-child(2) > div > a')
        await this.page.waitFor(20000)
        //await this.page.screenshot({ path: 'screenshots/segmentBuilder/segmentLogin.png' })
    }
    // segment Header elements
    async logoExist () {
        return await this.page.$(SEGMENTS.SECTION_HEADER + 'span.section-header__title > span > img') !== null
    }    
    async titleExist () {
        return await this.page.$(SEGMENTS.SECTION_HEADER + 'span.section-header__title > h1') !== null
    }
    async searchFieldExist () {
        return await this.page.$(SEGMENTS.SECTION_HEADER + 'span.section-header__toolbar > div > input') !== null
    }    
    async addSegmentButtonExist () {
        return await this.page.$(SEGMENTS.SECTION_HEADER + 'span.section-header__toolbar > button > svg > path') !== null
    }
    // segment filter by inUse / not inUse elements
    async allSegmentsFilterExist () {
        return await this.page.$(SEGMENTS.FILTER_ROW  + 'span.segments-filter__tab.segments-filter__tab--active') !== null
    }    
    async inUseFilterExist () {
        return await this.page.$(SEGMENTS.FILTER_ROW  + 'span:nth-child(2)') !== null
    }
    async notInUseFilterExist () {
        return await this.page.$(SEGMENTS.FILTER_ROW  + 'span:nth-child(3)') !== null
    }
    // table header elements
    async tableHeadSegmentsExist () {
        return await this.page.$(SEGMENTS.TABLE_HEAD + 'th:nth-child(1)') !== null
    }
    async tableHeadIDExist () {
        return await this.page.$(SEGMENTS.TABLE_HEAD + 'th:nth-child(2)') !== null
    }
    async tableHeadUseCountExist () {
        return await this.page.$(SEGMENTS.TABLE_HEAD + 'th:nth-child(3)') !== null
    }
    async tableHeadModifiedExist () {
        return await this.page.$(SEGMENTS.TABLE_HEAD + 'th:nth-child(4)') !== null
    }
    async tableHeadCreatedExist () {
        return await this.page.$(SEGMENTS.TABLE_HEAD + 'th:nth-child(5)') !== null
    }
    // table row elements
    async tableRowSegmentsExist () {
        return await this.page.$(SEGMENTS.TABLE_ROW_FIRST + 'td:nth-child(1)') !== null
    }
    async tableRowUseCountExist () {
        return await this.page.$(SEGMENTS.TABLE_ROW_FIRST + 'td:nth-child(2)') !== null
    }
    async tableRowIDExist () {
        return await this.page.$(SEGMENTS.TABLE_ROW_FIRST + 'td:nth-child(3)') !== null
    }
    async tableRowModifiedExist () {
        return await this.page.$(SEGMENTS.TABLE_ROW_FIRST + 'td:nth-child(4)') !== null
    }
    async tableRowCreatedExist () {
        return await this.page.$(SEGMENTS.TABLE_ROW_FIRST + 'td:nth-child(5)') !== null
    }
    async tableRowUpdateIconExist () {

        return await this.page.$(SEGMENTS.ROW_UPDATE_ICON) !== null
    }
    async tableRowDeleteIconExist () {

        return await this.page.$(SEGMENTS.ROW_DELETE_ICON) !== null
    }
    async tableRowHiddenIconExist () {
        return await this.page.$(SEGMENTS.ROW_HIDDEN_ICON) !== null
        
    }
    // segments order by use / in use functionality
    async orderByInUse () {
        await this.page.click(SEGMENTS.FILTER_ROW + 'span:nth-child(2)')
        const isNotZero = (currentValue) => currentValue > 0 
        const inUseSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(3)'))
            return cards.map(card => card.innerText)
        })
        return await inUseSegments.every(isNotZero)
    }
    async inUseSegmentsCount () {
        await this.page.click(SEGMENTS.FILTER_ROW + 'span:nth-child(2)')
        const inUseSegmentsCount = await this.page.$$eval(SEGMENTS.TABLE_ROW, segments => segments.length);
        return await inUseSegmentsCount
    }
    async orderByNotInUse () {
        await this.page.click(SEGMENTS.FILTER_ROW + 'span:nth-child(3)')
        const isZero = (currentValue) => currentValue == 0 
        const notInUseSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(3)'))
            return cards.map(card => card.innerText)
        })
        return await notInUseSegments.every(isZero)
    }
    async notInUseSegmentsCount () {
        await this.page.click(SEGMENTS.FILTER_ROW + 'span:nth-child(3)')
        const notInUseSegmentsCount = await this.page.$$eval(SEGMENTS.TABLE_ROW, segments => segments.length);
        return await notInUseSegmentsCount
    }
    async allSegmentsCount () {
        const allSegmentsCount = await this.page.$$eval(SEGMENTS.TABLE_ROW, segments => segments.length);
        return await allSegmentsCount
    }
    // Search and Add Button on Header 
    async searchSegment () {
        await this.page.type(SEGMENTS.SEARCH_FIELD, 'Arm')
        const allSegmentsCount = await this.page.$$eval(SEGMENTS.TABLE_ROW, segments => segments.length);
        return await allSegmentsCount
    }
    async gotoAddSegmentPage () {
        await this.page.click(SEGMENTS.ADD_BUTTON)
        return await this.page.$(SEGMENTS.CREATE_SEGMENT_PAGE_CATEGORY_HEADER) !== null
    }
    // order Segments by headers
    async orderBySegmentsName () {
        await this.page.click(SEGMENTS.ROW_HEADER_SEGMENTS_NAME)
        await this.page.click(SEGMENTS.ROW_HEADER_SEGMENTS_NAME)
        const orderedSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(1)'))
            return cards.map(card => card.innerText).slice(0,2)
        })
        return await orderedSegments
    }
    async orderByID () {
        await this.page.click(SEGMENTS.ROW_HEADER_SEGMENTS_ID)
        const orderedSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(2)'))
            return cards.map(card => card.innerText)
        })
        return await Math.max(...orderedSegments)
    }
    async orderByUseCount () {
        await this.page.click(SEGMENTS.ROW_HEADER_SEGMENTS_USE_COUNT)
        const orderedSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(3)'))
            return cards.map(card => card.innerText)
        })
        return await Math.max(...orderedSegments)
    }
    async orderByModified () {
        await this.page.click(SEGMENTS.ROW_HEADER_SEGMENTS_MODIFIED)
        const orderedSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(4)'))
            return cards.map(card => card.innerText)
        })
        return await orderedSegments.slice(0,1)
    }
    async orderByCreated () {
        await this.page.click(SEGMENTS.ROW_HEADER_SEGMENTS_CREATED)
        const orderedSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(5)'))
            return cards.map(card => card.innerText)
        })
        return await orderedSegments.slice(0,1)
    }

    // test edit modals views by screenshots
    async makeScreenshotForSegUsedSegmentUpdate() {
        const number = await this.getCorrespondingRow('for_testing_segment_used')
        await this.page.hover(SEGMENTS.TABLE_ROW + `(${number})`)
        await this.page.click(SEGMENTS.TABLE_ROW + `(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`)
        await this.page.waitForSelector(SEGMENTS.WARNING_MODAL, {visible: true})
        const overlay = await this.page.$(SEGMENTS.WARNING_MODAL)  
        await this.page.waitFor(3000)
        await overlay.screenshot({path: SEGMENTS.TEMPORARY_SCREENSHOTS + '/updateSegUsedSegment1.png'})
    }
    async makeScreenshotForTestUsedSegmentUpdate() {
        const number = await this.getCorrespondingRow('for_testing_test_used')
        await this.page.hover(SEGMENTS.TABLE_ROW + `(${number})`)
        await this.page.click(SEGMENTS.TABLE_ROW + `(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`)
        await this.page.waitForSelector(SEGMENTS.WARNING_MODAL, {visible: true})
        const overlay = await this.page.$(SEGMENTS.WARNING_MODAL)  
        await this.page.waitFor(3000)
        await overlay.screenshot({path: SEGMENTS.TEMPORARY_SCREENSHOTS + '/updateTestUsedSegment1.png'})
    }
    async updateSegUsedSegmentModal () {
        let numDiffPixel
        let filesRead = 0
        const img1 = fs.createReadStream(SEGMENTS.TEMPORARY_SCREENSHOTS + '/updateSegUsedSegment1.png').pipe(new PNG()).on('parsed', doneReading)
        const img2 = fs.createReadStream(SEGMENTS.SCREENSHOTS + '/updateSegUsedSegment2.png').pipe(new PNG()).on('parsed', doneReading)
        function doneReading() {
            if (++filesRead < 2) return
            let diff = new PNG({width: img1.width, height: img1.height})
            numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
            //diff.pack().pipe(fs.createWriteStream(SEGMENTS.TEMPORARY_SCREENSHOTS + '/diff1.png'))
            //console.log("pixel diff is: " + numDiffPixel)
            expect(numDiffPixel).be.below(10)
        }
    } 
    async updateTestUsedSegmentModal () {
        const img1 = fs.createReadStream(SEGMENTS.TEMPORARY_SCREENSHOTS + '/updateTestUsedSegment1.png').pipe(new PNG()).on('parsed', doneReading)
        const img2 = fs.createReadStream(SEGMENTS.SCREENSHOTS + '/updateTestUsedSegment2.png').pipe(new PNG()).on('parsed', doneReading)
        let filesRead = 0
        let numDiffPixel
        function doneReading() {
            if (++filesRead < 2) return
            let diff = new PNG({width: img1.width, height: img1.height})
            numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
            //console.log("pixel diff is: " + numDiffPixel)
            //diff.pack().pipe(fs.createWriteStream(SEGMENTS.TEMPORARY_SCREENSHOTS + '/diff2.png'))
            expect(numDiffPixel).be.below(10)
        }
    }
    // get corresponding row
    async getCorrespondingRow(segmentName) {
        const allSegmentsCount = await this.page.$$eval(SEGMENTS.TABLE_ROWS, segments => segments.length);
        for (var i = 1; i < allSegmentsCount; i++) {
            let row = `body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`
            let anyNextSegment = await this.page.$eval(row, element => element.innerText);
            if (anyNextSegment == segmentName) { break } 
        }
        return await i
    }
    // edit/update segment 
    async updateSegment() {
        const rowNumber = await this.getCorrespondingRow('for_testing_for_updating')
        await this.page.hover(SEGMENTS.TABLE_ROW + `(${rowNumber})`)
        await this.page.click(SEGMENTS.TABLE_ROW + `(${rowNumber}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`)
        await this.page.waitForSelector(SEGMENTS.EDIT_SEGMENT_SELECT_FIELD)
        const selectedElementInnerTextBeforEditing = await this.page.$eval(SEGMENTS.EDIT_SEGMENT_SELECT_FIELD, element => element.innerText);
        await this.page.click(SEGMENTS.EDIT_SEGMENT_SELECT_FIELD)
        var randomNumber = Math.floor(Math.random() * 240) + 2; 
        await this.page.click(SEGMENTS.EDIT_SEGMENT_SELECT_FIELD + `> ul > li:nth-child(${randomNumber}) > a`)
        await this.page.click(SEGMENTS.EDIT_SEGMENT_SAVE_BUTTON)
        await this.page.waitFor(2000) 
        await this.page.hover(SEGMENTS.TABLE_ROW + `(${rowNumber})`)
        await this.page.click(SEGMENTS.TABLE_ROW + `(${rowNumber}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`)
        await this.page.waitForSelector(SEGMENTS.EDIT_SEGMENT_SELECT_FIELD)
        const selectedElementInnerTextAfterEditing = await this.page.$eval(SEGMENTS.EDIT_SEGMENT_SELECT_FIELD, element => element.innerText);
        const notMatch = selectedElementInnerTextBeforEditing !== selectedElementInnerTextAfterEditing
        return notMatch
    }
    // cancel button on update modal if segment used by other segment
    async cancelUpdateSegmentUsedByOtherSegment() {
        const number = await this.getCorrespondingRow('for_testing_segment_used')
        await this.page.hover(SEGMENTS.TABLE_ROW + `(${number})`)
        await this.page.click(SEGMENTS.TABLE_ROW + `(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`)
        await this.page.waitForSelector(SEGMENTS.WARNING_MODAL, {visible: true})
        await this.page.$(SEGMENTS.UPDATE_WARNING_MODAL_CANCEL_BUTTON_SEGMENT_USED) !== null
        await this.page.click(SEGMENTS.UPDATE_WARNING_MODAL_CANCEL_BUTTON_SEGMENT_USED)
        return await this.page.$(SEGMENTS.UPDATE_WARNING_MODAL_CANCEL_BUTTON_SEGMENT_USED) == null
    }
    // cancel button on update modal if segment used by other test/target
    async cancelUpdateSegmentUsedByTest() {
        const number = await this.getCorrespondingRow('for_testing_test_used')
        await this.page.hover(SEGMENTS.TABLE_ROW + `(${number})`)
        await this.page.click(SEGMENTS.TABLE_ROW + `(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`)
        await this.page.waitForSelector(SEGMENTS.WARNING_MODAL, {visible: true})
        await this.page.$(SEGMENTS.UPDATE_WARNING_MODAL_CANCEL_BUTTON_TEST_USED) !== null
        await this.page.click(SEGMENTS.UPDATE_WARNING_MODAL_CANCEL_BUTTON_TEST_USED)
        return await this.page.$(SEGMENTS.UPDATE_WARNING_MODAL_CANCEL_BUTTON_TEST_USED) == null
    }
    // edit button on update modal if segment used by other test/target
    async editSegmentUsedByTest() {
        const number = await this.getCorrespondingRow('for_testing_test_used')
        await this.page.hover(SEGMENTS.TABLE_ROW + `(${number})`)
        await this.page.click(SEGMENTS.TABLE_ROW + `(${number}) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg`)
        await this.page.waitForSelector(SEGMENTS.WARNING_MODAL, {visible: true})
        await this.page.$(SEGMENTS.WARNING_MODAL_EDIT_BUTTON_TEST_USED) !== null
        await this.page.click(SEGMENTS.WARNING_MODAL_EDIT_BUTTON_TEST_USED)
        return await this.page.$(SEGMENTS.CREATE_SEGMENT_PAGE_LABEL_EDIT_SEGMENT) !== null
    }

    // try delete segments which are used by other test/target/segment
    async makeScreenshotForSegUsedSegmentDelete() {
        const number = await this.getCorrespondingRow('for_testing_segment_used')
        await this.page.hover(SEGMENTS.TABLE_ROW + `(${number})`)
        await this.page.click(SEGMENTS.TABLE_ROW + `(${number}) > td:nth-child(6) > button:nth-child(2)`)
        await this.page.waitForSelector(SEGMENTS.WARNING_MODAL, {visible: true})
        const overlay = await this.page.$(SEGMENTS.WARNING_MODAL)  
        await this.page.waitFor(1000)
        await overlay.screenshot({path: SEGMENTS.TEMPORARY_SCREENSHOTS + '/deleteSegUsedSegment1.png'})
    }
    async makeScreenshotForTestUsedSegmentDelete() {
        const number = await this.getCorrespondingRow('for_testing_test_used')
        await this.page.hover(SEGMENTS.TABLE_ROW + `(${number})`)
        await this.page.click(SEGMENTS.TABLE_ROW + `(${number}) > td:nth-child(6) > button:nth-child(2)`)
        await this.page.waitForSelector(SEGMENTS.WARNING_MODAL, {visible: true})
        const overlay = await this.page.$(SEGMENTS.WARNING_MODAL)  
        await this.page.waitFor(1000)
        await overlay.screenshot({path: SEGMENTS.TEMPORARY_SCREENSHOTS + '/deleteTestUsedSegment1.png'})
    }
    async deleteSegUsedSegmentModal () {
        const img1 = fs.createReadStream(SEGMENTS.TEMPORARY_SCREENSHOTS + '/deleteSegUsedSegment1.png').pipe(new PNG()).on('parsed', doneReading)
        const img2 = fs.createReadStream(SEGMENTS.SCREENSHOTS + '/deleteSegUsedSegment2.png').pipe(new PNG()).on('parsed', doneReading)
        let filesRead = 0
        let numDiffPixel

        function doneReading() {
            if (++filesRead < 2) return
            let diff = new PNG({width: img1.width, height: img1.height})
            numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
            //console.log("pixel diff is: " + numDiffPixel)
            //diff.pack().pipe(fs.createWriteStream(SEGMENTS.TEMPORARY_SCREENSHOTS + '/diff1.png'))
            expect(numDiffPixel).equal(0)
        }
    }
    async deleteTestUsedSegmentModal () {
        const img1 = fs.createReadStream(SEGMENTS.TEMPORARY_SCREENSHOTS + '/deleteTestUsedSegment1.png').pipe(new PNG()).on('parsed', doneReading)
        const img2 = fs.createReadStream(SEGMENTS.SCREENSHOTS + '/deleteTestUsedSegment2.png').pipe(new PNG()).on('parsed', doneReading)
        let filesRead = 0
        let numDiffPixel

        function doneReading() {
            if (++filesRead < 2) return
            let diff = new PNG({width: img1.width, height: img1.height})
            numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
            //console.log("pixel diff is: " + numDiffPixel)
            //diff.pack().pipe(fs.createWriteStream(SEGMENTS.TEMPORARY_SCREENSHOTS + '/diff2.png'))
            expect(numDiffPixel).equal(0)
        }
    }
    // delete segments
    async deleteSegment() {
        const allSegmentsCountBeforeDeleting = await this.page.$$eval(SEGMENTS.TABLE_ROWS, segments => segments.length);
        const number = await this.getCorrespondingRow('for_testing_for_deleting')
        await this.page.hover(SEGMENTS.TABLE_ROW + `(${number})`)
        await this.page.click(SEGMENTS.TABLE_ROW + `(${number}) > td:nth-child(6) > button:nth-child(2)`)
        await this.page.waitForSelector(SEGMENTS.DANGER_MODAL, {visible: true})
        await this.page.click(SEGMENTS.DANGER_MODAL_DELETE_BUTTON)
        await this.page.waitForSelector(SEGMENTS.DANGER_MODAL, {visible: false})
        await this.page.waitFor(3000)
        const allSegmentsCountAfterDeleting = await this.page.$$eval(SEGMENTS.TABLE_ROWS, segments => segments.length);
        const toBeTrue = allSegmentsCountBeforeDeleting - allSegmentsCountAfterDeleting == 1
         return await toBeTrue
    }
    //cancel deleting segment
    async cancelDeleteSegment() {
        const number = await this.getCorrespondingRow('for_testing_not_used')
        await this.page.hover(SEGMENTS.TABLE_ROW + `(${number})`)
        await this.page.click(SEGMENTS.TABLE_ROW + `(${number}) > td:nth-child(6) > button:nth-child(2)`)
        await this.page.waitForSelector(SEGMENTS.DANGER_MODAL, {visible: true})
        await this.page.click(SEGMENTS.DANGER_MODAL_CANCEL_BUTTON)
        return await this.page.$(SEGMENTS.DANGER_MODAL) == null         
    }
    async cancelDeleteSegmentUsedByOtherSegment() {
        const number = await this.getCorrespondingRow('for_testing_segment_used')
        await this.page.hover(SEGMENTS.TABLE_ROW + `(${number})`)
        await this.page.click(SEGMENTS.TABLE_ROW + `(${number}) > td:nth-child(6) > button:nth-child(2)`)
        await this.page.waitForSelector(SEGMENTS.WARNING_MODAL, {visible: true})
        await this.page.click(SEGMENTS.DELETE_WARNING_MODAL_CANCEL_BUTTON_TEST_AND_SEGMENT_USED)
        return await this.page.$(SEGMENTS.DELETE_WARNING_MODAL_CANCEL_BUTTON_TEST_AND_SEGMENT_USED) == null
    }
    async cancelDeleteSegmentUsedByTest() {
        const number = await this.getCorrespondingRow('for_testing_test_used')
        await this.page.hover(SEGMENTS.TABLE_ROW + `(${number})`)
        await this.page.click(SEGMENTS.TABLE_ROW + `(${number}) > td:nth-child(6) > button:nth-child(2)`)
        await this.page.waitForSelector(SEGMENTS.WARNING_MODAL, {visible: true})
        await this.page.click(SEGMENTS.DELETE_WARNING_MODAL_CANCEL_BUTTON_TEST_AND_SEGMENT_USED)
        return await this.page.$(SEGMENTS.DELETE_WARNING_MODAL_CANCEL_BUTTON_TEST_AND_SEGMENT_USED) == null
    }
    // test goToDetailsPageAndGoBack by clicking on back button 
    async goToDetailsPageAndGoBack() {
        await this.page.click(SEGMENTS.TABLE_ROW + `(1)`)
        await this.page.waitForSelector(SEGMENTS.DETAILS_PAGE_BACK_BUTTON, {visible: true})
        await this.page.click(SEGMENTS.DETAILS_PAGE_BACK_BUTTON, {visible: true})
        await this.page.waitFor(1000)       
        return await this.page.$(SEGMENTS.DETAILS_PAGE_BACK_BUTTON) == null
    }
}
