"use client";

import { useCycleContext } from "@/app/contexts/cycle-context";
import { api } from "@/data/api";

interface ActionsTimecardProps {
	userId: string;
}

export default function ActionsTimecard({ userId }: ActionsTimecardProps) {
	const { activeCycle, startDate, startCycle, finishCycle, endDate } =
		useCycleContext();

	const hasStartDate = !!startDate;
	const hasEndDate = !!endDate;

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
		console.log("Toast iniciou ciclo");
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
		console.log("Toast encerrou ciclo");
	};

	return (
		<>
			{!activeCycle && hasEndDate ? (
				<p className="font-medium text-2xs text-zinc-300">
					Parabéns, você finalizou o seu horário. Nos vemos amanhã ;)
				</p>
			) : (
				!hasStartDate && (
					<button
						type="button"
						onClick={handleStartCurrentTimeWork}
						className="w-full rounded bg-orange-450 py-3 font-bold text-blue-1200 transition-colors duration-300 ease-in-out hover:bg-orange-500"
					>
						Hora de entrada
					</button>
				)
			)}
			{activeCycle && (
				<button
					type="button"
					onClick={handleFinishCurrentTimeWork}
					className="w-full rounded bg-orange-450 py-3 font-bold text-blue-1200 transition-colors duration-300 ease-in-out hover:bg-orange-500"
				>
					Hora de saída
				</button>
			)}
		</>
	);
}
