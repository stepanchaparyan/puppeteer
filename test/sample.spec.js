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
  var cookies

  beforeEach(async () => {
    await page.goto('https://app.webtrends-optimize.com/optimize/manage/assets')
    await page.waitForSelector('#emailInput')
    await page.type('#emailInput', CREDS.usernameA)
    await page.type('#passwordInput', CREDS.passwordA)
    await page.click('.submit-button')
    await page.waitFor(5000)
    await page.click('body > main > div > div > div > div:nth-child(2) > div > div.account-groups > div:nth-child(2) > div > a')
    await page.waitFor(15000)
    cookies = await page.cookies()
    await page.screenshot({ path: 'screenshots/wtlogin.png' })
  })
  it('asset', async () => {  
    const page2 = await browser.newPage()
    await page2.setCookie(...cookies)
    await page2.goto('https://app.webtrends-optimize.com/optimize/manage/assets')
    await page2.setCookie(...cookies)
    await page.waitFor(20000)
    await page.click('body > main > div > div.app-content.row > div > div.container > div > section > div > div.tableBody > div:nth-child(2)')
    await page.waitFor(3000)
    await page.screenshot({ path: 'screenshots/wtAsset.png' })
  })
  it('Space', async () => {  
    const page2 = await browser.newPage()
    await page2.setCookie(...cookies)
    await page2.goto('https://app.webtrends-optimize.com/optimize/manage/assets')
    await page2.setCookie(...cookies)
    await page.waitFor(20000)
    await page.click('body > main > div > div.app-content.row > div > div.container > div > div:nth-child(1) > div > div:nth-child(1) > div > div > div > span')
    await page.waitFor(3000)
    await page.screenshot({ path: 'screenshots/wtSpace.png' })
  })
})

describe('loginOne', async () => {
  let cookies
  beforeEach(async () => {
    await page.goto('https://github.com/github')
    await page.waitForSelector('body > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.HeaderMenu--logged-out.d-flex.flex-justify-between.flex-items-center.flex-auto > div.d-flex.flex-items-center.px-0.text-center.text-left > a.HeaderMenu-link.no-underline.mr-3')
    await page.click('body > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.HeaderMenu--logged-out.d-flex.flex-justify-between.flex-items-center.flex-auto > div.d-flex.flex-items-center.px-0.text-center.text-left > a.HeaderMenu-link.no-underline.mr-3')
    await page.waitFor(4000)
    await page.type('#login_field', CREDS.usernameS)
    await page.type('#password', CREDS.passwordS)
    await page.click('#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block')
    await page.waitFor(5000)
    cookies = await page.cookies();
  })
   it('GitLogin', async () => {  
    const page2 = await browser.newPage();
    await page2.setCookie(...cookies);
    await page.goto('https://github.com/github')
    await page.waitFor(9000)
    await page.screenshot({ path: 'screenshots/gitlogin.png' })
  })
})  

describe('list', async () => {
  let cookies
  beforeEach(async () => {
    await page.goto('https://www.list.am')
    await page.waitForSelector('#ma')
    await page.click('#ma')
    await page.waitFor(1000)
    await page.type('#_idyour_email', CREDS.usernameS)
    await page.type('#_idpassword', CREDS.passwordS)
    await page.click('#loginaction__form_action0')
    await page.waitFor(1000)
    cookies = await page.cookies();
  })
  it('GitLogin', async () => {  
    const page2 = await browser.newPage();
    await page2.setCookie(...cookies);
    await page.goto('https://www.list.am')
    await page.click('#ma')
    await page.waitFor(3000)
    await page.screenshot({ path: 'screenshots/listlogin.png' })
  })
}) 


afterEach(async () => {
  await browser.close()
})
