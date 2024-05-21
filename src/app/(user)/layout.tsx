import type { ReactNode } from "react";
import { UserProvider } from "../contexts/user-context";

export default function UserLayout({ children }: { children: ReactNode }) {
	return (
		<UserProvider>
			<div className="mx-auto grid min-h-screen w-full max-w-[1600px]">
				{children}
			</div>
		</UserProvider>
	);
}
