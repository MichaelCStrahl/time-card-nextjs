import type { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
	return (
		<div className="mx-auto grid min-h-screen w-full max-w-[1600px]">
			{children}
		</div>
	);
}
