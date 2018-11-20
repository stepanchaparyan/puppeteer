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
const ignoreHTTPSErrors = {ignoreHTTPSErrors: true, headless: false, timeout: 0 }

beforeEach(async () => {
  browser = await puppeteer.launch(showUI)
  page = await browser.newPage()
  await page.setViewport(viewport)
})

describe('browser version', async () => {
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

describe('testCases1', async () => {
  it('getElementInnerText', async () => {  
      await page.goto('http://localhost/quizGameES6/#')
      await page.waitForSelector('.navbar-brand')
      const name = await page.$eval('.navbar-brand', el => el.innerText)
      expect(name).equal('GEOGRAPHY');
  })

  it('getDataListAndSaveToCSV_expertsShopify.com', async () => {  
    await page.goto('http://experts.shopify.com')
    await page.waitForSelector('.section')

    const sections = await page.$$('.section')
    await fs.writeFile('out.csv', 'section,name\n')

    for (let i = 0; i < sections.length; i++) {
      await page.goto('http://experts.shopify.com')
      await page.waitForSelector('.section')

      const sections = await page.$$('.section')
      const section = sections[i]
      const button =  await section.$('a.marketing-button')
      const buttonName = await page.evaluate(button => button.innerText, button)
      //console.log('\n')
      //console.log('Experts: ', buttonName)
      await page.waitFor(1000)
      button.click() 

      await page.waitForSelector('#ExpertsResults')
      const results = await page.$$('#ExpertsResults > li')      
      for (let i = 0; i < results.length; i++) {
        const result = results[i]
        await page.waitFor(1000)
        const title = await result.$('a.link-color')
        await page.waitFor(1000)
        const titleName = await page.evaluate(title => title.innerText, title)
        //console.log('Specialists: ', titleName)
        await page.waitFor(1000)
        await fs.appendFile('out.csv', `"${buttonName}","${titleName}"\n`)
      }  
    }
})
  
  it('checkElementExisting', async () => {  
    await page.goto('http://localhost/quizGameES6/#')
    const element = await page.$('.navbar-brand') !== null
    expect(element).equal(true);
  })   

  it('screenshotModalOnly', async () => {  
    await page.goto('http://twitter.com/ebidel')
    await page.$eval('.tweet', tweet => {
      tweet.click()})
    await page.waitFor(1000)
    await page.waitForSelector('.permalink-tweet', {visible: true})
    const overlay = await page.$('.permalink-tweet')  
    await page.waitFor(1000)
    await overlay.screenshot({path: 'screenshots/tweet.png'})
  })  
  
  it('screenshotClipped', async () => {  
    const options = {
      path: 'screenshots/clipped.png',
      clip: { x: 450, y: 5, width: 300, height: 70 } }
    await page.goto('https://www.chaijs.com/')
    await page.screenshot(options)
  })  

  it('checkContinentsList', async () => {  
    await page.goto('http://localhost/quizGameAngularJS/#!/')
    await page.waitFor(1000)
    await page.click('#playAsAUserButton')
    await page.waitForSelector('.cardContinent');
    const continents = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.cardContinent'))
    return cards.map(card => card.innerText).slice(0, 10)
    })
    expect(continents).to.eql([ 'Asia', 'Europe', 'Africa', 'Americas', 'Oceania', 'World' ]);
  })  
})

describe('testCases2', async () => {
  it('loginWT', async () => {  
    await page.goto('https://app.webtrends-optimize.com/optimize/manage/assets')
    await page.waitForSelector('#emailInput')
    await page.type('#emailInput', CREDS.usernameA)
    await page.type('#passwordInput', CREDS.passwordA)
    await page.click('.submit-button')
    await page.waitFor(15000)
    await page.screenshot({ path: 'screenshots/wtlogin.png' })
  })

  it('loginGit', async () => {  
    await page.goto('https://github.com/github')
    await page.waitForSelector('body > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.d-flex.flex-justify-between.flex-auto > div > span > div > a:nth-child(1)')
    await page.click('body > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.d-flex.flex-justify-between.flex-auto > div > span > div > a:nth-child(1)')
    await page.waitFor(1000)
    await page.type('#login_field', CREDS.usernameS)
    await page.type('#password', CREDS.passwordS)
    await page.click('#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block')
    await page.waitFor(1000)
    await page.screenshot({ path: 'screenshots/gitlogin.png' })
  })

  it('PDFtestOnlyHeadless', async () => {  
    await page.goto('https://github.com/github')
    await page.waitFor(1000)
    await page.pdf({ path: 'pdf/pdfTest.pdf', format: 'A4'})
  })

  it('Alert', async () => {  
    await page.goto('https://www.google.com/')
    page.on('dialog', async dialog => {
      await page.waitFor(2000)
      await dialog.dismiss()
    })
    await page.evaluate(() => alert('This message is inside an alert box'))
  })

  it('Hover', async () => {  
    await page.goto('https://soundcloud.com/')
    await page.hover('.playableTile__artwork')
    await page.screenshot({ path: 'screenshots/hover.png' })
  })

  context("contextTest", async() => {
    it('counts of Elements', async () => {  
      await page.goto('https://www.chaijs.com/guide/')
      const bodyCounts = await page.$$eval('body', body => body.length);
      expect(bodyCounts).equal(1)

      await page.goto('https://www.chaijs.com/guide/')
      const ulCounts = await page.$$eval('ul', ul => ul.length);
      expect(ulCounts).equal(7)

      await page.goto('https://www.chaijs.com/guide/')
      const elhref = await page.$eval('#assertion-styles > a', el => el.href);
      expect(elhref).equal('https://www.chaijs.com/guide/styles/')

      await page.goto('https://www.chaijs.com/guide/')
      const elValue = await page.$eval('#welcome-to-chai', el => el.innerText);
      expect(elValue).equal('Welcome to Chai')
    })  
  })
  
})

describe('loginBeforeAll', async () => {
  beforeEach(async () => {
    await page.goto('https://github.com/stepanchaparyan')
    await page.waitForSelector('body > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.d-flex.flex-justify-between.flex-auto > div > span > div > a:nth-child(1)')
    await page.click('body > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.d-flex.flex-justify-between.flex-auto > div > span > div > a:nth-child(1)')
    await page.type('#login_field', CREDS.usernameS)
    await page.type('#password', CREDS.passwordS)
    await page.click('#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block')
    await page.waitFor(1000)
  })

  it('loginGit', async () => {  
    await page.goto('https://github.com/stepanchaparyan')
    await page.waitFor(2000)
    await page.screenshot({ path: 'screenshots/gitlogin.png' })
  })

  it('checkElementExisting', async () => {  
    await page.goto('https://github.com/stepanchaparyan')
    const element = await page.$('.p-name') !== null
    expect(element).equal(true);
    await page.screenshot({ path: 'screenshots/gitlogin2.png' })
  })
  

  it('checkList', async () => {  
    await page.goto('https://github.com/stepanchaparyan')
    const myRepos = await page.evaluate(() => {
    const repos = Array.from(document.querySelectorAll('.js-repo'))
    return repos.map(repo => repo.innerText).slice(0, 10)
    })
    expect(myRepos).to.eql([ 'webMyPersonalPage','quizGameES6','quizGameAngularJS','DeliverAngular5','android_itc','puppeteer' ]
  );
  })  
})
 
describe('pixelmatch', () => {
  it('chaijs1', async () => {  
    await page.goto('https://www.chaijs.com/')
    await page.waitFor(2000)
    await page.screenshot({ path: 'screenshots/chaijs1.png' })
  })

  it('chaijs2', async () => {  
    await page.goto('https://www.chaijs.com/')
    await page.waitFor(2000)
    await page.click('#node > h2 > small > a:nth-child(1)')
    await page.waitFor(2000)
    await page.screenshot({ path: 'screenshots/chaijs2.png' })
  })  

  it('pixel', (done) => {  
    const img1 = fs.createReadStream('screenshots/chaijs1.png').pipe(new PNG()).on('parsed', doneReading)
    const img2 = fs.createReadStream('screenshots/chaijs2.png').pipe(new PNG()).on('parsed', doneReading)
    let filesRead = 0
    let numDiffPixel

    function doneReading() {
        if (++filesRead < 2) return
        let diff = new PNG({width: img1.width, height: img1.height})
        numDiffPixel = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
        console.log("this is: " + numDiffPixel)
        diff.pack().pipe(fs.createWriteStream('screenshots/diff.png'))
        expect(numDiffPixel).equal(0)
        done()
    }
  })     
})

afterEach(async () => {
  await browser.close()
})
