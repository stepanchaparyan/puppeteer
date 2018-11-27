const puppeteer = require('puppeteer')
import CREDS from "../creds"

(async () => {
  const browser = await puppeteer.launch({
    
  })

  const page = await browser.newPage()
  await page.goto('https://app.webtrends-optimize.com/optimize/manage/segments')
  await page.waitFor(1000)
  await page.waitForSelector('#emailInput')
  await page.type('#emailInput', CREDS.usernameSm)
  await page.type('#passwordInput', CREDS.passwordSm)
  await page.click('.submit-button')
  await page.waitFor(17000)

  await page.click('body > main > div > div.app-content.row > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > button > svg')
  await page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(4)')
  
  const element = await page.$('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(5)')
  const box = await element.boundingBox()
  const mouse = page.mouse
  await mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  console.log(box.x)
  console.log(box.width)

  await mouse.down()  
  await page.waitFor(2000)
  await page.screenshot({path: 'screenshots/1.png', fullPage: true})
  await mouse.move(100, 80, {steps: 100})
  await page.screenshot({path: 'screenshots/2.png', fullPage: true})
  await mouse.move(380, 240, {steps: 100})
  await page.waitFor(1000)
  await mouse.up()
  await page.waitFor(1000)
  await page.screenshot({path: 'screenshots/3.png', fullPage: true})

  browser.close()
})()