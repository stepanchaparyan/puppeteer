import { expect } from 'chai'
import puppeteer from 'puppeteer'
import fs from 'fs-extra'
import { PNG } from 'pngjs'
import pixelmatch from "pixelmatch"
import SegmentBuilder from '../pageobjects/WTcreateSegments'

let browser, page, segmentBuilder
const viewport = { width: 1920, height: 1080 }
const showUI = {headless: false}
const showSlowMotion = {headless: false, slowMo: 300}

beforeEach(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
  await page.setViewport(viewport)
})

describe(`addSegment page's elements exist`, async () => {
  beforeEach(async () => {
    segmentBuilder = new SegmentBuilder(page)
    await segmentBuilder.open()
    await segmentBuilder.logIn()
    await segmentBuilder.goToAddSegmentPage()
  })
  it('sectionCreateSegmentExist', async () => {
    expect(await segmentBuilder.sectionCreateSegmentExist()).to.be.true; 
  })
  it('segmentNameInputExist', async () => {
    expect(await segmentBuilder.segmentNameInputExist()).to.be.true; 
  })
  it('segmentNameInputExist', async () => {
    expect(await segmentBuilder.segmentNamePlaceholder()).equal('Enter Your Segment Name Here...')
  })
  it('segmentDescriptionTitleExist', async () => {
    expect(await segmentBuilder.segmentDescriptionTitleExist()).to.be.true; 
  })
  it('segmentDescriptionInputExist', async () => {
    expect(await segmentBuilder.segmentDescriptionInputExist()).to.be.true; 
  })
  it('segmentNameInputExist', async () => {
    expect(await segmentBuilder.segmentDescriptionPlaceholder()).equal('Enter your description here...')
  })  
  it('segmentCreatedDateExist', async () => {
    expect(await segmentBuilder.segmentCreatedDateExist()).to.be.true; 
  })
  it('segmentCreatedDayIsToday', async () => {
    expect(await segmentBuilder.segmentCreatedDate()).equal(await segmentBuilder.today())
  })   
  it('dropAttributeHereFieldExist', async () => {
    expect(await segmentBuilder.dropAttributeHereFieldExist()).to.be.true; 
  })
  it('segmentDropAttributeHereInnerText', async () => {
    expect(await segmentBuilder.segmentDropAttributeHereInnerText()).equal('Drop Attributes here')
  })   
  it('droppableSectionArrowExist', async () => {
    expect(await segmentBuilder.droppableSectionArrowExist()).to.be.true; 
  })
  it('cancellButtonExist', async () => {
    expect(await segmentBuilder.cancelButtonExist()).to.be.true; 
  })
  it('saveButtonExist', async () => {
    expect(await segmentBuilder.saveButtonExist()).to.be.true; 
  })
  it('categoryMySegmentsExist', async () => {
    expect(await segmentBuilder.categoryMySegmentsExist()).to.be.true; 
  })
  it('categoryMySegmentsImageExist', async () => {
    expect(await segmentBuilder.categoryMySegmentsImageExist()).to.be.true; 
  })
  it('categoryMySegmentsAngleRightExist', async () => {
    expect(await segmentBuilder.categoryMySegmentsAngleRightExist()).to.be.true; 
  })   
})

describe(`mySegment page's elements exist`, async () => {
  beforeEach(async () => {
    segmentBuilder = new SegmentBuilder(page)
    await segmentBuilder.open()
    await segmentBuilder.logIn()
    await segmentBuilder.goToAddSegmentPage()
    await segmentBuilder.goToMySegmentsList()
  })
  it('categoryMySegmentsIcon1Exist', async () => {
    expect(await segmentBuilder.categoryMySegmentsIcon1Exist()).to.be.true; 
  })
  it('categoryMySegmentsIcon2Exist', async () => {
    expect(await segmentBuilder.categoryMySegmentsIcon2Exist()).to.be.true; 
  })
  it('categoryMySegmentsNameExist', async () => {
    expect(await segmentBuilder.categoryMySegmentsNameExist()).to.be.true; 
  })
  it('mySegmentsCount', async () => {
    expect(await segmentBuilder.mySegmentsCount()).to.equal(8); 
  })
})

describe(`segments' categories exist`, async () => {
  beforeEach(async () => {
    segmentBuilder = new SegmentBuilder(page)
    await segmentBuilder.open()
    await segmentBuilder.logIn()
    await segmentBuilder.goToAddSegmentPage()
  })
  it('categoryTrafficSourceExist', async () => {
    expect(await segmentBuilder.categoryTrafficSourceList()).to.deep.equal([ `Referrer\n`, `Current URL\n`, `Referrer: Host\n`, `Search Engine Keyword\n`, `Referrer: Attribute\n` ])
  })
  it('categoryTechnologyExist', async () => {
    expect(await segmentBuilder.categoryTechnologyList()).to.deep.equal([ "Desktop Browser\n", "Mobile Browser\n", "Connection Speed\n", "Domain Controller Company\n", "IP Address\n", "ISP\n", "Desktop OS\n", "Mobile OS\n" ])
  })
  it('categoryLocationExist', async () => {
    expect(await segmentBuilder.categoryLocationList()).to.deep.equal([ "Area Code\n", "City\n", "City Confidence\n", "Continent Code\n", "Country Code\n", "Country Confidence\n", "Country Name\n", "IP Address\n", "Latitude\n", "Longitude\n", "Lat & Long\n", "Postal Code\n", "Region Confidence\n", "Region Name\n" ])
  }) 
  it('categoryDate&TimeExist', async () => {
    expect(await segmentBuilder.categoryDateAndTimeList()).to.deep.equal([ "Date\n", "Day\n", "Time\n", "Time Zone\n" ])
  }) 
  it('categoryDemographicsExist', async () => {
    expect(await segmentBuilder.categoryDemographicsList()).to.deep.equal([ "CBSA Code\n", "CBSA Title\n", "CBSA type\n", "CSA Code\n", "CSA Title\n", "Designated Market Area\n", "DMA Population: Households\n", "DMA Population: Kids\n", "DMA Population: Men\n", "DMA Population: Men 18-34\n", "DMA Population: Men 35-49\n", "DMA Population: Teens\n", "DMA Population: Women\n", "DMA Population: Women 18-34\n", "DMA Population: Women 35-49\n", "DMA Rank\n", "Hometype\n", "Primary Language\n", "NAICS code\n" ])
  }) 
  it('categoryAdvancedExist', async () => {
    expect(await segmentBuilder.categoryAdvancedList()).to.deep.equal([ "User Agent\n", "Cookie Data\n", "Data Object Attribute\n", "Meta Tag\n", "Request Attribute\n", "Query String Attribute\n", "Random\n" ])
  }) 
  it('categoryDataTableExist', async () => {
    expect(await segmentBuilder.categoryDataTableList()).to.deep.equal([ "col", "KPI Table", "Standards Table", "testTable" ])
  }) 
  context('dataTableCategoriesExist', async () => {
    beforeEach(async () => {
      await segmentBuilder.goToDataTableCategoryList()
    })
    it('categoryDataTableColExist', async () => {
      expect(await segmentBuilder.categoryDataTableColList()).to.deep.equal([ "col1\n", "col2\n", "UID\n" ])
    }) 
    it('categoryDataTableKPITableExist', async () => {
      expect(await segmentBuilder.categoryDataTableKPITableList()).to.deep.equal([ "Abandoned Cart Value\n", "Items in Cart\n", "Items Purchased\n", "Time to Purchase\n", "Total Value in Cart\n", "Total Value Purchased\n", "UID\n" ])
    }) 
    it('categoryDataTableStandardsTableExist', async () => {
      expect(await segmentBuilder.categoryDataTableStandardTableList()).to.deep.equal([ "AreaCode\n", "ASN\n", "ASNName\n", "Browser\n", "CBSACode\n", "CBSATitle\n", "CBSAType\n", "City\n", "CompanyName\n", "ConnectionSpeed\n",  "ContinentCode\n", "CountryCode\n", "CountryConf\n", "CountryName\n", "CSACode\n", "CSATitle\n", "DCCompanyName\n", "DMACode\n", "DomainName\n", "GMTOffset\n", "HomeBizType\n", "Households\n", "INDST\n", "IP\n", "ISPName\n", "Latitude\n", "Longitude\n", "MDCode\n", "MDTitle\n", "Men\n", "Men18_34\n", "Men35_49\n", "NAICSCode\n", "NumberOfKids\n", "NumberOfTeens\n", "OS\n", "Postal Code\n", "PrimaryLanguage\n", "ProxyType\n", "Rank\n", "Referer\n", "Region\n", "RegionConf\n", "RegionName\n", "SecondayLanguage\n", "SICCode\n", "Timezone\n", "UID\n", "UserAgent\n", "Women\n", "Women18_34\n", "Women35_49\n" ])
    }) 
    it('categoryDataTableTestTableExist', async () => {
      expect(await segmentBuilder.categoryDataTableTestTableList()).to.deep.equal([ "country\n", "UID\n" ])
    }) 
  })

})

describe(`addSegment page's functionality`, async () => {
  beforeEach(async () => {
    segmentBuilder = new SegmentBuilder(page)
    await segmentBuilder.open()
    await segmentBuilder.logIn()
    await segmentBuilder.goToAddSegmentPage()
  })
  it.only('cancelAddSegmentButton', async () => {
    expect(await segmentBuilder.cancelAddSegmentButton()).to.be.true; 
  })
  it.only('saveSegmentWithoutName', async () => {
    expect(await segmentBuilder.saveSegmentWithoutName()).to.be.true; 
  })
  // it('saveSegment', async () => {
  //   expect(await segmentBuilder.saveSegment()).to.be.true; 
  // })
})

afterEach(async () => {
  await browser.close()
})
