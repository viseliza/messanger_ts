import type { User } from "../../routes/auth/+page.server";

interface Profile {
    id?: number;
    email?: string;
    first_n?: string;
    last_n?: string;
    father_n?: string;
    theme?: Theme;
    role?: Role;
    user_id?: number;
    group_id: number;
}

enum Role {
    STUDENT,
    TEACHER
}

enum Theme {
    white,
    black
}

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
        const result = await response_post.json();
        await fetch('http://localhost:3000/profile/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "first_n": first_n,
                "last_n": last_n,
                "father_n": father_n,
                "user_id": result.id
            })
        })
        return result;
    }
    return await response;
}