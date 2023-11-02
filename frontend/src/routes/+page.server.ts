import type { PageServerLoad } from './$types';
import xlsx from 'node-xlsx';
import fs from 'node:fs';
import WordExtractor from 'word-extractor';

export const load: PageServerLoad = async () => {
	// SELECT GROUP
	// const url = `https://3000-viseliza-messangerts-5xdi4l2llw2.ws-eu105.gitpod.io/group/1992`;
	// const response = await fetch(url);
	// return await response.json();

	const group: string = "1921";
	const file_name: string = "1911 1981 1991 1992";
	const path = `src/lib/docs/${file_name}.xlsx`;

	// if (!fs.existsSync(path)) await Replacement.downloadFile(group.href, path);

	const schedule: string = getSchedule(group, path);
	const replacement: string = await getReplacemnt(group, "src/lib/docs/30.10.2023.doc");
	return {
		schedule,
		replacement
	}
}

// Получение расписания
function getSchedule(group: string, path: string): string {
	const workSheetsFromFile = xlsx.parse(path);
	const data = workSheetsFromFile[0].data;

	let column: number = 0;

	// Список всех дней недели
	const days_array = [
		'понедельник',
		'вторник',
		'среда',
		'четверг',
		'пятница',
		'суббота'
	]

	// 	// Итоговое расписание для выбранной группы
	let result: string = "";

	// 	// Перебирает группы из файла
	for (let el of data[6]) {
		if (el != undefined && String(el).includes(group)) {
			break;
		}
		column += 1;
	}


	for (let row = 7; row < Object.keys(data).length - 1; row++) {
		let time = data[row][column - 2];
		let replacement = data[row][column - 1];
		let day_of_the_weak = data[row][column - 3];

		if (day_of_the_weak != undefined && days_array.includes(day_of_the_weak.toLowerCase().trim())) {
			result += `\n${day_of_the_weak}\n`;
		}
		if (replacement == undefined && time == undefined) continue;
		if (replacement == undefined) replacement = 'Пары не будет';
		if (time == undefined) {
			time = data[row - 1][column - 2];
		}
		if (replacement.includes("_")) replacement = 'Пары не будет';

		time == "8.30-10.10" ? result += `08.30-10.10 | ${replacement}\n` : result += `${time} | ${replacement}\n`
	}

	return result;
}

async function getReplacemnt(group: string, path: string) {
	const extractor = new WordExtractor();
	const extracted = await extractor.extract(path);
	const body = extracted.getBody().split("\n").filter(function (el) {
		return el != '';
	});
	let result = "";

	for (let line = 5; line < body.length - 1; line++) {
		let _value = body[line].split('\t');
		
		if (_value[0] == '') continue;
		result += `Группа ${_value[0]}\n№ пары ${_value[1]}\nПо расписанию ${_value[2]}\n`;
		if (_value[3] != undefined && _value[3].toLowerCase() == "не будет") {
			result += `${_value[3]}\n\n`;
		} else if (_value[3] != undefined && ['дистанционное обучение', 'до'].includes(_value[3].toLowerCase())) {
			result += `Заменена на ${_value[3]}\n\n`;
		} else {
			if (line < body.length && body[line + 1].split("\t")[0].toLowerCase() == "вся группа") { 
				result += `${_value[3]} ${body[line + 1].split('\t')[0]}\n\n`; 
				line++;
			}
			else result += `${_value[3]}\n\n`;
		}
	}
	return result == '' ? 'Замены для выбранной группы не найдены!' : result
}