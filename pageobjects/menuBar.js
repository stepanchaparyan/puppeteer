//import Page from './page'

//class MenuBar extends Page {
export default class MenuBar {

    constructor(page) {
        this.page = page;
    }
   
    async getTitle() {
        return this.page.title();
    }

    async open () {
        return await this.page.goto('https://www.list.am')
        //super.open('https://www.list.am')
    }

    async myAccount () {
        return await this.page.$('#ma')
    }
}
