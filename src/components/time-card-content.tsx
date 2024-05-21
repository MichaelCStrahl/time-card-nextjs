"use client";

import { useCycleContext } from "@/app/contexts/cycle-context";
import { useUserContext } from "@/app/contexts/user-context";
import { amountHoursMinutes } from "@/util/amount-hours-minutes";
import { differenceInSeconds } from "date-fns";
import { type ReactNode, Suspense, useEffect } from "react";
import ActionsTimecard from "./actions-timecard";
import { Skeleton } from "./skeleton";

interface TimeCardContentProps {
	fetchUser: User;
	fetchCurrentTimeWork?: CurrentTimeWork;
	children: ReactNode;
}

export default function TimeCardContent({
	children,
	fetchUser,
	fetchCurrentTimeWork,
}: TimeCardContentProps) {
	const { updateUserCurrentTimeWork, updateUserData } = useUserContext();
	const {
		startDate,
		endDate,
		activeCycle,
		setSecondsPassed,
		amountSecondsPassed,
	} = useCycleContext();

	const hasActiveCycle = !activeCycle && !!startDate && !!endDate;

	const currentSeconds = startDate ? amountSecondsPassed : 0;

	const minutesAmount = Math.floor(currentSeconds / 60);

	const hours = Math.floor(minutesAmount / 60);
	const minutes = String(minutesAmount % 60).padStart(2, "0");

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		const hasActiveCycleAndStartDate = activeCycle && !!startDate;

		if (hasActiveCycleAndStartDate) {
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(new Date(), startDate);
				setSecondsPassed(secondsDifference);
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [activeCycle, startDate, setSecondsPassed]);

	useEffect(() => {
		updateUserData(fetchUser);
		if (fetchCurrentTimeWork) {
			updateUserCurrentTimeWork(fetchCurrentTimeWork);
		}
	}, []);

	return (
		<div className="mt-20 flex flex-col items-center">
			<div className="w-full max-w-85 px-4 md:px-0">
				<div className="flex items-start justify-between">
					<p className="font-bold text-neutral-100 text-xs">Relógio ponto</p>
					<div className="flex flex-col items-end">
						<p className="font-bold text-neutral-100 text-xs">
							# {fetchUser.ref}
						</p>
						<p className="font-light text-neutral-450 text-xs">
							{fetchUser.name}
						</p>
					</div>
				</div>

				<div className="my-6">
					<div className="font-bold text-3xl">
						{hasActiveCycle && amountHoursMinutes({ startDate, endDate })}
						{!hasActiveCycle && `${hours}h ${minutes}m`}
					</div>
					<p className="font-bold text-neutral-100 text-xs">Horas de hoje</p>
				</div>
				<ActionsTimecard userId={fetchUser.id} />

				<div className="mt-6">
					<p className="font-bold text-neutral-100 text-xs">Dias anteriores</p>
					<div className="mt-2 flex max-h-[400px] flex-col gap-2 overflow-y-auto">
						<Suspense
							fallback={[1, 2, 3, 4].map((item) => (
								<div
									key={item}
									className="flex items-center justify-between rounded bg-gray-850 py-3 pr-3.5 pl-3 text-xs"
								>
									<Skeleton className="h-[15px]" />
								</div>
							))}
						>
							{children}
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	);
}
