const { expect } = require('chai')
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch')
const CREDS = require('../creds');

let browser, page
const viewport = { width: 1920, height: 1080 }
const showUI = {headless: false}
const showSlowMotion = {headless: false, slowMo: 300}

beforeEach(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
  await page.setViewport(viewport)
})

describe('browser version', async () => {
    // it('HeadlessChromeVersion', async () => {
    //   expect(`HeadlessChrome/64.0.3264.0`).to.equal(await browser.version())
    // })
    it('ChromeVersion', async () => {
      expect(`Chrome/64.0.3264.0`).to.equal(await browser.version())
    })
})

describe('start', async () => {
  beforeEach(async () => {
    await page.goto('https://app.webtrends-optimize.com/optimize/manage/assets')
    await page.waitForSelector('#emailInput')
    await page.type('#emailInput', CREDS.usernameA)
    await page.type('#passwordInput', CREDS.passwordA)
    await page.click('.submit-button')
    await page.waitFor(5000)
    await page.click('body > main > div > div > div > div:nth-child(2) > div > div.account-groups > div:nth-child(2) > div > a')
    await page.waitFor(15000)
    await page.screenshot({ path: 'screenshots/wtlogin.png' })
  })
  it('asset', async () => {  
    await page.goto('https://app.webtrends-optimize.com/optimize/manage/assets')
    await page.waitFor(20000)
    await page.click('body > main > div > div.app-content.row > div > div.container > div > section > div > div.tableBody > div:nth-child(2)')
    await page.waitFor(3000)
    await page.screenshot({ path: 'screenshots/wtAsset.png' })
  })
  it('availableSpace', async () => {  
    await page.goto('https://app.webtrends-optimize.com/optimize/manage/assets')
    await page.waitFor(20000)
    await page.click('body > main > div > div.app-content.row > div > div.container > div > div:nth-child(1) > div > div:nth-child(1) > div > div > div > span')
    await page.waitFor(3000)
    await page.screenshot({ path: 'screenshots/wtSpace.png' })
  })
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

afterEach(async () => {
  await browser.close()
})
