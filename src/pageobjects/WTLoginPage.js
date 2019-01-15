import CREDS from "../../creds"

export default class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async open (component) {
        return await this.page.goto(`https://app.webtrends-optimize.com/optimize/${component}`)
    }

    async logIn () {
        await this.page.waitForSelector('#emailInput')
        await this.page.type('#emailInput', CREDS.usernameSm)
        await this.page.type('#passwordInput', CREDS.passwordSm)
        await this.page.click('.submit-button')
        //await this.page.waitFor(5000)
        //await this.page.click('body > main > div > div > div > div:nth-child(2) > div > div.account-groups > div:nth-child(2) > div > a')
        await this.page.waitFor(25000)
        //await this.page.screenshot({ path: 'screenshots/locationManager/locationLogin.png' })
    }

}