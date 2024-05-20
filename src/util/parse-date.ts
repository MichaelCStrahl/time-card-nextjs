export function parseDate(dateInput: string) {
	let date: Date;
	const isString = typeof dateInput === "string";

	if (!isString) date = dateInput;

	date = new Date(dateInput);

	if (!date.getTime()) {
		throw new Error("Invalid date provided.");
	}

	const utcDateString = date.toISOString().split("T")[0];

	const [year, month, day] = utcDateString.split("-");

	const parsedDate = `${day}/${month}/${year}`;

	return parsedDate;
}
