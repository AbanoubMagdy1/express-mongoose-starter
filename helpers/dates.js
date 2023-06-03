import moment from "moment-timezone";
const workingHours = { from: "09:00:00", to: "17:00:00" };


function isWorkTime () {
	const format = "HH:mm:ss";
	const now = moment();
	const workStartsAt = moment(workingHours.from, format);
	const workEndsAt = moment(workingHours.to, format);

	return now.isBetween(workStartsAt, workEndsAt) && isBusinessDay();
}

function isBusinessDay (date = new Date()) {
	const businessDays = [1, 2, 3, 4, 5]; // 1 is monday

	const isBusinessDayInWeek = businessDays.includes(date.getDay());
	if (!isBusinessDayInWeek) {
		return false;
	}

	if (isHoliday(date)) {
		return false;
	}

	return true;
}


function isHoliday (date = new Date()) {
	const holidays = [];
	const isHoliday = holidays.some(holiday => moment(date).isSame(holiday, "day"));
	return isHoliday;
}

function addBusinessDays ({ startDate = new Date(), numberOfDays }) {
	let currentDate = moment(startDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 });

	while (numberOfDays) {
		currentDate = currentDate.add(1, "day");
		if (isBusinessDay(currentDate.toDate())) {
			numberOfDays--;
		}
	}

	return currentDate.toDate();
}


export {
	addBusinessDays,
	isHoliday,
	isBusinessDay,
	isWorkTime
};