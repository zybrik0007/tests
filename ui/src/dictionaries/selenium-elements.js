module.exports = {

    //Персонал
    //Сотруднкии
    perStaffCardAdditionalInput: (number) => `//app-user-card-cards/div/div[2]/div/div[${number}]//input`,
    perStaffCardAdditionalIcon: (number, icon) => `//app-user-card-cards/div/div[2]/div
    /div[${number}]//pw-icon/div[contains(@class, "${icon}")]`,
    perStaffAddCardButton: '//pw-placeholder',
    perStaffBarcodeImg: '//div[@class="pwBarcode__view"]//img',
    perStaffCarData: (title, number) => `//app-user-card-cars/div/div[${number}]/div//*[normalize-space(.)="${title}"]
    /parent::pw-field//input`,
    perStaffCarButton: (event) => `//div[@class="text-link" and normalize-space(.)="${event}"]`,
    perStaffCarAddImg: (name, number) => `//app-user-card-cars/div/div[${number}]//span[normalize-space(.)="${name}"]/span`,
    perStaffCarImg: (event) => `//app-user-card-cars/div/div[${event}]//img`,
    perStaffPrintCardLast: (event) => `//p[@class="pwPrintCard-mainInfo-desc" and normalize-space(.)="${event}"]`,
    perStaffDimissedValue: '//div[@class="dismissed__text"]',

    //Графики работы
    perSchedule: (name, work, nowork) => {
        let tree = `//div/*[normalize-space(.)="${name}"]/parent::*`
        tree += work ? '/div[@class="pwTreeNode__column"][1]//pw-icon/div[contains(@class, "Icon--check_box_on")]' +
            '/ancestor-or-self::div[@class="pwTreeNode__column"]/parent::*'
            : '*/div[@class="pwTreeNode__column"][1]//pw-icon/div[contains(@class, "Icon--check_box_off")]' +
            '/ancestor-or-self::div[@class="pwTreeNode__column"]/parent::*'

        tree += nowork ? '/div[@class="pwTreeNode__column"][2]//pw-icon/div[contains(@class, "Icon--check_box_on")]':
            '/div[@class="pwTreeNode__column"][2]//pw-icon/div[contains(@class, "Icon--check_box_on")]'

        return tree
    },
    perScheduleCheckbox: (name, num) => `//div/*[normalize-space(.)="${name}"]/parent::*
    /div[@class="pwTreeNode__column"][${num}]//pw-icon/div[contains(@class, "Icon--check_box_on")]`,
    perScheduleCheckbox: (name, num) => `//div/*[normalize-space(.)="${name}"]/parent::*
    /div[@class="pwTreeNode__column"][${num}]//pw-icon/div[contains(@class, "Icon--check_box_off")]`,
    perScheduleScroll: (x, y) => `document.querySelector(".pwContainer-content").scrollBy(${x}, ${y});`,
    perScheduleSettingsHour: (event) => `//div[@class="schedule-bound-item"]/span[normalize-space(.)="${event}"]
    /parent::*/pw-timepicker//div[@class="pwTimePicker-hour"]//input`,
    perScheduleSettingsMinute: (event) => `//div[@class="schedule-bound-item"]/span[normalize-space(.)="${event}"]
    /parent::*/pw-timepicker//div[@class="pwTimePicker-minute"]//input`,
    perScheduleRoomCheckbox: (room, work, noWork) => {
      const roomName =  `//div[@class="pwTreeNode"]//div[2][normalize-space(.)="${room}"]`;

      let workValue = `/parent::div[@class="pwTreeNode"]//div[@class="pwTreeNode__column"][1]//pw-checkbox
      /div[@class!="pwCheckbox pwCheckbox--checked"]`;
      if(work) {
          workValue = `/parent::div[@class="pwTreeNode"]//div[@class="pwTreeNode__column"][1]//pw-checkbox
          /div[@class="pwCheckbox pwCheckbox--checked"]`
      }

      let noWorkValue = `/parent::*/parent::*/parent::*//div[@class="pwTreeNode__column"][2]//pw-checkbox
      /div[@class!="pwCheckbox pwCheckbox--checked"]`;
      if(noWork) {
          noWorkValue = `/parent::*/parent::*/parent::*//div[@class="pwTreeNode__column"][2]//pw-checkbox
      /div[@class="pwCheckbox pwCheckbox--checked"]`;
      }

      return roomName + workValue + noWorkValue

    },
    perScheduleDay: (event) => `//div[@class="daysSelect"]/button[normalize-space(.)="${event}"]`,
    perScheduleDayActive: (event) => `//div[@class="daysSelect"]
    /button[normalize-space(.)="${event}" and contains(@class, "active")]`,
    perScheduleDayNoActive: (event) => `//div[@class="daysSelect"]
    /button[normalize-space(.)="${event}" and not(contains(@class, "active"))]`,


    //Подразделения
    perDivisionTree: (arr) => {
        let tree = '';
        const decorate = (event) => `/pw-tree-row/div/pw-tree-node/div/div/div[normalize-space(.)="${event}"]`;
        arr.forEach((division, index) => {
            tree += index === 0 ? `/${decorate(division)}` :
                `/parent::*/parent::*/parent::*/parent::*${decorate(division)}`;
        });
        return tree;
    },
    perDivisionSelected: (event) => `//pw-tree-row/div/pw-tree-node/div/div/div[normalize-space(.)="${event}" 
    and contains(@class, "pwTreeNode--node-select")]`,
    perDivisionList: '//div[@class="pwTreeNode--node_el-name"]',
    perDivisionIcon: (name, icon) => `//pw-tree-row/div/pw-tree-node/*[normalize-space(.)="${name}"]
    //div[contains(@class, "${icon}")]`,

    perHolidayMonth: (event) => `//div[@class="calendar"]/div[${event}]//div[@class="pwCalendarHoliday-title"]`,
    perHolidayDay: (month, day) => `//div[@class="calendar"]/div[${month}]//div[@class="pwCalendarHoliday-days"]/div[${day}]`,
    perHolidayDayNumber: (month, day) => `//div[@class="calendar"]/div[${month}]//div[@class="pwCalendarHoliday-days"]
    /div[${day}]/div`,


    //Бюро пропусков
    //Шаблоны доступа - изменение
    pasAccessTemplateChangeRoom: (event) => `//pw-tree-node/div/div/div/div
    /div[@class="pwTreeNode--node_el-name" and normalize-space(.)="${event}"]`,
    pasAccessTemplateChangeRoomParams: (name, type, criterion, access, commission, protection, verif, antipass) => {
        const head = '//pw-tree-node/div/div/div[contains(@class, "pwTreeNode--node-type-room")]'
        const named = `/div[1]/div[normalize-space(.)="${name}"]/parent::div/parent::div`
        const typed = `/div[2]/div[normalize-space(.)="${type}"]/parent::div/parent::div`
        const criteriond = `/div[3]/div[normalize-space(.)="${criterion}"]/parent::div/parent::div`
        const accessd = `/div[4]/div[normalize-space(.)="${access}"]/parent::div/parent::div`
        const commissiond = `/div[5]/div[normalize-space(.)="${commission}"]/parent::div/parent::div`

        let protectiond = '/div[6]/pw-checkbox/div[not(contains(@class, "pwCheckbox--checked"))]' +
            '/parent::pw-checkbox/parent::div/parent::div'
        if(protection) {
            protectiond = '/div[6]/pw-checkbox/div[contains(@class, "pwCheckbox--checked")]' +
                '/parent::pw-checkbox/parent::div/parent::div'
        }

        let verifd = '/div[7]/pw-checkbox/div[not(contains(@class, "pwCheckbox--checked"))]' +
            '/parent::pw-checkbox/parent::div/parent::div'
        if(verif) {
            verifd = '/div[7]/pw-checkbox/div[contains(@class, "pwCheckbox--checked")]' +
                '/parent::pw-checkbox/parent::div/parent::div'
        }

        let antipassd = '/div[8]/pw-checkbox/div[not(contains(@class, "pwCheckbox--checked"))]' +
            '/parent::pw-checkbox/parent::div/parent::div'
        if(antipass) {
            antipassd =  '/div[8]/pw-checkbox/div[contains(@class, "pwCheckbox--checked")]' +
                '/parent::pw-checkbox/parent::div/parent::div'
        }

        return head + named + typed + criteriond + accessd + commissiond + protectiond + verifd + antipassd
    },
    pasSchedulesModalSelectSchedule: (event) => `//div/div[@class="block-desc" and normalize-space(.)="${event}"]
    /parent::*`,
    pasSchedulesModalSelectScheduleActive: (event) => `//div[contains(@class, "selected-block")]
    /div[@class="block-desc" and normalize-space(.)="${event}"]/parent::*`,
    pasAccessSchedule: (event) => `//div[contains(@class, 'intervals-block')][${event}]/div[@class="timeline"]`,
    pasAccessScheduleActive: `//div[contains(@class, 'intervals-block') and contains(@class, 'selected-block')]` ,
    pasAccessScheduleDisabled: (event) => `//div[contains(@class, 'intervals-block') 
    and not(contains(@class, 'selected-block'))][${event}]/div[@class="timeline"]`,
    pasAccessScheduleName: (event) => `//div[contains(@class, 'intervals-block')][${event}]/div[@class="block-desc"]`,
    pasAccessScheduleTitle: (event) => `//div[contains(@class, 'intervals-block')][${event}]/div[@class="block-title"]`,
    pasAccessScheduleInterval: (schedule, interval) => `//div[contains(@class, 'intervals-block')][${schedule}]
    /div[@class="timeline"]/div[${interval}]`,
    pasAccessScheduleIntervalIcon: (schedule, interval) => `//div[contains(@class, 'intervals-block')][${schedule}]
    /div[@class="timeline"]/div[${interval}]/pw-icon[@parsevalue="unsorted_delete_outline_android"]`,
    pasAccessScheduleIntervalInput: (schedule, interval, input) => `//div[contains(@class, 'intervals-block')]
    [${schedule}]/div[@class="timeline"]/div[contains(@class,"interval")][${interval}]/input[${input}]`,
    passAccessScheduleChangeWeekScroll: (x, y) => `document.querySelector(".intervals-box").scrollBy(${x}, ${y});`,
    passAccessScheduleChangeSWeekName: (num, str) => `//div[@class="weeks-two-columns"]/div[${num}]
    //pw-group-cell[${str}]//div[@class="weekItem__text"][1]`,
    passAccessScheduleChangeSWeekList: (num) =>  `//div[@class="weeks-two-columns"]/div[${num}]//pw-group-cell
    //div[@class="weekItem__text"][1]`,
    passAccessScheduleChangeSWeekBut: (num, str) => `//div[@class="weeks-two-columns"]/div[${num}]
    //pw-group-cell[${str}]//pw-button`,
    passAccessScheduleChangeSWeekScroll: (x, y) =>
        `document.querySelector('.weeks-right-box > .list > pw-group').scrollBy(${x}, ${y});`,
    passAccessScheduleChangeSWeekSelectedScroll: (x, y) =>
        `document.querySelector('.wide > div > .list > pw-group').scrollBy(${x}, ${y})`,
    passAccessScheduleHolidayDate: (event) => `//pw-group-cell[${event}]/div/div/span[1]`,
    passAccessScheduleHolidayType: (event) => `//pw-group-cell[${event}]/div/div/span[2]`,
    passAccessScheduleHolidayDelete: (event) => `//pw-group-cell[${event}]//pw-button`,
    passAccessScheduleHoliday: '//pw-group-cell',
    passAccessRoom: (event) => `//div[@class="pwTreeNode--node_el-name" and normalize-space(.)="${event}"]`,
    designCardSize: '//div[@class="card_wrapper"]/app-business-card',
    designCard: (event) => `//div[@class="card_wrapper"][${event}]/app-business-card`,
    designCardName: (event) => `//div[@class="card_wrapper"][${event}]//div[@class="cw-title"]`,
    designCardType: (event) => `//div[@class="card_wrapper"][${event}]//div[@class="cw-user_type"]`,

    //УРВ
    //Журнал отработанного времени
    urvJournalStaffParam: (param, value) => `//pw-row//*[normalize-space(.)="${param}"]/parent::*/parent::*/parent::
    */parent::*//*[normalize-space(.)="${value}"]`,
    urvJournalStaffFIO: `//h3`,


    //Администрирование
    room: (arr) => {
        const head = `//pw-tree-row//pw-tree-node//div[@class="pwTreeNode--node_el-name" and 
        normalize-space(.)="${arr[0]}"]`;
        let body = '';

        if(arr.length === 1) {
            return head;
        } else {
            let arrSlice = arr.slice(1);
            arrSlice.forEach(item => {
                body += '//parent::*/parent::*/parent::*/parent::*/parent::*/parent::*/pw-tree-row' +
                    `//pw-tree-node//div[@class="pwTreeNode--node_el-name" and normalize-space(.)="${item}"]`;
            });
            return head + body;
        }
    },
    roomDevice: (arr) => {
        const head = '//pw-tree-row';
        let body = '';
        let arrSlice = arr.slice(0, arr.length - 2);
        arrSlice.forEach(item => {
            body += `//pw-tree-node//div[@class="pwTreeNode--node_el-name" and normalize-space(.)="${item}"]` +
                '//parent::*/parent::*/parent::*/parent::*/parent::*/parent::*/pw-tree-row';
        });
        return head + body;
    },

    admSearchDevice: (event) => `//span/span[2][normalize-space(.)="(${event})"]`,
    admSearchDeviceActive: (event) => `//span[contains(@class, "active")]/span[2][normalize-space(.)="(${event})"]`,
    admDevice: (device, ip) => `//pw-tree-node//div[normalize-space(.)="${device}"]/parent::*
    //div[normalize-space(.)="(${ip})"]/parent::*`,
    admDeviceActive: (device, ip) => `//pw-tree-node//div[normalize-space(.)="${device}"]/parent::*
    //div[normalize-space(.)="(${ip})"]/parent::*//span[@class="device-lock"]`,
    admDeviceLockStatus: (device, ip) => `//pw-tree-node//div[normalize-space(.)="${device}"]
    /parent::*//div[normalize-space(.)="(${ip})"]/parent::*//span[contains(@class, "device-lock-status")]`,
    admDeviceIUStatus: (device, ip) => `//pw-tree-node//div[normalize-space(.)="${device}"]
    /parent::*//div[normalize-space(.)="(${ip})"]/parent::*//span[contains(@class, "iu-state")]`,


    //Конфигурация
    admConfRoomTreeRoot: '//pw-tree-row/div/pw-tree-node/div/div/div[normalize-space(.)="Неконтролируемая территория"]',
    admConfRoomTree: (arr) => {
        let tree = '//pw-tree-row/div/pw-tree-node/div/div/div[normalize-space(.)="Неконтролируемая территория"]'
        arr.forEach(room => tree += `/parent::*/parent::*/parent::*/parent::*/pw-tree-row/div/pw-tree-node/div/div
        /div[normalize-space(.)="${room}"]`)
        return tree
    },
    admConfRoomTreeDevice: (arr, name, ip, active) => {
        let tree = '//pw-tree-row/div/pw-tree-node/div/div/div[normalize-space(.)="Неконтролируемая территория"]'
        const deviceName = `/parent::*/parent::*/parent::*/parent::*/pw-tree-row/div/pw-tree-node/div/div/div/div
        /div[normalize-space(.)="${name}"]`
        const deviceIp = `/parent::div/div/div/div[normalize-space(.)="(${ip})"]`
        const deviceActive = `/parent::div/span/div[@title="Заблокирован"]`
        arr.forEach(room => tree += `/parent::*/parent::*/parent::*/parent::*/pw-tree-row/div/pw-tree-node
        /div/div/div[normalize-space(.)="${room}"]`)

        if(active) {
            return tree + deviceName + deviceIp + deviceActive
        }

        return tree + deviceName + deviceIp
    },
    admConfDevice: (name, ip, active) => {
        if(active) {
            return `//div[normalize-space(.)="${name}"]/parent::*/div/div/div[normalize-space(.)="(${ip})"]
            /parent::*/span/div[@title="Заблокирован"]`
        }

        return `//div[normalize-space(.)="${name}"]/parent::*/div/div/div[normalize-space(.)="(${ip})"]`
    },

    //Лицензии
    licenseDisabled: (title, name) => `//div[@class="block-license"]//h4[normalize-space(.)='${title}']
    /parent::*/parent::*//div[normalize-space(.)='${name}']`,
    licenseActive: (title, name) => `//div[@class="block-license block-license-warning"]
    //h4[normalize-space(.)='${title}']/parent::*/parent::*//div[normalize-space(.)='${name}']`,
    licenseInfo: (title, name, text) => `//div[@class="block-license block-license-warning"]
    //h4[normalize-space(.)='${title}']/parent::*/parent::*//div[normalize-space(.)='${name}']
    /parent::*//*[contains(normalize-space(), "${text}")]`,
    licenseSwitch: (title, name) => `//div[contains(@class, "block-license")]//h4[normalize-space(.)='${title}']
    /parent::*/parent::*//div[normalize-space(.)='${name}']/parent::*//pw-icon[@name='power_settings_new']`,
    licenseMore: (title, name) => `//div[contains(@class, "block-license")]//h4[normalize-space(.)='${title}']
    /parent::*/parent::*//div[normalize-space(.)='${name}']/parent::*//span[normalize-space(.)='Подробно']`,

    //Авторизация
    authLoginInput: '//pw-input[@id="login"]/label/input',
    authPasswordInput: '//pw-input[@id="password"]/label/input',
    authPasswordRepeatInput: '//pw-input[@id="password2"]/label/input',
    formStatus: '//pw-form-status/div/span',

    //Навигация
    section: (event) => `//pw-icon/div[contains(@class, "${event}")]`,
    sectionActive: (event) => `//pw-icon[contains(@class, "active")]/div[contains(@class, "${event}")]`,
    subsection: (event) => `//a[contains(@class, "navigation-item") and @href="${event}"]`,
    subsectionActive: (event) => `//a[@class="navigation-item active" and @href="${event}"]`,
    subsectionHeader: () => '//div[@class="sidebar-title"]',
    tab: (event) => `//div[@class="tab"]/div[normalize-space(.)="${event}"]`,
    tabActive: (event) => `//div[@class="tab"]/div[contains(@class, "active") and normalize-space(.)="${event}"]`,

    //input
    input: (title, placeholder) =>`//*[normalize-space(.)="${title}"]//input[@placeholder="${placeholder}"]`,
    inputIcon: (title, placeholder, icon) => `//*[normalize-space(.)="${title}"]
    //input[@placeholder="${placeholder}"]/parent::*//pw-icon/div[contains(@class, "${icon}")]`,

    //input-number
    inputNumber: (title, placeholder, num) =>`//*[${num}][normalize-space(.)="${title}"]//input[@placeholder="${placeholder}"]`,
    inputNumberIcon: (title, placeholder, num, icon) => `//*[${num}][normalize-space(.)="${title}"]
    //input[@placeholder="${placeholder}"]/parent::*//pw-icon/div[contains(@class, "${icon}")]`,

    //select
    select: (title, value) => `//*[normalize-space(.)="${title}"]/parent::*
    //span[normalize-space(.)="${value}"]`,
    selectIcon: (title, value, icon) => `//*[normalize-space(.)="${title}"]/parent::*
    //span[normalize-space(.)="${value}"]/parent::*/parent::*//pw-icon/div[contains(@class, "${icon}")]`,

    //select-multi
    selectMulti: (event) => `//*[normalize-space(.)="${event}"]/parent::*/pw-select`,
    selectMultiIcon: (title, icon) => `//div[normalize-space(.)="${title}"]/parent::*//pw-icon
    /div[contains(@class, "${icon}")]`,
    selectMultiVal: (title, num) => `//*[normalize-space(.)="${title}"]/parent::*//pw-select-item-select[${num}]
    /div/div[1]`,
    selectMultiValDelete: (title, num) => `//*[normalize-space(.)="${title}"]/parent::*//pw-select-item-select[${num}]
    /div/div[2]`,

    //select-input
    selectInput: (title, placeholder) => `//*[normalize-space(.)="${title}"]//input[@placeholder="${placeholder}"]`,
    selectInputIcon: (title, placeholder, icon) => `//*[normalize-space(.)="${title}"]
    //input[@placeholder="${placeholder}"]//parent::*//parent::*//pw-icon/div[contains(@class, "${icon}")]`,

    //select-xpand
    selectXpand: '//pw-select-expand',
    selectXpandItem: (event) => `//pw-select-expand//*[normalize-space(.)="${event}"]`,
    selectScrollTop: (x, y) =>
        `document.querySelector("pw-select-expand > div > div > ng-scrollbar > div > div > div").scrollBy(${x}, ${y});`,

    //button
    button: (event) => `//pw-button//span[normalize-space(.)="${event}"]/parent::*/parent::*`,
    buttonActive: (event) => `//pw-button[not(contains(@class, "disabled"))]//span[normalize-space(.)="${event}"]/span
    /parent::*/parent::*`,
    buttonDisabled: (event) => `//pw-button[contains(@class, "disabled")]//span[normalize-space(.)="${event}"]
    /parent::*/parent::*`,

    //radio
    radio: (event) => `//app-radio//*[normalize-space(.)="${event}"]`,

    //button-icon
    buttonIcon: (event) => `//pw-button//pw-icon/div[contains(@class, "${event}")]`,

    //button-icon-before
    buttonIconBefore: (event) => `//pw-button[@addbefore="${event}"]`,
    buttonIconBeforeActive: (event) => `//pw-button[@addbefore="${event}" and not(contains(@class, "disabled"))]`,
    buttonIconBeforeDisabled: (event) => `//pw-button[@addbefore="${event}" and contains(@class, "disabled")]`,

    //button-icon-after
    buttonIconAfter: (event) => `//pw-button[@addafter="${event}"]`,
    buttonIconAfterActive: (event) => `//pw-button[@addafter="${event}" and not(contains(@class, "disabled"))]`,
    buttonIconAfterDisabled: (event) => `//pw-button[@addafter="${event}" and contains(@class, "disabled")]`,

    //checkbox
    checkbox: (event) => `//pw-checkbox//*[normalize-space(.)="${event}"]//pw-icon`,
    checkboxChecked: (event) => `//pw-checkbox//*[normalize-space(.)="${event}"]//pw-icon
    /div[contains(@class, "Icon--check_box_on")]`,
    checkboxUnchecked: (event) => `//pw-checkbox//*[normalize-space(.)="${event}"]//pw-icon
    /div[contains(@class, "Icon--check_box_off")]`,

    //pop-up-error
    popUpError: (event) => `//div[contains(@class, "pwToast--wrapper-type-error")]/div[@class="pwToast--wrapper--after"]
    /div[normalize-space(.)='${event}']`,
    popUpErrorStr: '//div[contains(@class, "pwToast--wrapper-type-error")]/div[@class="pwToast--wrapper--after"]/div',
    popUpClose: (event) => `//div[contains(@class, "pwToast--wrapper-type-error")]/div[@class="pwToast--wrapper--after"]
    /div[normalize-space(.)='${event}']/parent::*/parent::*/div[contains(@class, "pwToast--wrapper--close")]`,

    //pop-up-success
    popUpSuccess: (event) => `//div[contains(@class, "pwToast--wrapper-type-success")]
    /div[@class="pwToast--wrapper--after"]/div[text()='${event}']`,
    popUpSuccessStr: '//div[contains(@class, "pwToast--wrapper-type-success")]' +
        '/div[@class="pwToast--wrapper--after"]/div',

    //loader
    loader: (event) => `//pw-loading[@size="${event}"]`,

    //table
    tableStr: '//pw-table-body/div[2]//pw-table-body-row',
    tableStrNum: (event) => `//pw-table-body/div[2]//pw-table-body-row[${event}]`,
    tableStrNumActive: (event) => `//pw-table-body/div[2]//pw-table-body-row[${event}][contains(@class, 
    "pwTableBody__selected")]`,
    tableHeadText: (event) => `//pw-table-header//pw-table-header-column[${event}]/div/div[contains(@class, 
    "pwTableHeaderColumn--name")]`,
    tableHeadIcon: (cell, icon) => `//pw-table-header//pw-table-header-column[${cell}]/div/div[contains(@class, 
    "pwTableHeaderColumn--name")]//pw-icon/div[contains(@class, "${icon}")]`,
    tableCellText: (str, cell) => `//pw-table-body/div[2]//pw-table-body-row[${str}]//pw-table-body-row-column[${cell}]
    /div/div`,
//pw-table-body/div[2]//pw-table-body-row[1]//pw-table-body-row-column[45]/div/div
    tableCellImg: (str, cell) => `//pw-table-body/div[2]//pw-table-body-row[${str}]//pw-table-body-row-column[${cell}]
    /div/div//img`,
    tableCellIcon: (str, cell, icon) => `//pw-table-body/div[2]//pw-table-body-row[${str}]
    //pw-table-body-row-column[${cell}]/div/div/pw-icon/div[contains(@class, "${icon}")]`,
    tableHeadSort: (num, icon) => `//pw-table-header//pw-table-header-column[${num}]
    /div//pw-icon/div[contains(@class, "${icon}")]`,
    tableHeadNoSort: (num, asc, desc) => `//div[@class="datatable-row-center"][1]/
    div[1][not(contains(@class, "${asc}")) and not(contains(@class, "${desc}"))]`,
    tableSuperHeadText: (event) => `//div[@class="pwTableHeaderColumnSuper"][${event}]/pw-table-header-column/div/div[1]`,
    tableSubSuperHeadText: (superCell, subCell) => `//div[@class="pwTableHeaderColumnSuper"][${superCell}]
    /div[1]/pw-table-header-column[${subCell}]/div/div[2]`,




    //header
    headerProfile: '//app-header//app-user-bar',
    headerUserName: '//app-header//*[@class="profile_view__name"]',
    headerMenu: '//app-header//*[@class="profile_menu"]',
    headerMenuItem: (event) => `//app-header//*[@class="profile_menu_item" and normalize-space(.)="${event}"]`,
    headerText: '//div[@class="title"]',

    //footer
    footerSelectActiveCount: '//div[@class="page-count"]/pw-select//span',
    footerCount: '//div[@class="page-count"]/span',
    footerPage: (event) => `//ul[@class="pager"]/li/a[normalize-space(.)="${event}"]`,
    footerPageActive: (event) => `//ul[@class="pager"]/li[contains(@class, "active")]/a[normalize-space(.)="${event}"]`,
    footerPageIcon: (event) => `//ul[@class="pager"]/li/a[@aria-label="${event}"]`,
    footerPageIconDisabled: (event) => `//ul[@class="pager"]/li[@class="disabled"]/a[@aria-label="${event}"]`,
    footerPageIconActive: (event) => `//ul[@class="pager"]/li[not(contains(@class, "disabled"))]
    /a[@aria-label="${event}"]`,
    footerPageArea: '//div[@class="datatable-pager" and attribute::*[contains(local-name(), "hidden")]]',

    //modal
    modalId: (event) =>  `//pw-modal[@id="${event}" and contains(@style, "block")]`,
    modalIdNoBlock: (event) => `//pw-modal[@id="${event}"]`,
    modalTitle: (event) => `//*[contains(@class, 'pw-modal-title') and normalize-space(.)="${event}"]`,
    modalButClose: (event) => `//pw-modal[@id="${event}"]//pw-icon[@parsevalue="navigation_close"]`,
    modalButton: (id, text) => `//pw-modal[@id="${id}"]//pw-button//span[normalize-space(.)="${text}"]
    /parent::*/parent::*`,
    modalButtonDisabled: (id, text) => `//pw-modal[@id="${id}"]//pw-button[contains(@class, "disabled")]
    //span[normalize-space(.)="${text}"]/parent::*/parent::*`,
    modalButtonActive: (id, text) => `//pw-modal[@id="${id}"]//pw-button[not(contains(@class, "disabled"))]
    //span[normalize-space(.)="${text}"]/parent::*/parent::*`,

    //dialog
    dialog: '//pw-dialog',
    dialogTitle: (event) => `//*[contains(@class, "pwDialog__header-title") and normalize-space(.)="${event}"]`,
    dialogButClose: `//pw-dialog//pw-icon[@parsevalue="navigation_close"]`,
    dialogButton: (text) => `//pw-dialog//pw-button//span[normalize-space(.)="${text}"]
    /parent::*/parent::*`,
    dialogButtonDisabled: (text) => `//pw-dialog//pw-button[contains(@class, "disabled")]
    //span[normalize-space(.)="${text}"]/parent::*/parent::*`,
    dialogButtonActive: (text) => `//pw-dialog//pw-button[not(contains(@class, "disabled"))]
    //span[normalize-space(.)="${text}"]/parent::*/parent::*`,

    //modal all
    modalSelectAccessZone: (x, y) => `document.querySelector(".time-zones-wrapper").scrollBy(${x}, ${y});`,

    //modal import file
    modalImportInputFile: (event) => `//pw-modal[@id="${event}"]//input[@type="file"]`,
    modalImportBody: (event) => `//pw-modal[@id="${event}"]//app-import/div/div/div`,
    modalImportScroll: (x, y) => `document.querySelector('.pwImport > div:nth-child(2)').scrollBy(${x}, ${y});`,

    //modal print table
    modalPrint: (event) => `/pw-modal[@id="${event}"]`,
    modalPrintHead: (id, head) => `//pw-modal[@id="${id}"]//thead/tr/th[${head}]/p`,
    modalPrintColumn: (id, str, cell) => `//pw-modal[@id="${id}"]//tbody/tr[${str}]/td[${cell}]/p`,
    modalPrintColumnImg: (id, str, cell) => `//pw-modal[@id="${id}"]//tbody/tr[${str}]/td[${cell}]/div/img`,

    //modal AdditionalData
    modalAdditionalDataInput: (title, num) => `//pw-field/*[normalize-space(.)="${title}"]//parent::*
    /div[@class="pwAdditionalFlex"][${num}]//input`,
    modalAdditionalDataButton: (title, num) => `//pw-field/*[normalize-space(.)="${title}"]//parent::*
    /div[@class="pwAdditionalFlex"][${num}]//button`,


    //modal-confirm
    modalConfirm: `//pw-modal[@class='modal-confirm']`,
    modalConfirmTitle: (event) => `//pw-modal[@class="modal-confirm"]//div[normalize-space(.)='${event}']`,
    modalConfirmBody: (event) => `//pw-modal[@class="modal-confirm"]//div[normalize-space(.)='${event}']`,
    //pw-modal[@class="modal-confirm"]//div[normalize-space(.)='Вы действительно хотите удалить эту фотографию?']
    modalConfirmButton: (event) => `//pw-modal[@class="modal-confirm" and contains(@style, "block")]
    //pw-button/button/span[normalize-space(.)="${event}"]`,
    modalConfirmButtonDisabled: (event) => `//pw-modal[@class="modal-confirm" and contains(@style, "block")]
    //pw-button/button[contains(@class, "disabled")]/span[normalize-space(.)="${event}"]`,
    modalConfirmButtonActive: (event) => `//pw-modal[@class="modal-confirm" and contains(@style, "block")]
    //pw-button/button[not(contains(@class, "disabled"))]/span[normalize-space(.)="${event}"]`,
    modalConfirmButClose:  '//pw-modal[@class="modal-confirm" and contains(@style, "block")]' +
        '//pw-icon[@parsevalue="navigation_close"]',


    //Общие (general)
    genTree: (name, inside) => {
        let first =  '//pw-tree-row[@class="pwTree--first"]/div/'
        const node = 'pw-tree-node/div/'
        const row = 'pw-tree-row/div/'
        const roomName = `div[@class="pwTreeNode__wrapper"]/div/div[@class="pwTreeNode--node_el"]
        /div[@class="pwTreeNode--node_el-name" and text()=" ${name} "]/parent::div`
        for(let i=0; i < inside; i++) {
            first += row
        }
        return first + node + roomName
    },
    genGroupCellItemName: (event) => ` //div[@class="pwGroupCell--item-name" and text=${event}]`,

    //datepicker
    datepicker: '//pw-datepicker[contains(@style, "block")]',
    datepickerButtonMonth: `//pw-datepicker[contains(@style, "block")]/div/div/div/pw-select[1]`,
    datepickerMonth: (event) => `//pw-datepicker[contains(@style, "block")]/div/div/div/pw-select[1]/div/div/div
    /span[normalize-space(.)="${event}"]`,
    datepickerButtonYear: `//pw-datepicker[contains(@style, "block")]/div/div/div/pw-select[2]`,
    datepickerYear: (event) => `//pw-datepicker[contains(@style, "block")]/div/div/div/pw-select[2]/div/div/div
    /span[normalize-space(.)="${event}"]`,
    datepickerButtonHour: '//pw-datepicker[contains(@style, "block")]/div/div[3]/div/div/pw-select[1]',
    datepickerHour: (event) => `//pw-datepicker[contains(@style, "block")]/div/div[3]/div/div/pw-select[1]/div/div/div
    /span[normalize-space(.)="${event}"]`,
    datepickerButtonMinute: '//pw-datepicker[contains(@style, "block")]/div/div[3]/div/div/pw-select[2]',
    datepickerMinute: (event) => `//pw-datepicker[contains(@style, "block")]/div/div[3]/div/div/pw-select[2]/div/div
    /div/span[normalize-space(.)="${event}"]`,
    datepickerSelect: (event) => `//pw-select-expand/div/div/ng-scrollbar/div/div/div/div/div/span[@title='${event}']`,
    datepickerSelectDay: (event) => `//pw-datepicker[contains(@style, "block")]
    //div[contains(@class, "pwCalendar-days-day")]/div[normalize-space(.)="${event}"]`,
    datepickerDay: (event) => `//div[contains(@class, "pwCalendar-days-day--selected")]
    /div[normalize-space(.)="${event}"]`,
    datepickerApply: `//pw-datepicker[contains(@style, "block")]//pw-button[@addbefore="unsorted_check"]/button`,

    //simple-cell
    simpleCell: (event) => `//*[contains(@class, "pwSimpleCell") and normalize-space(.)="${event}"]`,
    simpleCellActive: (event) => `//*[contains(@class, "pwSimpleCell--active") and normalize-space(.)="${event}"]`,

    //pw-group-cell
    pwGroupCell: (event) => `//pw-group-cell//*[contains(text(), "${event}")]/parent::*`,
    pwGroupCellChecked: (event) => `//pw-group-cell//*[contains(text(), "${event}")]
    /parent::*//*[contains(@class, "Icon--check_circle_filled_blue")]`,

    //empty-row
    emptyRow: '//*[@class="empty-row"]',

    //pwPlaceholder--text
    placeholderText: '//*[@class="pwPlaceholder--text"]',

    //menu
    menuNavigation: '//pw-action-sheet',
    menuNavigationItem:  (event) => `//pw-action-sheet-item/*[normalize-space(.)='${event}']`,
    menuNavigationItemActive:  (event) => `//pw-action-sheet-item[not(contains(@class, "disabled"))]
    /*[normalize-space(.)="${event}"]`,
    menuNavigationItemDisabled: (event) => `//pw-action-sheet-item[contains(@class, "disabled")]
    /*[normalize-space(.)="${event}"]`,

    // pwTreeNode
    pwTreeNode: (event) => `//*[contains(@class, "pwTreeNode--node")]//*[normalize-space(.)="${event}"]`,

    // Photography
    photoAddButton: (event) => `//pw-placeholder//span[normalize-space(.)="${event}"]`,
    photoStaff: `//*[@class="pwStaffInfo__photo"]//img`,
    photoVisitor: `//*[@class="pwVisitorInfo__photo"]//img`,
    photoAdditional: (num, text) => `//div[@class="pwAdditionalImages"][${num}]//span[normalize-space(.)="${text}"]`,
    photoAdditionalName: (num) => `//div[@class="pwAdditionalImages"][${num}]//div[@class="pwImageBlock__title"]`,
    photoAdditionalImage: (num) => `//div[@class="pwAdditionalImages"][${num}]//img`,

    //modal-change-photo
    modalChangePhotoInput: (event) =>  `//pw-modal[@id="${event}" and contains(@style, "block")]//input`,
    modalChangePhotoImg: (event) =>  `//pw-modal[@id="${event}" and contains(@style, "block")]//img`,
    modalChangePhotoPlaceholder: (event) => `//pw-modal[@id="${event}" and contains(@style, "block")]
    //div[@class="pwPlaceholder--text"]`,

    //CardControlsNumber
    modalCardControlsNumber: `//pw-modal[@id="card-controls" and contains(@style, "block")]`,
    modalCardControlsNumberInput:(title, placeholder) => `//pw-modal[@id="card-controls" and contains(@style, "block")]
    //*[normalize-space(.)="${title}"]//input[@placeholder="${placeholder}"]`,
    modalCardControlsNumberButton: (event) => `//pw-modal[@id="card-controls" and contains(@style, "block")]
    //*[normalize-space(.)="${event}"]/button`,

    //printBarcode
    modalPrintBarcodeName: (number) => `//app-print-user-barcode/div[2]/div[1]/div/span[${number}]`,
    modalPrintBarcodeValue: (number) => `//app-print-user-barcode/div[2]/div[1]/div/p[${number}]`,

    //printVisitorBarcode
    modalPrintVisitorBarcodeName: (number) => `//app-print-visitor-barcode/div[2]/div[1]/div/span[${number}]`,
    modalPrintVisitorBarcodeValue: (number) => `//app-print-visitor-barcode/div[2]/div[1]/div/p[${number}]`,

    //Timepicker
    timepicker: '//pw-timepicker',
    timepickerInput: (number) => `//pw-timepicker/div/div[${number}]//input`,
    pageWorkedJournalClockInput: '//*[normalize-space(.)="Длительность"]//parent::pw-field' +
        '/pw-input[@icon="unsorted_recent_outline"]//pw-icon',

    //timesheet
    timesheetDay: (str, cell) => `//tr[${str}]/td[${cell}]`,
    timesheetSelectIcon: (event) => `//*[normalize-space(.)="${event}"]/parent::*//pw-icon`


}