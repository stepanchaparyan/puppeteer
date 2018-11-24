export default class MenuBar {

    constructor(page) {
        this.page = page;
    }
   
    async getTitle() {
        return this.page.title();
    }

    async open () {
        return await this.page.goto('https://www.list.am')
    }

    async myAccountExist () {
        return await this.page.$('#ma') !== null
    }
}
