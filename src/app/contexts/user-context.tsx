"use client";

import { createContext, useContext, useState } from "react";

interface UserProviderProps {
	children: JSX.Element;
}

interface UserContextType {
	user?: User;
	currentTimeWork?: CurrentTimeWork;
	updateUserData: (user: User) => void;
	updateUserCurrentTimeWork: (currentTimeWork: CurrentTimeWork) => void;
}

interface UserDataProps {
	user: User;
	currentTimeWork?: CurrentTimeWork;
}

const UserContext = createContext({} as UserContextType);

function UserProvider({ children }: UserProviderProps) {
	const [userData, setUserData] = useState<UserDataProps | null>(null);

	const updateUserCurrentTimeWork = (currentTimeWork: CurrentTimeWork) => {
		setUserData((state) => {
			if (!state) {
				return null;
			}

			return {
				...state,
				currentTimeWork,
			};
		});
	};

	const updateUserData = (user: User) => {
		setUserData((state) => {
			if (!state) {
				return null;
			}

			return {
				...state,
				user,
			};
		});
	};

	return (
		<UserContext.Provider
			value={{
				user: userData?.user,
				currentTimeWork: userData?.currentTimeWork,
				updateUserData,
				updateUserCurrentTimeWork,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

const useUserContext = () => {
	const context = useContext(UserContext);

	if (context === undefined) {
		throw new Error("useUserContext must be used within a UserContext");
	}

	return context;
};

export { UserProvider, useUserContext };
