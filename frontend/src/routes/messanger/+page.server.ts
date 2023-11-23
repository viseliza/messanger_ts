import type { PageServerLoad } from "./$types";

import { AppAPI } from "../../api/api";
import type { Message } from "../../models/Message";

export const load: PageServerLoad = async ({ parent }) => {
    const api = new AppAPI('');
    // Все комнаты пользователя
    const rooms = (await parent()).user.rooms;
    // Список последних сообщений из комнат
    let result: Array<Message> = [];
    // Все последние сообщения из комнат пользователя
    for (let i = 0; i < rooms.length; i++) {
        let data = await api.getLastMessage(rooms[i].name);
        result.push(data.messages[0])
    }
    return { messages: result }
}
