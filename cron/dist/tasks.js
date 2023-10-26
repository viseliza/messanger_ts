"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio_1 = require("cheerio");
class Tasks {
    static async pushGroups() {
        const url = 'https://portal.novsu.ru/univer/timetable/spo/';
        const AxiosInstance = axios_1.default.create();
        let data = [];
        await AxiosInstance.get(url)
            .then(response => {
            const html = response.data;
            const $ = cheerio_1.default.load(html), col = $('.block_content.content:first');
            col.find('tr').each((_, row) => {
                $(row).find('td').find('a').each(async (_, cell) => {
                    data.push({ "name": $(cell).text(), "href": $(cell).attr('href') });
                });
            });
        })
            .catch(console.error);
        try {
            const response = await fetch("http://localhost:3000/groups", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(await response.json());
        }
        catch (error) {
            console.error("Ошибка:", error);
        }
    }
}
Tasks.pushGroups();
//# sourceMappingURL=tasks.js.map