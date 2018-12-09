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
        await this.page.screenshot({ path: 'screenshots/segmentBuilder/segmentLogin.png' })
    }
        
    async goToAddSegmentPage() {
        await this.page.click('body > main > div > div.app-content.row > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > button > svg')
        await this.page.screenshot({ path: 'screenshots/segmentBuilder/addSegmentsPage.png' })
    }
    async sectionCreateSegmentExist() {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-header.row > div > div:nth-child(1) > div > span') !== null
    }
    async segmentNameInputExist() {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-header.row > div > div:nth-child(1) > div > input') !== null
    }    
    async segmentNamePlaceholder() {
        const placeholder = await this.page.$eval('body > main > div > div.app-content.row > div > div > div > div.segment-header.row > div > div:nth-child(1) > div > input', el => el.placeholder);
        return await placeholder
    } 
    async segmentDescriptionTitleExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-header.row > div > div:nth-child(2) > div > span:nth-child(1)') !== null
    }
    async segmentDescriptionInputExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-header.row > div > div:nth-child(2) > div > input') !== null
    }
    async segmentDescriptionPlaceholder() {
        const placeholder = await this.page.$eval('body > main > div > div.app-content.row > div > div > div > div.segment-header.row > div > div:nth-child(2) > div > input', el => el.placeholder);
        return await placeholder
    } 
    async segmentCreatedDateExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-header.row > div > div:nth-child(2) > div > span.text-label.flex--align-self-start > span > span') !== null
    }
    async segmentCreatedDate () {
        const date = await this.page.$eval('body > main > div > div.app-content.row > div > div > div > div.segment-header.row > div > div:nth-child(2) > div > span.text-label.flex--align-self-start > span > span > b', el => el.innerText)
        return await date
    }
    async today () {
        let today = new Date()
        const dd = today.getDate()
        const mm = today.getMonth()+1
        const yyyy = today.getFullYear()
        today = mm+'/'+dd+'/'+yyyy
        return await today
    }
    async dropAttributeHereFieldExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.filter-sandbox.col-xs-8 > div > article > span') !== null
    }
    async segmentDropAttributeHereInnerText() {
        const innerText = await this.page.$eval('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.filter-sandbox.col-xs-8 > div > article > span', el => el.innerText);
        return await innerText
    } 
    async droppableSectionArrowExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.filter-sandbox.col-xs-8 > div > article > svg > path') !== null
    }   
    async cancelButtonExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-footer.row > button.primary.with-text.btn.btn-link') !== null
    }
    async saveButtonExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-footer.row > button.primary.with-text.btn.btn-primary') !== null
    }

    async categoryMySegmentsExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li.category.category-header') !== null
    }
    async categoryMySegmentsImageExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li.category.category-header > img') !== null
    }
    async categoryMySegmentsAngleRightExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li.category.category-header > svg') !== null
    }
    
    async goToMySegmentsList () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li.category.category-header')
        await this.page.screenshot({ path: 'screenshots/mySegments.png' })
    }
       
    async categoryMySegmentsIcon1Exist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(1) > svg:nth-child(1) > path') !== null
    }
    async categoryMySegmentsIcon2Exist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(1) > svg:nth-child(2) > path') !== null
    }
    async categoryMySegmentsNameExist () {
        return await this.page.$('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(1) > span') !== null
    }
    async mySegmentsCount () {
        return await this.page.$$eval('.draggable-list-item', ul => ul.length)
    }  

    async categoryTrafficSourceList () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(2)')
        await this.page.waitForSelector('.draggable-list-item');
        const subCategories = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.draggable-list-item'))
            return cards.map(card => card.innerText)
        })
        return subCategories 
    } 
    async categoryTechnologyList () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(3)')
        await this.page.waitForSelector('.draggable-list-item');
        const subCategories = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.draggable-list-item'))
            return cards.map(card => card.innerText)
        })
        return subCategories 
    } 
    async categoryLocationList () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(4)')
        await this.page.waitForSelector('.draggable-list-item');
        const subCategories = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.draggable-list-item'))
            return cards.map(card => card.innerText)
        })
        return subCategories 
    }
    async categoryDateAndTimeList () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(5)')
        await this.page.waitForSelector('.draggable-list-item');
        const subCategories = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.draggable-list-item'))
            return cards.map(card => card.innerText)
        })
        return subCategories 
    }
    async categoryDemographicsList () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(6)')
        await this.page.waitForSelector('.draggable-list-item');
        const subCategories = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.draggable-list-item'))
            return cards.map(card => card.innerText)
        })
        return subCategories 
    }    
    async categoryAdvancedList () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(7)')
        await this.page.waitForSelector('.draggable-list-item');
        const subCategories = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.draggable-list-item'))
            return cards.map(card => card.innerText)
        })
        return subCategories 
    }        
    async categoryDataTableList () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(8)')
        await this.page.waitForSelector('.category');
        const subCategories = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.category'))
            return cards.map(card => card.innerText)
        })
        return subCategories 
    }

    async goToDataTableCategoryList () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(8)')
        await this.page.screenshot({ path: 'screenshots/DataTableCategory.png' })
    }
    async categoryDataTableColList () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(1)')
        await this.page.waitForSelector('.draggable-list-item');
        const subCategories = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.draggable-list-item'))
            return cards.map(card => card.innerText)
        })
        return subCategories 
    }
    async categoryDataTableKPITableList () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(2)')
        await this.page.waitForSelector('.draggable-list-item');
        const subCategories = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.draggable-list-item'))
            return cards.map(card => card.innerText)
        })
        return subCategories 
    }
    async categoryDataTableStandardTableList () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(3)')
        await this.page.waitForSelector('.draggable-list-item');
        const subCategories = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.draggable-list-item'))
            return cards.map(card => card.innerText)
        })
        return subCategories 
    }
    async categoryDataTableTestTableList () {
        await this.page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(4)')
        await this.page.waitForSelector('.draggable-list-item');
        const subCategories = await this.page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.draggable-list-item'))
            return cards.map(card => card.innerText)
        })
        return subCategories 
    }

    async cancelAddSegmentButton () {

        return 8 
    }
    async saveSegmentWithoutName () {

        return 8 
    }



}
