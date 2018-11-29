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
        await this.page.waitFor(15000)
        await this.page.screenshot({ path: 'screenshots/segmentLogin.png' })
    }
    async logoExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(1) > div > div > span.section-header__title > span > img') !== null
    }    
    async titleExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div:nth-child(1) > div > div > span.section-header__title > h1') !== null
    }
    // async Exist () {
    //     return await this.page.$('') !== null
    // }    
    // async Exist () {
    //     return await this.page.$('') !== null
    // }    
    // async Exist () {
    //     return await this.page.$('') !== null
    // }    
    // async Exist () {
    //     return await this.page.$('') !== null
    // }

    
}
