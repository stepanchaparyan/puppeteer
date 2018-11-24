import { expect } from 'chai'
import puppeteer from 'puppeteer'
import fs from 'fs-extra'
import { PNG } from 'pngjs'
import pixelmatch from "pixelmatch"
import CREDS from "../creds"
import MenuBar from '../pageobjects/menuBar'

let browser, page, googlesearchpage, menuBar
const viewport = { width: 1920, height: 1080 }
const showUI = {headless: false}
const showSlowMotion = {headless: false, slowMo: 300}

beforeEach(async () => {
  browser = await puppeteer.launch(showUI)
  page = await browser.newPage()
  await page.setViewport(viewport)
})

describe('list.am', async () => {
  beforeEach(async () => {
    await page.goto('https://www.list.am')
    await page.waitForSelector('#ma')
    await page.click('#ma')
    await page.waitFor(2000)
    await page.type('#_idyour_email', CREDS.usernameS)
    await page.type('#_idpassword', CREDS.passwordS)
    await page.click('#loginaction__form_action0')
    await page.waitFor(2000)
  })
  it('myPage', async () => {  
    await page.goto('https://www.list.am')
    await page.click('#ma')
    await page.waitFor(2000)
    await page.screenshot({ path: 'screenshots/listMyPage.png' })
  })
  it('wantedItemsPage', async () => {  
    await page.goto('https://www.list.am')
    await page.click('#sa')
    await page.waitFor(2000)
    await page.screenshot({ path: 'screenshots/listMyWanted.png' })
  })
  it('searchPhone', async () => {  
    await page.goto('https://www.list.am')
    await page.hover('#menu > div.c > span:nth-child(4) > a')    
    await page.click('#menu > div.c > span:nth-child(4) > div > span:nth-child(1) > div:nth-child(2) > a:nth-child(1)')
    await page.waitFor(2000)
    await page.screenshot({ path: 'screenshots/listPhone.png' })
  })
  it('changeLanguage', async () => {  
    await page.goto('https://www.list.am')
    await page.click('#lbar')
    await page.waitFor(2000)
    await page.click('#lmenu > a:nth-child(2)')
    await page.waitFor(2000)
    await page.screenshot({ path: 'screenshots/listLangBar.png' })
    const text = await page.$eval('#ma', element => element.innerText);
    expect(text).equal('My Account')
  })
  it('itemPriceCheck', async () => {  
    await page.goto('https://www.list.am')
    await page.click('#sa')
    await page.waitFor(2000)
    const price = await page.$eval('#contentr > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > div.p', element => element.innerText);
    await page.screenshot({ path: 'screenshots/listPrice1.png' })
    expect(price).equal('18,000 ֏')
  })
  it('itemPriceCheckByPixel', async () => {  
    await page.goto('https://www.list.am')
    await page.click('#sa')
    await page.waitFor(2000)
    await page.screenshot({ path: 'screenshots/listPrice2.png' })

    const img1 = fs.createReadStream('screenshots/listPrice1.png').pipe(new PNG()).on('parsed', doneReading)
    const img2 = fs.createReadStream('screenshots/listPrice2.png').pipe(new PNG()).on('parsed', doneReading)
    let filesRead = 0
    let numDiffPixel

    function doneReading() {
        if (++filesRead < 2) return
        let diff = new PNG({width: img1.width, height: img1.height})
        numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
        //console.log("pixel is: " + numDiffPixel)
        diff.pack().pipe(fs.createWriteStream('screenshots/diff.png'))
        expect(numDiffPixel).equal(0)
        done()
    }
  }) 
}) 

describe.only('list.am with POM', () => {
  beforeEach(async () => {
    menuBar = new MenuBar(page)
    await menuBar.open()
  })
  it('old', async () => {
    const title = await menuBar.getTitle()
    console.log("title: " + title)
    // TODO expect($('#ma')).to.exist;
    // TODO expect(menuBar.myAccount).to.exist;
    const ma = await menuBar.myAccount()
    await ma.click()
    await page.waitFor(1000)
    await page.screenshot({ path: 'screenshots/ma1.png' })   
  })
  it('checkMenuBarElements', async () => {
    expect(await menuBar.myAccountExist()).to.be.true; 
  })
})

afterEach(async () => {
  await browser.close()
})
