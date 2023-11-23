export interface Group {
    id:   number;
    name: string;
    href: string;
}

export class Group {
    /**
     * @param {number} param.id
     * @param {string} param.name
     * @param {string} params.href
     */
    constructor(opts: Group){
        this.id =   opts.id;
        this.name = opts.name;
        this.href = opts.href;
    }
}