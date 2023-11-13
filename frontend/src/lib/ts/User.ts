import type { User } from "../../routes/auth/+page.server";

export default async function (user: User, first_n: string, last_n: string, father_n: string) {
    let url: string = `http://localhost:3000/${user.login}`;
    const response = (await fetch(url)).text();
    // Если пользователя нет в базе - добавить
    if (!await response) {
        const url = `http://localhost:3000/auth`;
        
        const response_post = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const result = await response_post.text();

        const group_name: string = (await (await fetch(`https://people.novsu.ru/NovSUScheduleService/ScheduleProxy?uid=${user.login}`))
            .text()).split('src')[1].split('=')[4].split('&')[0];
        const group = await (await fetch(`http://localhost:3000/group/${group_name}`)).json()
        
        await fetch('http://localhost:3000/profile/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "first_name": first_n,
                "last_name": last_n,
                "father_name": father_n,
                "group_id": group.id,
                "user_id": Number(JSON.parse(result).id)
            })
        })
        return result;
    }
    return await response;
}