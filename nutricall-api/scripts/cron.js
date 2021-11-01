const CronJOB = require('cron').CronJob;
const scrap = require('./scrap');

/**
 * Cron function that starts the scrap at a certain time of day
 * @param hourOfDay it's the time of day the function will be run
 * @param timezone region time zone
 */
module.exports = (hourOfDay, timezone) => {
    const job = new CronJOB(`0 0 ${hourOfDay} * * *`, async () => {
        await scrap();
        console.log('Created Products!');
    }, null, true, timezone)
}