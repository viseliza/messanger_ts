import { CronJob } from 'cron';
import axios from 'axios';
import cheerio from 'cheerio';
import createGroupUtil from 'src/utils/createGroup.util';

export class CronStart {

    cronJob: CronJob;

    constructor() {
        this.cronJob = new CronJob('*/10 * * * * *', async () => {
            // try { await GroupController.instertGroup() }
            // catch (e) { console.error(e) }
            // fetch('http://localhost:3000/auth')
            //     .then((response) => {
            //         return response.json();
            //     })
            //     .then((data) => {
            //         console.log(data);
            //     });
        })
        if (!this.cronJob.running) {
            this.cronJob.start();
        }
        createGroupUtil({ name: "1992", href: "/npe/files/_timetable/ptk/1911 1981 1991 1992.xls?rnd=660962" })
    }

    static async pushGroups() {
        const url: string = 'https://portal.novsu.ru/univer/timetable/spo/';
        const AxiosInstance = axios.create();

        AxiosInstance.get(url)
            .then(
                response => {
                    const html = response.data;
                    const $ = cheerio.load(html),
                        col = $('.block_content.content:first');

                    col.find('tr').each((_, row) => {
                        $(row).find('td').find('a').each(async (_, cell) => {
                        })
                    })
                }
            )
            .catch(console.error)
    }
}