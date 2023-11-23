"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio_1 = require("cheerio");
class Tasks {
    static async wtf() {
        const response = await fetch('https://portal.novsu.ru/univer/timetable/spo/');
        const $ = cheerio_1.default.load(await response.text());
        const data = $('#npe_instance_125464_npe_content > div:nth-child(4) > b:nth-child(2)');
        console.log(data.text());
    }
    static async pushGroups() {
        let groupsData = [];
        try {
            const response = await axios_1.default.get('https://portal.novsu.ru/univer/timetable/spo/');
            const $ = cheerio_1.default.load(response.data);
            $('.block_content.content:first').find('tr').each((_, row) => {
                $(row).find('td').find('a').each(async (_, cell) => {
                    groupsData = [...groupsData, { 'name': $(cell).text(), 'href': $(cell).attr('href') }];
                });
            });
        }
        catch (error) {
            console.error('Ошибка:', error);
        }
        console.log(groupsData);
        try {
            const response = await axios_1.default.request({
                method: 'POST',
                url: 'http://localhost:3000/groups',
                data: groupsData,
                validateStatus: (status) => { return true; }
            });
            console.log(await response.data);
        }
        catch (error) {
            console.error('Ошибка:', error);
        }
    }
}
Tasks.wtf();
//# sourceMappingURL=tasks.js.map