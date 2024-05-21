"use client";

import { useCycleContext } from "@/app/contexts/cycle-context";
import { api } from "@/data/api";

interface ActionsTimecardProps {
	userId: string;
}

export default function ActionsTimecard({ userId }: ActionsTimecardProps) {
	const { activeCycle, startDate, startCycle, finishCycle, hasSomeDays } =
		useCycleContext();

	const today = new Date();

	const cycleFinished = hasSomeDays && startDate?.getDay() === today.getDay();

	const handleStartCurrentTimeWork = () => {
		api(`/timecards/${userId}/create`, {
			method: "PATCH",
		})
			.then((response) => {
				if (response.ok) {
					startCycle();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleFinishCurrentTimeWork = async () => {
		api(`/timecards/${userId}/finish`, {
			method: "PATCH",
		})
			.then((response) => {
				if (response.ok) {
					finishCycle();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			{cycleFinished && (
				<p className="font-medium text-2xs text-zinc-300">
					Parabéns, você finalizou o seu horário. Nos vemos amanhã ;)
				</p>
			)}

			{!cycleFinished && (
				<button
					type="button"
					onClick={
						activeCycle
							? handleFinishCurrentTimeWork
							: handleStartCurrentTimeWork
					}
					className="w-full rounded bg-orange-450 py-3 font-bold text-blue-1200 transition-colors duration-300 ease-in-out hover:bg-orange-500"
				>
					{activeCycle ? "Hora de saída" : "Hora de entrada"}
				</button>
			)}
		</>
	);
}
