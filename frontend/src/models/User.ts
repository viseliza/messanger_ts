export interface User {
    id?: number;
    login: string;
    password: string;
}

export class User {
    /**
     * @param {number | undefined} param.id
     * @param {string} param.login
     * @param {string} params.password
     */
    constructor(opts: User){
        this.id = opts?.id;
        this.login = opts.login;
        this.password = opts.password;
    }
}