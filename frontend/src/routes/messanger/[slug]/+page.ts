import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
    const data = (await parent()).user;
    const room = await (await fetch(`http://localhost:3000/room/${data.group}`)).json();
    return { room }
}