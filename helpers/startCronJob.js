import cron from "cron";
import cronsTrue from "cronstrue";
import makeCronFunction from "./makeCronFunction.js";
const isProduction = process.env.NODE_ENV === "production";
const { CronJob } = cron;

function startCronJob ({
	pattern,
	functionToRun,
	logDescription = false,
	logOnStartAndEnd = false,
	disableOnHolidays = false,
	disallowOverlap = true,
	isOnlyOnProduction = false
}) {

	if (isOnlyOnProduction && isProduction === false) {
		return;
	}

	const cronFunction = makeCronFunction({
		cronFunctionToRun: functionToRun,
		logOnStartAndEnd,
		disableOnHolidays,
		disallowOverlap
	});

	const job = new CronJob(pattern, cronFunction);
	job.start();

	if (logDescription) {
		const patternDescription = cronsTrue.toString(pattern, { verbose: false });
		console.log(`Initialized ${functionToRun.name} on: ${patternDescription}.`);
	}
}

export default startCronJob;
