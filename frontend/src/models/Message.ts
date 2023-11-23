export interface Message {
    id:   number;
    user_id: number;
    text: string;
    time: string;
    isRead: boolean;
    room_id: number;
}

export class Message {
    /**
     * @param {number} param.id
     * @param {number} param.user_id
     * @param {string} params.text
     * @param {string} param.time
     * @param {boolean} param.isRead
     * @param {number} param.room_id
     */
    constructor(opts: Message){
        this.id = opts.id;
        this.user_id = opts.user_id;
        this.text = opts.text;
        this.time = opts.time;
        this.isRead = opts.isRead;
        this.room_id = opts.room_id;
    }
}