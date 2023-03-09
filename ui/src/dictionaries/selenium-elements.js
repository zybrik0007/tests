module.exports = {

    /*Персонал*/
    /**Графики работы**/
    perSchedule: (name, work, nowork) => {
        let tree = `//div/*[normalize-space(.)="${name}"]/parent::*`
        tree += work ? '/div[@class="pwTreeNode__column"][1]//pw-icon/div[contains(@class, "Icon--check_box_on")]/ancestor-or-self::div[@class="pwTreeNode__column"]/parent::*'
            : '*/div[@class="pwTreeNode__column"][1]//pw-icon/div[contains(@class, "Icon--check_box_off")]/ancestor-or-self::div[@class="pwTreeNode__column"]/parent::*'

        tree += nowork ? '/div[@class="pwTreeNode__column"][2]//pw-icon/div[contains(@class, "Icon--check_box_on")]':
            '/div[@class="pwTreeNode__column"][2]//pw-icon/div[contains(@class, "Icon--check_box_on")]'

        return tree
    },
    perScheduleCheckbox: (name, num) => `//div/*[normalize-space(.)="${name}"]/parent::*/div[@class="pwTreeNode__column"][${num}]//pw-icon/div[contains(@class, "Icon--check_box_on")]`,
    perScheduleCheckbox: (name, num) => `//div/*[normalize-space(.)="${name}"]/parent::*/div[@class="pwTreeNode__column"][${num}]//pw-icon/div[contains(@class, "Icon--check_box_off")]`,

    /**Подразделения**/
    perDivisionTree: (arr) => {
        let tree = ''
        const decorate = (event) => `/pw-tree-row/div/pw-tree-node/div/div/div[normalize-space(.)="${event}"]`
        arr.forEach((division, index) => {
            tree += index === 0 ? `/${decorate(division)}` : `/parent::*/parent::*/parent::*/parent::*${decorate(division)}`
        })
        return tree
    },

    /*Бюро пропусков*/
    /**Шаблоны доступа - изменение**/
    pasAccessTemplateChangeRoom: (event) => `//pw-tree-node/div/div/div/div/div[@class="pwTreeNode--node_el-name" and normalize-space(.)="${event}"]`,
    pasAccessTemplateChangeRoomParams: (name, type, criterion, access, commission, protection, verif, antipass) => {
        const head = '//pw-tree-node/div/div/div[contains(@class, "pwTreeNode--node-type-room")]'
        const named = `/div[1]/div[normalize-space(.)="${name}"]/parent::div/parent::div`
        const typed = `/div[2]/div[normalize-space(.)="${type}"]/parent::div/parent::div`
        const criteriond = `/div[3]/div[normalize-space(.)="${criterion}"]/parent::div/parent::div`
        const accessd = `/div[4]/div[normalize-space(.)="${access}"]/parent::div/parent::div`
        const commissiond = `/div[5]/div[normalize-space(.)="${commission}"]/parent::div/parent::div`

        let protectiond = '/div[6]/pw-checkbox/div[not(contains(@class, "pwCheckbox--checked"))]/parent::pw-checkbox/parent::div/parent::div'
        if(protection) {
            protectiond = '/div[6]/pw-checkbox/div[contains(@class, "pwCheckbox--checked")]/parent::pw-checkbox/parent::div/parent::div'
        }

        let verifd = '/div[7]/pw-checkbox/div[not(contains(@class, "pwCheckbox--checked"))]/parent::pw-checkbox/parent::div/parent::div'
        if(verif) {
            verifd = '/div[7]/pw-checkbox/div[contains(@class, "pwCheckbox--checked")]/parent::pw-checkbox/parent::div/parent::div'
        }

        let antipassd = '/div[8]/pw-checkbox/div[not(contains(@class, "pwCheckbox--checked"))]/parent::pw-checkbox/parent::div/parent::div'
        if(antipass) {
            antipassd =  '/div[8]/pw-checkbox/div[contains(@class, "pwCheckbox--checked")]/parent::pw-checkbox/parent::div/parent::div'
        }

        return head + named + typed + criteriond + accessd + commissiond + protectiond + verifd + antipassd
    },
    pasSchedulesModalSelectSchedule: (event) => `//div/div[@class="block-desc" and normalize-space(.)="${event}"]/parent::*`,
    pasSchedulesModalSelectScheduleActive: (event) => `//div[contains(@class, "selected-block")]/div[@class="block-desc" and normalize-space(.)="${event}"]/parent::*`,

    /*Администрирование*/
    admSelectDeviceModalCell: (device, ip) => `//*[normalize-space(.)="${device} ${ip}"]/div`,
    admSearchDeviceModalCEll: (device, ip) => `//span/span[normalize-space(.)="${device}"]/parent::*/span[normalize-space(.)="(${ip})"]/parent::*`,
    admSearchDeviceModalCEllActive: (device, ip) => `//span[contains(@class, "active")]/span[normalize-space(.)="${device}"]/parent::*/span[normalize-space(.)="(${ip})"]/parent::*`,

    /**Конфигурация**/
    admConfRoomTreeRoot: '//pw-tree-row/div/pw-tree-node/div/div/div[normalize-space(.)="Неконтролируемая территория"]',
    admConfRoomTree: (arr) => {
        let tree = '//pw-tree-row/div/pw-tree-node/div/div/div[normalize-space(.)="Неконтролируемая территория"]'
        arr.forEach(room => tree += `/parent::*/parent::*/parent::*/parent::*/pw-tree-row/div/pw-tree-node/div/div/div[normalize-space(.)="${room}"]`)
        return tree
    },
    admConfRoomTreeDevice: (arr, name, ip, active) => {
        let tree = '//pw-tree-row/div/pw-tree-node/div/div/div[normalize-space(.)="Неконтролируемая территория"]'
        const deviceName = `/parent::*/parent::*/parent::*/parent::*/pw-tree-row/div/pw-tree-node/div/div/div/div/div[normalize-space(.)="${name}"]`
        const deviceIp = `/parent::div/div/div/div[normalize-space(.)="(${ip})"]`
        const deviceActive = `/parent::div/span/div[@title="Заблокирован"]`
        arr.forEach(room => tree += `/parent::*/parent::*/parent::*/parent::*/pw-tree-row/div/pw-tree-node/div/div/div[normalize-space(.)="${room}"]`)

        if(active) {
            return tree + deviceName + deviceIp + deviceActive
        }

        return tree + deviceName + deviceIp
    },
    admConfDevice: (name, ip, active) => {
        if(active) {
            return `//div[normalize-space(.)="${name}"]/parent::*/div/div/div[normalize-space(.)="(${ip})"]/parent::*/span/div[@title="Заблокирован"]`
        }

        return `//div[normalize-space(.)="${name}"]/parent::*/div/div/div[normalize-space(.)="(${ip})"]`
    },

    /**Лицензии**/
    licenseDisabled: (title, name) => `//div[@class="block-license"]//h4[normalize-space(.)='${title}']/parent::*/parent::*//div[normalize-space(.)='${name}']`,
    licenseActive: (title, name) => `//div[@class="block-license block-license-warning"]//h4[normalize-space(.)='${title}']/parent::*/parent::*//div[normalize-space(.)='${name}']`,
    licenseInfo: (title, name, text) => `//div[@class="block-license block-license-warning"]//h4[normalize-space(.)='${title}']/parent::*/parent::*//div[normalize-space(.)='${name}']/parent::*//*[contains(normalize-space(), "${text}")]`,
    licenseSwitch: (title, name) => `//div[contains(@class, "block-license")]//h4[normalize-space(.)='${title}']/parent::*/parent::*//div[normalize-space(.)='${name}']/parent::*//pw-icon[@name='power_settings_new']`,
    licenseMore: (title, name) => `//div[contains(@class, "block-license")]//h4[normalize-space(.)='${title}']/parent::*/parent::*//div[normalize-space(.)='${name}']/parent::*//span[normalize-space(.)='Подробно']`,

    /*Авторизация*/
    authLoginInput: '//pw-input[@id="login"]/label/input',
    authPasswordInput: '//pw-input[@id="password"]/label/input',
    authPasswordRepeatInput: '//pw-input[@id="password2"]/label/input',
    formStatus: '//pw-form-status/div/span',

    /*Навигация*/
    section: (event) => `//pw-icon/div[contains(@class, "${event}")]`,
    sectionActive: (event) => `//pw-icon[contains(@class, "active")]/div[contains(@class, "${event}")]`,
    subsection: (event) => `//a[contains(@class, "navigation-item") and @href="${event}"]`,
    subsectionActive: (event) => `//a[@class="navigation-item active" and @href="${event}"]`,
    tab: (event) => `//div[@class="tab"]/div[normalize-space(.)="${event}"]`,
    tabActive: (event) => `//div[@class="tab"]/div[contains(@class, "active") and normalize-space(.)="${event}"]`,

    /*input*/
    input: (title, placeholder) =>`//*[normalize-space(.)="${title}"]//input[@placeholder="${placeholder}"]`,
    inputIcon: (title, placeholder, icon) => `//*[normalize-space(.)="${title}"]//input[@placeholder="${placeholder}"]/parent::*//pw-icon/div[contains(@class, "${icon}")]`,

    /*select*/
    select: (title, value) => `//pw-field/*[normalize-space(.)="${title}"]/parent::*//span[normalize-space(.)="${value}"]`,
    selectIcon: (title, value, icon) => `//pw-field/*[normalize-space(.)="${title}"]/parent::*//span[normalize-space(.)="${value}"]/parent::*/parent::*//pw-icon/div[contains(@class, "${icon}")]`,


    /*select-multi*/
    selectMulti: (event) => `//*[normalize-space(.)="${event}"]/parent::*/pw-select`,
    selectMultiIcon: (title, icon) => `//*[normalize-space(.)="${title}"]/parent::*//pw-icon/div[contains(@class, "${icon}")]`,
    selectMultiVal: (title, num) => `//*[normalize-space(.)="${title}"]/parent::*//pw-select-item-select[${num}]/div/div[1]`,
    selectMultiValDelete: (title, num) => `//*[normalize-space(.)="${title}"]/parent::*//pw-select-item-select[${num}]/div/div[2]`,

    /*select-input*/
    selectInput: (title, placeholder) => `//*[normalize-space(.)="${title}"]//input[@placeholder="${placeholder}"]`,
    selectInputIcon: (title, placeholder, icon) => `//*[normalize-space(.)="${title}"]//input[@placeholder="${placeholder}"]//parent::*//parent::*//pw-icon/div[contains(@class, "${icon}")]`,

    /*select-xpand*/
    selectXpand: '//pw-select-expand',
    selectXpandItem: (event) => `//pw-select-expand//*[normalize-space(.)="${event}"]`,

    /*button*/
    button: (event) => `//pw-button//span[normalize-space(.)="${event}"]/parent::*/parent::*`,
    buttonActive: (event) => `//pw-button[not(contains(@class, "disabled"))]//span[normalize-space(.)="${event}"]/parent::*/parent::*`,
    buttonDisabled: (event) => `//pw-button[contains(@class, "disabled")]//span[normalize-space(.)="${event}"]/parent::*/parent::*`,

    /*button-icon-before*/
    buttonIconBefore: (event) => `//pw-button[@addbefore="${event}"]`,
    buttonIconBeforeActive: (event) => `//pw-button[@addbefore="${event}" and not(contains(@class, "disabled"))]`,
    buttonIconBeforeDisabled: (event) => `//pw-button[@addbefore="${event}" and contains(@class, "disabled")]`,


    /*button-icon-after*/
    buttonIconAfter: (event) => `//pw-button[@addafter="${event}"]`,
    buttonIconAfterActive: (event) => `//pw-button[@addafter="${event}" and not(contains(@class, "disabled"))]`,
    buttonIconAfterDisabled: (event) => `//pw-button[@addafter="${event}" and contains(@class, "disabled")]`,

    /*checkbox*/
    checkbox: (event) => `//pw-checkbox//*[normalize-space(.)="${event}"]//pw-icon`,
    checkboxChecked: (event) => `//pw-checkbox//*[normalize-space(.)="${event}"]//pw-icon/div[contains(@class, "Icon--check_box_on")]`,
    checkboxUnchecked: (event) => `//pw-checkbox//*[normalize-space(.)="${event}"]//pw-icon/div[contains(@class, "Icon--check_box_off")]`,

    /*pop-up-error*/
    popUpError: (event) => `//div[contains(@class, "pwToast--wrapper-type-error")]/div[@class="pwToast--wrapper--after"]/div[normalize-space(.)='${event}']`,
    popUpErrorStr: '//div[contains(@class, "pwToast--wrapper-type-error")]/div[@class="pwToast--wrapper--after"]/div',

    /*pop-up-success*/
    popUpSuccess: (event) => `//div[contains(@class, "pwToast--wrapper-type-success")]/div[@class="pwToast--wrapper--after"]/div[text()="${event}"]`,
    popUpSuccessStr: '//div[contains(@class, "pwToast--wrapper-type-success")]/div[@class="pwToast--wrapper--after"]/div',

    /*loader*/
    loader: (event) => `//pw-loading[@size="${event}"]`,

    /*table*/
    tableStr: '//*[contains(@class, "datatable-row-wrapper")]',
    tableStrNum: (event) => `//*[contains(@class, "datatable-row-wrapper")][${event}]`,
    tableStrNumActive: (event) => `//*[contains(@class, "datatable-row-wrapper")][${event}]/div[contains(@class, 'active')]`,
    tableHeadText: (event) => `//*[contains(@class, "datatable-row-center")][1]/*[contains(@class, "datatable-header-cell")][${event}]//span[contains(@class, "datatable-header-cell-label")]`,
    tableHeadIcon: (cell, icon) => `//*[contains(@class, "datatable-row-center")][1]/*[contains(@class, "datatable-header-cell")][${cell}]//span[contains(@class, "datatable-header-cell-label")]/pw-icon/div[contains(@class, "${icon}")]`,
    tableCellText: (str, cell) => `//*[contains(@class, "datatable-row-wrapper")][${str}]//*[contains(@class, "datatable-body-cell")][${cell}]//*[contains(@class, "col-content")]/*`,
    tableCellIcon: (str, cell, icon) => `//*[contains(@class, "datatable-row-wrapper")][${str}]//*[contains(@class, "datatable-body-cell")][${cell}]//*[contains(@class, "col-content")]/pw-icon/div[contains(@class, "${icon}")]`,



    /*header*/
    headerProfile: '//app-header//app-user-bar',
    headerUserName: '//app-header//*[@class="profile_view__name"]',
    headerMenu: '//app-header//*[@class="profile_menu"]',
    headerMenuItem: (event) => `//app-header//*[@class="profile_menu_item" and normalize-space(.)="${event}"]`,

    /*modal*/
    modalId: (event) =>  `//pw-modal[@id="${event}"]`,
    modalTitle: (event) => `//*[contains(@class, 'pw-modal-title') and normalize-space(.)="${event}"]`,
    modalButClose: (event) => `//pw-modal[@id="${event}"]//pw-icon[@parsevalue="navigation_close"]`,

    /*modal-confirm*/
    modalConfirm: `//pw-modal[@class='modal-confirm']`,
    modalConfirmTitle: (event) => `//pw-modal[@class="modal-confirm"]//div[normalize-space(.)='${event}']`,
    modalConfirmBody: (event) => `//pw-modal[@class="modal-confirm"]//div[normalize-space(.)='${event}']`,


    /*Общие (general)*/
    genTree: (name, inside) => {
        let first =  '//pw-tree-row[@class="pwTree--first"]/div/'
        const node = 'pw-tree-node/div/'
        const row = 'pw-tree-row/div/'
        const roomName = `div[@class="pwTreeNode__wrapper"]/div/div[@class="pwTreeNode--node_el"]/div[@class="pwTreeNode--node_el-name" and text()=" ${name} "]/parent::div`
        for(let i=0; i < inside; i++) {
            first += row
        }
        return first + node + roomName
    },
    genGroupCellItemName: (event) => ` //div[@class="pwGroupCell--item-name" and text=${event}]`,



    /*datepicker*/
    datepicker: '//pw-datepicker[contains(@style, "block")]',
    datepickerButtonMonth: `//pw-datepicker[contains(@style, "block")]/div/div/div/pw-select[1]`,
    datepickerMonth: (event) => `//pw-datepicker[contains(@style, "block")]/div/div/div/pw-select[1]/div/div/div/span[normalize-space(.)="${event}"]`,
    datepickerButtonYear: `//pw-datepicker[contains(@style, "block")]/div/div/div/pw-select[2]`,
    datepickerYear: (event) => `//pw-datepicker[contains(@style, "block")]/div/div/div/pw-select[2]/div/div/div/span[normalize-space(.)="${event}"]`,
    datepickerButtonHour: '//pw-datepicker[contains(@style, "block")]/div/div[3]/div/div/pw-select[1]',
    datepickerHour: (event) => `//pw-datepicker[contains(@style, "block")]/div/div[3]/div/div/pw-select[1]/div/div/div/span[normalize-space(.)="${event}"]`,
    datepickerButtonMinute: '//pw-datepicker[contains(@style, "block")]/div/div[3]/div/div/pw-select[2]',
    datepickerMinute: (event) => `//pw-datepicker[contains(@style, "block")]/div/div[3]/div/div/pw-select[2]/div/div/div/span[normalize-space(.)="${event}"]`,
    datepickerSelect: (event) => `//pw-select-expand/div/div/ng-scrollbar/div/div/div/div/div/span[@title='${event}']`,
    datepickerSelectDay: (event) => `//pw-datepicker[contains(@style, "block")]//div[contains(@class, "pwCalendar-days-day")]/div[normalize-space(.)="${event}"]`,
    datepickerDay: (event) => `//div[contains(@class, "pwCalendar-days-day--selected")]/div[normalize-space(.)="${event}"]`,
    datepickerApply: `//pw-datepicker[contains(@style, "block")]/div/div/div/div/pw-button`,

    /*simple-cell*/
    simpleCell: (event) => `//*[contains(@class, "pwSimpleCell") and normalize-space(.)="${event}"]`,
    simpleCellActive: (event) => `//*[contains(@class, "pwSimpleCell--active") and normalize-space(.)="${event}"]`,
}