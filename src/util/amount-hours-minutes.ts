import { differenceInSeconds } from "date-fns";

interface AmountHoursMinutes {
	startDate: Date | null;
	endDate: Date | null;
}
export function amountHoursMinutes({ startDate, endDate }: AmountHoursMinutes) {
	const hasDates = !!startDate && !!endDate;

	if (!hasDates) return "0h 00m";

	const secondsDifference = differenceInSeconds(endDate, startDate);

	const minutesAmount = Math.floor(secondsDifference / 60);

	const hours = Math.floor(minutesAmount / 60);
	const minutes = String(minutesAmount % 60).padStart(2, "0");

	return `${hours}h ${minutes}m`;
}
