import axios from 'axios';
import cheerio from 'cheerio';


interface Param {
    name: String;
    href: String;
}

class Tasks {
    static async pushGroups() {
        const url: string = 'https://portal.novsu.ru/univer/timetable/spo/';
        const AxiosInstance = axios.create();
        let data = [];
        
        await AxiosInstance.get(url)
            .then(
                response => {
                    const html = response.data;
                    const $ = cheerio.load(html),
                        col = $('.block_content.content:first');

                    col.find('tr').each((_, row) => {
                        $(row).find('td').find('a').each(async (_, cell) => {
                            data.push({ "name": $(cell).text(), "href": $(cell).attr('href') });
                        })
                    })
                }
            )
            .catch(console.error)

        try {
            const response = await fetch("http://localhost:3000/groups", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            console.log(await response.json());
        } catch (error) {
            console.error("Ошибка:", error);
        }
    }
}

Tasks.pushGroups()