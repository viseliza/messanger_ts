import type { PageServerLoad } from "./$types";
import { AppAPI } from "../../api/api";

export const load: PageServerLoad = async ({ locals }) => {
    const api = new AppAPI('');
    // user_id пользователя
    const user_id: string = locals.user.user_id;
    // Все последние сообщения из комнат пользователя
    const response = await api.getLastMessage(user_id);
    // min: 0.238, max: 0.354
    // for (let i = 0; i < rooms.length; i++) {
    //     let data = await api.getLastMessage(rooms[i].name);
    //     result.push(data.messages[i])
    // }
    return { messages: response.room[0].messages }
}
