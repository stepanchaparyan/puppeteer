const puppeteer = require('puppeteer')
import CREDS from "../creds"

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  })

  const page = await browser.newPage()
  await page.setViewport({width: 1200, height: 800, deviceScaleFactor: 1});

  await page.goto('https://app.webtrends-optimize.com/optimize')
  await page.waitFor(1000)
  await page.waitForSelector('#emailInput')
  await page.type('#emailInput', CREDS.usernameSm)
  await page.type('#passwordInput', CREDS.passwordSm)
  await page.click('.submit-button')
  await page.waitFor(17000)

  await page.click('body > main > div > div:nth-child(2) > div > div > nav > div > div')
  await page.waitFor(3000)
  await page.click('body > main > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(1) > div:nth-child(3) > ul > li:nth-child(1) > a')
  await page.waitFor(3000)
  await page.click('body > main > div > div.app-content.row > div > form > div.intro.intro-info.ae-intro > div > div.intro__action-container.col-sm-1 > button')
  await page.waitFor(3000)
  await page.type('body > main > div > div.app-content.row > div > form > div.wrapper.horizontal-padding-0 > div > div > div > div.col-md-6.col-md-offset-1.col-sm-12 > div:nth-child(1) > div > div > div.col-xs-9 > div:nth-child(1) > div > input', 'orinak1')
  await page.type('body > main > div > div.app-content.row > div > form > div.wrapper.horizontal-padding-0 > div > div > div > div.col-md-6.col-md-offset-1.col-sm-12 > div:nth-child(2) > div > div > div.col-xs-9 > div:nth-child(1) > div > input', 'orinak2')

  await page.click('#react-select-2--value')
  await page.evaluate(() => {
    document.querySelector(`select [value="asas"]`).selected = true;
  });
  await page.screenshot({path: 'screenshots/3.png'})



  const element = await page.$('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(2)')
  const drugableArea = await page.$('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.filter-sandbox.col-xs-8 > div > article')
  const box = await element.boundingBox()
  const area = await drugableArea.boundingBox()

  const mouse = page.mouse
  //await page.click('body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li:nth-child(2)')

  await mouse.move(box.x + box.width / 2, box.y + box.height / 2, {steps: 200})
  console.log(box.x + box.width / 2)
  console.log(box.y + box.height / 2)

  await mouse.down()  
  //await page.screenshot({path: 'screenshots/1.png', fullPage: true})
  //await mouse.move(area.x + area.width / 2, area.y + area.height / 2, {steps: 100})
  //await page.screenshot({path: 'screenshots/2.png', fullPage: true})
  await mouse.move(450, 240, {steps: 200})
  await mouse.up()
  await page.screenshot({path: 'screenshots/3.png'})


  // WORKING EXAMPLE WITH GOOGLE MAP
  // await page.setViewport({width: 1200, height: 800, deviceScaleFactor: 1});
  // await page.goto('https://www.google.de/maps/@52.4889552,13.4707445,1555m/data=!3m1!1e3')
  // const mouse = page.mouse
  // await mouse.move(500, 500)
  // await mouse.down()
  // await mouse.move(200, 200, {steps: 100})
  // await mouse.up()

  browser.close()
})()