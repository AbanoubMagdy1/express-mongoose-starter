//import Bluebird from 'bluebird';
//let IS_SERVER_SHUTTING_DOWN = false;

const RUNNING_CRON_JOBS = new Set();

/*async function close () {
  IS_SERVER_SHUTTING_DOWN = true;

  while (RUNNING_CRON_JOBS.size) {
    const runningCronsNames = Array.from(RUNNING_CRON_JOBS).map(cronFn => cronFn.name).join(', ');
    console.log(`Waiting for ${runningCronsNames}.`);
    await Bluebird.delay(5000);
  }
}*/

export { RUNNING_CRON_JOBS };