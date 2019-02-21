import {LOCATIONS} from './constants/locationManagerConstants.js';

export default class Utils {

    constructor(page) {
        this.page = page;
    }

    async getCorrespondingRow(locationtName) {
        let i;
        await this.page.click(LOCATIONS.SELECTORS.ALL_LOCATIONS_FILTER);
        const allLocationsCount = await this.page.$$eval(LOCATIONS.SELECTORS.ROWS, locations => locations.length);
        for (i = 1; i < allLocationsCount + 2; i++) {
            if (await this.page.$(`body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`) !== null) {
                let row = `body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`;
                let anyNextLocation = await this.page.$eval(row, element => element.innerText);
                if (anyNextLocation === locationtName) { break; }
            } else {
                i = 0;
                break;
            }
        }
        return await i;
    }





}