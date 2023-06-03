import * as Dates from "./dates.js";
import {RUNNING_CRON_JOBS} from "./cronState.js";

function makeCronFunction ({
	cronFunctionToRun,
	logOnStartAndEnd,
	disableOnHolidays,
	disallowOverlap
}) {
	return async function () {
		/*if (CRON_STATE.IS_SERVER_SHUTTING_DOWN) {
			return;
		}*/

		if (disableOnHolidays && Dates.isHoliday()) {
			return;
		}

		if (RUNNING_CRON_JOBS.has(cronFunctionToRun) && disallowOverlap) {
			return;
		}

		if (logOnStartAndEnd) {
			console.log(`Running ${cronFunctionToRun.name} ${new Date()}`);
		}

		RUNNING_CRON_JOBS.add(cronFunctionToRun);
		try {
			await cronFunctionToRun();
		} catch (err) {
			//reportError(err);
		} finally {
			RUNNING_CRON_JOBS.delete(cronFunctionToRun);
			if (logOnStartAndEnd) {
				console.log(`Done with ${cronFunctionToRun.name} ${new Date()}`);
			}
		}
	};
}

export default makeCronFunction;