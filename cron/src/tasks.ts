import axios from 'axios';
import cheerio from 'cheerio';

class Tasks {
    static async pushGroups() {
        let groupsData = [];

        try {
            const response = await axios.get('https://portal.novsu.ru/univer/timetable/spo/');
            const $ = cheerio.load(response.data);

            $('.block_content.content:first').find('tr').each((_, row) => {
                $(row).find('td').find('a').each(async (_, cell) => {
                    groupsData = [...groupsData, { 'name': $(cell).text(), 'href': $(cell).attr('href')}];

                })
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }

        console.log(groupsData);

        try {
            const response = await axios.request({
                method: 'POST',
                url: 'http://localhost:3000/groups',
                data: groupsData,
                validateStatus: (status) => { return true; }
            })

            console.log(await response.data);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
}

// Tasks.pushGroups()