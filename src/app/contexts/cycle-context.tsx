"use client";

import { type ReactNode, createContext, useContext, useState } from "react";

interface CycleProviderProps {
	children: ReactNode;
}

type CycleContextType = {
	startDate: Date | null;
	endDate: Date | null;
	activeCycle: boolean;
	hasSomeDays: boolean;
	amountSecondsPassed: number;
	startCycle: () => void;
	finishCycle: () => void;
	setSecondsPassed: (seconds: number) => void;
};

const CycleContext = createContext({} as CycleContextType);

function CycleProvider({ children }: CycleProviderProps) {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [activeCycle, setActiveCycle] = useState(false);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
	const hasSomeDays = startDate?.getDay() === endDate?.getDay();

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

	return (
		<CycleContext.Provider
			value={{
				startDate,
				endDate,
				activeCycle,
				hasSomeDays,
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
