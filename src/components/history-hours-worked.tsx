import { api } from "@/data/api";
import { parseDate } from "@/util/parse-date";

interface HistoryHoursWorkedListProps {
	userId: string;
}

export default async function HistoryHoursWorkedList({
	userId,
}: HistoryHoursWorkedListProps) {
	const response = await api(`/timecards/${userId}`, {
		method: "GET",
		next: {
			revalidate: 60 * 60, // 1 hour
		},
	});

	const timeCardsData: { timeCards: TimeCards[] } = await response.json();
	const { timeCards } = timeCardsData;

	const hasTimeCards = timeCards.length > 0;

	return (
		<>
			{!hasTimeCards && (
				<p className="font-medium text-2xs text-neutral-450">
					Você ainda não possui registros
				</p>
			)}

			{hasTimeCards &&
				timeCards.map((timeCard) => (
					<div
						key={timeCard.id}
						className="flex max-h-[60px] items-center justify-between overflow-y-auto rounded bg-gray-850 py-3 pr-3.5 pl-3 text-xs"
					>
						<span className="font-medium text-neutral-450">
							{parseDate(timeCard.startDayWorked)}
						</span>
						<span className="font-bold text-neutral-100">
							{timeCard.hoursWorked}
						</span>
					</div>
				))}
		</>
	);
}
