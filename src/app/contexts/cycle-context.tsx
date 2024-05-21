"use client";

import { api } from "@/data/api";
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

interface CycleProviderProps {
	children: ReactNode;
	userId: string;
}

type CycleContextType = {
	startDate: Date | null;
	endDate: Date | null;
	activeCycle: boolean;
	hasSameDays: boolean;
	amountSecondsPassed: number;
	startCycle: () => void;
	finishCycle: () => void;
	setSecondsPassed: (seconds: number) => void;
};

const CycleContext = createContext({} as CycleContextType);

function CycleProvider({ children, userId }: CycleProviderProps) {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [activeCycle, setActiveCycle] = useState(false);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
	const hasSameDays = startDate?.getDay() === endDate?.getDay();

	function setSecondsPassed(seconds: number) {
		setAmountSecondsPassed(seconds);
	}

	const startCycle = () => {
		setStartDate(new Date());
		setActiveCycle(true);
	};

	const finishCycle = () => {
		setEndDate(new Date());
		setActiveCycle(false);
	};

	useEffect(() => {
		const fetchActiveCycle = async () => {
			try {
				await api(`/timecards/${userId}/current`, {
					method: "GET",
				})
					.then(async (response) => {
						if (response.ok) {
							const currentCycleData: { currentTimeCard: CurrentTimeWork } =
								await response.json();

							const { currentTimeCard } = currentCycleData;

							if (!currentTimeCard) return;

							setStartDate(new Date(currentTimeCard.startDate));

							if (currentTimeCard.endDate) {
								setEndDate(new Date(currentTimeCard.endDate));
								setActiveCycle(false);
							}

							setActiveCycle(true);
						}
					})
					.catch((error) => {
						console.log(error);
					});
			} catch (error) {
				console.error("Erro ao buscar o ciclo ativo:", error);
			}
		};

		fetchActiveCycle();

		return () => {
			setActiveCycle(false);
			setAmountSecondsPassed(0);
			setEndDate(null);
			setStartDate(null);
		};
	}, [userId]);

	return (
		<CycleContext.Provider
			value={{
				startDate,
				endDate,
				activeCycle,
				hasSameDays,
				amountSecondsPassed,
				startCycle,
				finishCycle,
				setSecondsPassed,
			}}
		>
			{children}
		</CycleContext.Provider>
	);
}

const useCycleContext = () => {
	const context = useContext(CycleContext);

	if (context === undefined) {
		throw new Error("useCycleContext must be used within a CycleContext");
	}

	return context;
};

export { CycleProvider, useCycleContext };
