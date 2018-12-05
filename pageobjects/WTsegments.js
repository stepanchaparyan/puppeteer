import puppeteer from 'puppeteer'
import CREDS from "../creds"
import { expect } from 'chai'
import fs from 'fs-extra'
import { PNG } from 'pngjs'
import pixelmatch from "pixelmatch"

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
        await this.page.waitFor(25000)
        await this.page.screenshot({ path: 'screenshots/segmentLogin.png' })
    }
    async logoExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(1) > div > div > span.section-header__title > span > img') !== null
    }    
    async titleExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(1) > div > div > span.section-header__title > h1') !== null
    }
    async searchFieldExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > div > input') !== null
    }    
    async addSegmentButtonExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > button > svg > path') !== null
    }

    async allSegmentsFilterExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div.segments-filter.row > div > span.segments-filter__tab.segments-filter__tab--active') !== null
    }    
    async inUseFilterExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div.segments-filter.row > div > span:nth-child(2)') !== null
    }
    async notInUseFilterExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div.segments-filter.row > div > span:nth-child(3)') !== null
    }
    
    async tableHeadSegmentsExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(1)') !== null
    }
    async tableHeadIDExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(2)') !== null
    }
    async tableHeadUseCountExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(3)') !== null
    }
    async tableHeadModifiedExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(4)') !== null
    }
    async tableHeadCreatedExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(5)') !== null
    }

    async tableRowSegmentsExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)') !== null
    }
    async tableRowUseCountExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)') !== null
    }
    async tableRowIDExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3)') !== null
    }
    async tableRowModifiedExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)') !== null
    }
    async tableRowCreatedExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(5)') !== null
    }
    async tableRowUpdateIconExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg > path') !== null
    }
    async tableRowDeleteIconExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > button.icon-button.delete.btn.btn-link > svg > path') !== null
    }
    async tableRowHiddenIconExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > svg > path') !== null
    }

    async inUseFunctionality () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div.segments-filter.row > div > span:nth-child(2)')
        const isNotZero = (currentValue) => currentValue > 0 
        const inUseSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(3)'))
            return cards.map(card => card.innerText)
        })
        return await inUseSegments.every(isNotZero)
    }
    async notInUseFunctionality () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div.segments-filter.row > div > span:nth-child(3)')
        const isZero = (currentValue) => currentValue == 0 
        const notInUseSegments = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(3)'))
            return cards.map(card => card.innerText)
        })
        return await notInUseSegments.every(isZero)
    }
}
