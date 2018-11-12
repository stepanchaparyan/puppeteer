const { expect } = require('chai')
const puppeteer = require('puppeteer')
const fs = require('fs')
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch')

let browser, page
const viewport = { 
    width: 1920, 
    height: 1080 
}
let showUI = {headless: false}
let showSlowMotion = {headless: false, slowMo: 1000}

beforeEach(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
  await page.setViewport(viewport)
})

describe('sample test', async () => {
    it('should work', async () => {
      expect(`HeadlessChrome/64.0.3264.0`).to.equal(await browser.version())
    })
})

describe('Youtube', async () => {
  it('youtube ', async () => {  
    await page.goto('https://youtube.com')
    await page.type('#search', 'deep purple')
    await page.click('#search-icon-legacy')
    await page.waitFor(2000)
    await page.screenshot({path: 'screenshots/youtube_search_results.png'})
    const videos = await page.$$('ytd-thumbnail.ytd-video-renderer')
    await videos[2].click()
    await page.waitForSelector('.html5-video-container')
    await page.waitFor(5000)
    await page.screenshot({ path: 'screenshots/youtube_video2.png' })
  })    
})

describe('AngularJS.org', async () => {
  it('AngularJS.org ', async () => {  
      await page.goto('https://angularjs.org/', { waitUntil: 'networkidle2' })
      await page.waitFor(2000);     
      await page.click('body > div.container > div:nth-child(2) > div.span4 > div.well.ng-scope > div > input')
      await page.waitFor(2000);      
      await page.type('body > div.container > div:nth-child(2) > div.span4 > div.well.ng-scope > div > input', 'Stepan')      
      await page.screenshot({ path: 'screenshots/Stepan.png'})
      await page.waitFor(2000);      
      await page.click('[ng-model="todoList.todoText"]')
      await page.waitFor(2000);      
      await page.type('[ng-model="todoList.todoText"]','TODOStepan')      
      await page.waitFor(2000);      
      await page.click('[class="btn-primary"]')
      await page.screenshot({ path: 'screenshots/Stepan2.png'})
  })    
})

describe('Angular Game', function () {
  it('Angular game ', async () => {  
      await page.goto('http://localhost/quizGameAngularJS/#!/')
      await page.waitFor(5000)
      await page.click('#playAsAUserButton')
      await page.waitForSelector('#europe1')
      await page.click('#europe1')
      await page.waitFor(1000)
      await page.click('#right')
      //await page.waitForSelector('.redBorder');
      await page.screenshot({ path: 'screenshots/AngularJS.png'})
  })
})

describe('Aligator title', async () => {
  var title
  it('check title', async () => {  
      await page.goto('https://alligator.io/');
      title = await page.title()
      expect(title).to.equal('Front-end Web Development, Chewed Up ← Alligator.io');
  })
})

describe('Aligator input', async () => {
  it('alligator', async () => {
      await page.goto('https://alligator.io/')
      await page.waitFor(2000);      
      await page.focus('.algolia__input')
      await page.waitFor(1000)
      await page.type('.algolia__input', 'Fancy', { delay: 150 })
      await page.waitFor(2000);      
      await page.waitForSelector('.algolia__results')
      await page.screenshot({ path: 'screenshots/alligator.png' })
  })    
})

describe('ES6', async () => {
  it('ES6', async () => {  
      await page.goto('http://localhost/quizGameES6/#')
      await page.waitForSelector('#contact')
      await page.click('#contact')
      await page.waitForSelector('#name')
      await page.focus('#name')
      await page.waitFor(1000)
      await page.type('#name', 'ooops', {delay: 150})
      await page.screenshot({ path: 'screenshots/ES6.png'})
  })     
})

describe.only('separateCheckers', async () => {
  it('getElementInnetText', async () => {  
      await page.goto('http://localhost/quizGameES6/#')
      await page.waitForSelector('.navbar-brand')
      const name = await page.$eval('.navbar-brand', el => el.innerText)
      expect(name).equal('GEOGRAPHY');
  })

  it('checkElementExisting', async () => {  
    await page.goto('http://localhost/quizGameES6/#')
    const element = await page.$('.navbar-brand') !== null
    expect(element).equal(true);
  })   

  it('list', async () => {  
    await page.goto('http://localhost/quizGameAngularJS/#!/')
    await page.waitFor(1000)
    await page.click('#playAsAUserButton')
    
    await page.waitForSelector('.cardCenter');
    const stories = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('.cardCenter'))
    return links.map(link => link.href).slice(0, 10)
    })
    console.log(stories);
    // const element = await page.$('.navbar-brand') !== null
    // expect(element).equal(true);
  })  
})
 
describe('pixelmatch', async () => {
  it('pixel', async () => {  
    const img1 = fs.createReadStream('screenshots/Stepan2.png').pipe(new PNG()).on('parsed', doneReading)
    const img2 = fs.createReadStream('screenshots/Stepan22.png').pipe(new PNG()).on('parsed', doneReading)
    let filesRead = 0;
    let numDiffPixel

    function doneReading() {
        if (++filesRead < 2) return;
        let diff = new PNG({width: img1.width, height: img1.height});
        numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1});
        console.log("this is: " + numDiffPixel)
        diff.pack().pipe(fs.createWriteStream('screenshots/diff.png'));
        //expect(5).equal(10);
    }
    expect(numDiffPixel).equal(5);
  })     
})

afterEach(async () => {
  await browser.close()
})
