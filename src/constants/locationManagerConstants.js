module.exports = {
    LOCATIONS: {
        LOGO: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__title > span > svg > path',
        TITLE: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__title > h1',
        SEARCH_FIELD: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > div > input',
        ADD_LOCATION_BUTTON: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > button > svg > path',
        ALL_LOCATIONS_FILTER: 'body > main > div > div.app-content.row > div > div > div > div.locationsFilter.row > div > span.activeFilter',
        IN_USE_FILTER: 'body > main > div > div.app-content.row > div > div > div > div.locationsFilter.row > div > span:nth-child(2)',
        NOT_IN_USE_FILTER: 'body > main > div > div.app-content.row > div > div > div > div.locationsFilter.row > div > span:nth-child(3)',

        TABLEHEADERLOCATIONS: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(1)',
        TABLEHEADERPAGEUSECOUNT: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(2)',
        TABLEHEADERCONVUSECOUNT: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(3)',
        TABLEHEADERMODIFIED: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(4)', 
        TABLEHEADERCREATED: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(5)',
        
        TABLEROWLOCATIONS: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)',
        TABLEROWPAGEUSECOUNT: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)',
        TABLEROWCONVUSECOUNT: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3)',
        TABLEROWMODIFIED: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)',
        TABLEROWCREATED: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(5)',
        
        TABLEROWEDITICON: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg > path',
        TABLEROWDELETEICON: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > button.icon-button.delete.btn.btn-link > svg > path',
        TABLEROWHIDDENICON: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > svg > path',

        ROWSCHILD2: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(2)',
        ROWS: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr',
        ROWSnthCHILD: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child',

        SEARCHINPUT: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > div > input',
        ADDLOCATIONBUTTON: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > button > svg',
        ADDLOCATIONPAGEADDICON: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.CREATE > div > form > div.flyout-header > div:nth-child(1) > span > h3 > svg > path',

        TEMPORARY_SCREENSHOTS: './src/screenshots/locationManager/temporaryScreenshots',

        MODALUPDATEUSEDLOCATION: 'body > div > div.fade.warning.modal-fixed.in.modal > div > div',  
        NOBUTTONONUPDATEMODALUSEDLOCATION: 'body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-link',
        YESBUTTONONUPDATEMODALUSEDLOCATION: 'body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-primary',
        
        MODALDELETEUSEDLOCATION: 'body > main > div > div.app-content.row > div > div > div > div.modal-open > div > div.fade.danger.modal-fixed.in.modal > div > div',
        CANCELLBUTTONDELETEUSEDLOCATION: 'body > main > div > div.app-content.row > div > div > div > div.modal-open > div > div.fade.danger.modal-fixed.in.modal > div > div > div.modal-footer > button',
        YESBUTTONDELETELOCATION: 'body > main > div > div.app-content.row > div > div > div > div.modal-open > div > div.fade.danger.modal-fixed.in.modal > div > div > div.modal-footer > button.delete.with-text.btn.btn-primary',


        DESCRIPTIONINPUT: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.EDIT > div > form > div.flyout-header > div:nth-child(2) > div > input',
        SAVEBUTTONEDITLOCATION: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.EDIT > div > form > div.flyout-footer > div > button.primary.with-text.btn.btn-primary',
        YESBUTTONONSAVEMODALEDITLOCATION: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.EDIT.modal-open > div:nth-child(3) > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-primary',

        BACKBUTTONDETAILSPAGE: 'body > main > div > div.app-content.row > div > div > div > div.locationsFilter.row > div.col-md-4.col-sm-4.col-xs-4 > button > span',

    }



}