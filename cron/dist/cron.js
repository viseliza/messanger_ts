"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronStart = void 0;
const cron_1 = require("cron");
class CronStart {
    constructor() {
        this.cronJob = new cron_1.CronJob('*/10 * * * * *', async () => {
        });
        if (!this.cronJob.running)
            this.cronJob.start();
    }
}
exports.CronStart = CronStart;
//# sourceMappingURL=cron.js.map