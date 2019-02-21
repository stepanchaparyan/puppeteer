module.exports = {
    LOCATIONS: {
        SELECTORS: {
            LOGO: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__title > span > svg > path',
            TITLE: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__title > h1',
            SEARCH_FIELD: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > div > input',
            ADD_LOCATION_BUTTON: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > button > svg',
            CREATE_LOCATION_TITLE: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.CREATE > div > form > div.flyout-header > div:nth-child(1) > span > h3',
            EDIT_LOCATION_TITLE: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.EDIT > div > form > div.flyout-header > div:nth-child(1) > span > h3',
            ALL_LOCATIONS_FILTER: 'body > main > div > div.app-content.row > div > div > div > div.locationsFilter.row > div > span:nth-child(1)',
            IN_USE_FILTER: 'body > main > div > div.app-content.row > div > div > div > div.locationsFilter.row > div > span:nth-child(2)',
            NOT_IN_USE_FILTER: 'body > main > div > div.app-content.row > div > div > div > div.locationsFilter.row > div > span:nth-child(3)',
            TABLE_HEADER_LOCATIONS: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(1)',
            TABLE_HEADER_PAGE_USE_COUNT: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(2)',
            TABLE_HEADER_CONV_USE_COUNT: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(3)',
            TABLE_HEADER_MODIFIED: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(4)',
            TABLE_HEADER_CREATED: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(5)',
            TABLE_ROW_LOCATIONS: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)',
            TABLE_ROW_PAGE_USE_COUNT: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)',
            TABLE_ROW_CONV_USE_COUNT: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3)',
            TABLE_ROW_MODIFIED: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)',
            TABLE_ROW_CREATED: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(5)',
            TABLE_ROW_EDIT_ICON: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg > path',
            TABLE_ROW_DELETE_ICON: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > button.icon-button.delete.btn.btn-link > svg > path',
            TABLE_ROW_HIDDEN_ICON: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > svg > path',
            ROWS_CHILD_2: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr > td:nth-child(2)',
            ROWS: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr',
            ROWS_NTH_CHILD: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child',
            SEARCH_INPUT: 'body > main > div > div.app-content.row > div > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > div > input',
            ADD_LOCATION_PAGE_ADD_ICON: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.CREATE > div > form > div.flyout-header > div:nth-child(1) > span > h3 > svg > path',
            MODAL_UPDATE_USED_LOCATION: 'body > div > div.fade.warning.modal-fixed.in.modal > div > div',
            NO_BUTTON_ON_UPDATE_MODAL_USED_LOCATION: 'body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-link',
            YES_BUTTON_ON_UPDATE_MODAL_USED_LOCATION: 'body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-primary',
            MODAL_DELETE_USED_LOCATION: 'body > main > div > div.app-content.row > div > div > div > div.modal-open > div > div.fade.danger.modal-fixed.in.modal > div > div',
            CANCELL_BUTTON_DELETE_USED_LOCATION: 'body > main > div > div.app-content.row > div > div > div > div.modal-open > div > div.fade.danger.modal-fixed.in.modal > div > div > div.modal-footer > button',
            YES_BUTTON_DELETE_LOCATION: 'body > main > div > div.app-content.row > div > div > div > div.modal-open > div > div.fade.danger.modal-fixed.in.modal > div > div > div.modal-footer > button.delete.with-text.btn.btn-primary',
            DESCRIPTION_INPUT: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.EDIT > div > form > div.flyout-header > div:nth-child(2) > div > input',
            SAVE_BUTTON_EDIT_LOCATION: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.EDIT > div > form > div.flyout-footer > div > button.primary.with-text.btn.btn-primary',
            YES_BUTTON_ON_SAVE_MODAL_EDIT_LOCATION: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.EDIT.modal-open > div:nth-child(3) > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-primary',
            CANCELL_BUTTON_EDIT_LOCATION: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.EDIT > div > form > div.flyout-footer > div > button.primary.with-text.btn.btn-link'
        },
        TEMPORARY_SCREENSHOTS: './src/helpers/screenshots/locationManager/temporaryScreenshots',
        SCREENSHOTS: './src/helpers/screenshots/locationManager'
    },
    CREATE_LOCATIONS: {
        SELECTORS: {
            TITLE: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.CREATE > div > form > div.flyout-header > div:nth-child(1) > span > h3',
            CANCELL_BUTTON: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.CREATE > div > form > div.flyout-footer > div > button.primary.with-text.btn.btn-link',
            MODAL_CANCELL_CHANGES: 'body > div > div.fade.warning.modal-fixed.in.modal > div > div',
            YES_BUTTON_ON_MODAL_CANCELL_CHANGES: 'body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-primary',
            BACK_BUTTON_DETAILS_PAGE: 'body > main > div > div.app-content.row > div > div > div > div.locationsFilter.row > div.col-md-4.col-sm-4.col-xs-4 > button > span',
            LOCATION_NAME_INPUT: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.CREATE > div > form > div.flyout-header > div:nth-child(1) > div > input',
            URL_INPUT: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.CREATE > div > form > div:nth-child(3) > div.flyout-section__body.configuration-section > div > div.form-group > input',
            SAVE_BUTTON: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.CREATE > div > form > div.flyout-footer > div > button.primary.with-text.btn.btn-primary',
            YES_BUTTON_ON_SAVE_MODAL: 'body > main > div > div.app-content.row > div > div > div > div.flyout.location-editor.CREATE.modal-open > div:nth-child(3) > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-primary'
        }
    }
};