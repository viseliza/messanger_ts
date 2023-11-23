import { AppAPI } from "../../../api/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const api = new AppAPI('');
    const count = await api.getCountUsers(params.slug);
    return {
        count, 
        room: await api.getRoom(params.slug)
    };
}
