import CREDS from "../creds"
import { expect } from 'chai'
import fs from 'fs-extra'
import { PNG } from 'pngjs'
import pixelmatch from "pixelmatch"

export default class SegmentManager {

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
        await page.waitForSelector('#emailInput')
        await page.type('#emailInput', CREDS.usernameSm)
        await page.type('#passwordInput', CREDS.passwordSm)
        await page.click('.submit-button')
        await page.waitFor(5000)
        await page.click('body > main > div > div > div > div:nth-child(2) > div > div.account-groups > div:nth-child(2) > div > a')
        await page.waitFor(15000)
        await page.screenshot({ path: 'screenshots/wtlogin.png' })
    }
    async XXXXXExist () {
        return await this.page.$('#l') !== null
    }    
    async XXXXXXExist () {
        return await this.page.$('#idSearchBox') !== null
    }
    // async myAccountExist () {
    //     return await this.page.$('#ma') !== null
    // }
    // async starExist () {
    //     return await this.page.$('#sa') !== null
    // }
    // async postAddExist () {
    //     return await this.page.$('#ap') !== null
    // }
    // async languageBarExist () {
    //     return await this.page.$('#lbar') !== null
    // }

    // async clickOnLanguageBar () {
    //     await this.page.click('#lbar')
    //     await this.page.waitFor(1000)
    // }
    // async languageBarMenuExist () {
    //     return await this.page.$('#lmenu') !== null
    // }
    // async languageBarTextRussian() {
    //     return await this.page.$eval('#lmenu > a:nth-child(1)', element => element.innerText)
    // }
    // async languageBarTextEnglish() {
    //     return await this.page.$eval('#lmenu > a:nth-child(2)', element => element.innerText)
    // }
    // async languageBarTextArmenian() {
    //     await this.page.click('#lmenu > a:nth-child(2)')
    //     await this.page.waitFor(1000)
    //     await this.page.click('#lbar')
    //     return await this.page.$eval('#lmenu > a:nth-child(1)', element => element.innerText)
    // }
    // async changePageLanguageIntoEnglish() {
    //     await this.page.click('#lmenu > a:nth-child(2)')
    //     await this.page.waitFor(1000)
    //     return await this.page.$eval('#ma', element => element.innerText)
    // }
    // async changePageLanguageIntoRussian() {
    //     await this.page.click('#lmenu > a:nth-child(1)')
    //     await this.page.waitFor(1000)
    //     return await this.page.$eval('#ma', element => element.innerText)
    // }

    // async makeScreenshotForLanguageMenu() {
    //     const languageMenu = await this.page.$('#lmenu')  
    //     await languageMenu.screenshot({path: 'screenshots/languageMenu1.png'})
    // }
    // async checkLanguageMenuUI() {
    //     const img1 = fs.createReadStream('screenshots/languageMenu1.png').pipe(new PNG()).on('parsed', doneReading)
    //     const img2 = fs.createReadStream('screenshots/languageMenu2.png').pipe(new PNG()).on('parsed', doneReading)
    //     let filesRead = 0
    //     let numDiffPixel
        
    //     function doneReading() {
    //         if (++filesRead < 2) return
    //         let diff = new PNG({width: img1.width, height: img1.height})
    //         numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
    //         diff.pack().pipe(fs.createWriteStream('screenshots/diff.png'))
    //         expect(numDiffPixel).equal(0)
    //     }
    // }

    
}
