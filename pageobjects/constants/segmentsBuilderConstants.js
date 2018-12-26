module.exports = {
    SEGMENTS: {
        SECTION_HEADER: 'body > main > div > div.app-content.row > div > div > div:nth-child(1) > div > div > ',
        FILTER_ROW: 'body > main > div > div.app-content.row > div > div > div.segments-filter.row > div > ' ,
        TABLE_HEAD: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > ',  
        TABLE_ROWS: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr',
        TABLE_ROW: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child',
        TABLE_ROW_FIRST: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > ',
        ROW_UPDATE_ICON: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg > path',
        ROW_DELETE_ICON: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > button.icon-button.delete.btn.btn-link > svg > path',
        ROW_HIDDEN_ICON: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(1) > td.td--buttons > svg > path',
        SEARCH_FIELD: 'body > main > div > div.app-content.row > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > div > input',
        ADD_BUTTON:'body > main > div > div.app-content.row > div > div > div:nth-child(1) > div > div > span.section-header__toolbar > button > svg',
        CREATE_SEGMENT_PAGE_CATEGORY_HEADER: 'body > main > div > div.app-content.row > div > div > div > div.segment-content.create.row > div.col-xs-4 > section > div > ul > li.category.category-header',
        ROW_HEADER_SEGMENTS_NAME: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(1)',           
        ROW_HEADER_SEGMENTS_ID: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(2)',            
        ROW_HEADER_SEGMENTS_USE_COUNT: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(3)',            
        ROW_HEADER_SEGMENTS_MODIFIED: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(4)',            
        ROW_HEADER_SEGMENTS_CREATED: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > thead > tr > th:nth-child(5)',    
        EDIT_BUTTON_SEGMENT_USED: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(10) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg',        
        //EDIT_BUTTON_TEST_USED: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(2) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg',
        //EDIT_BUTTON_NOT_USED: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(3) > td.td--buttons > button.icon-button.edit.btn.btn-link > svg',
        WARNING_MODAL: 'body > div > div.fade.warning.modal-fixed.in.modal > div > div',
        DANGER_MODAL: 'body > div > div.fade.danger.modal-fixed.in.modal > div > div',
        DANGER_MODAL_DELETE_BUTTON: 'body > div > div.fade.danger.modal-fixed.in.modal > div > div > div.modal-footer > button.delete.with-text.btn.btn-primary',
        DANGER_MODAL_CANCEL_BUTTON: 'body > div > div.fade.danger.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-link',
        UPDATE_WARNING_MODAL_CANCEL_BUTTON_SEGMENT_USED: 'body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button',
        UPDATE_WARNING_MODAL_CANCEL_BUTTON_TEST_USED: 'body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button.primary.with-text.btn.btn-link',
        DELETE_WARNING_MODAL_CANCEL_BUTTON_TEST_AND_SEGMENT_USED: 'body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button',
        WARNING_MODAL_EDIT_BUTTON_TEST_USED: 'body > div > div.fade.warning.modal-fixed.in.modal > div > div > div.modal-footer > button.edit.with-text.btn.btn-primary',
        DELETE_BUTTON_SEGMENT_USED: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(10) > td:nth-child(6) > button:nth-child(2)',
        DELETE_BUTTON_TEST_USED: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(2) > td:nth-child(6) > button:nth-child(2)',
        DELETE_BUTTON_NOT_USED: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(3) > td:nth-child(6) > button:nth-child(2)',
        ROW_SEGMENT_USED: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(10)',
        ROW_TEST_USED: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(2)',
        ROW_NOT_USED: 'body > main > div > div.app-content.row > div > div > div:nth-child(3) > div > div > div > table > tbody > tr:nth-child(3)',
        DETAILS_PAGE_BACK_BUTTON: 'body > main > div > div.app-content.row > div > div > div.segments-filter.row > div:nth-child(2) > button',
        SCREENSHOTS: 'screenshots/segmentBuilder',
        TEMPORARY_SCREENSHOTS: 'screenshots/segmentBuilder/temporaryScreenshots',
        CREATE_SEGMENT_PAGE_LABEL_EDIT_SEGMENT: 'body > main > div > div.app-content.row > div > div > div > div.segment-header.row > div > div:nth-child(1) > div > span.section-label.section-label__edit'
    }



    }