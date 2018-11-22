import Page from './page'

class MenuBar extends Page {
    /**
     * define elements
     */
    get logo () { return $('#l') }
    get searchBox () { return $('#idSearchBox') }
    get myAccount () { return $('#ma') }
    get postToClassifields () { return $('#ap') }
    get languageBar () { return $('#lbar') }

    /**
     * define or overwrite page methods
     */
    open () {
        super.open('https://www.list.am')
    }
}

export default new MenuBar()