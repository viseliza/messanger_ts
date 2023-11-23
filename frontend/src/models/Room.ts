export interface Room {
    id:   number;
    name: string;
}

export class Room {
    /**
     * @param {number} param.id
     * @param {string} param.name
     */
    constructor(opts: Room){
        this.id =   opts.id;
        this.name = opts.name;
    }
}