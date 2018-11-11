const { expect } = require('chai')
const puppeteer = require('puppeteer')

let browser, page
const viewport = { 
    width: 1920, 
    height: 1080 
}
let showUI = {headless: false};

beforeEach(async () => {
  browser = await puppeteer.launch(showUI)
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
 
describe('hover', async () => {
  it('hover', async () => {  
    await page.goto('https://soundcloud.com/')
    await page.waitFor(2000)
    await page.hover('.playableTile__artwork')
    await page.screenshot({ path: 'screenshots/hover.png' })
  })     
})

afterEach(async () => {
  await browser.close()
})
