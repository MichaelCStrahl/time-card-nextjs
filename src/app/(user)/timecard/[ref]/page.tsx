import { CycleProvider } from "@/app/contexts/cycle-context";
import HistoryHoursWorkedList from "@/components/history-hours-worked";
import TimeCardContent from "@/components/time-card-content";
import { api } from "@/data/api";
import { redirect } from "next/navigation";

interface UserDataProps {
	user: User;
	currentTimeWork?: CurrentTimeWork;
}

interface TimCardProps {
	params: { ref: string };
}

export default async function TimeCard({ params }: TimCardProps) {
	const { ref: userRef } = params;

	const response = await api(`/users/${userRef}`, {
		method: "GET",
		next: {
			revalidate: 0,
		},
	});

	const userData: UserDataProps = await response.json();

	const { user, currentTimeWork } = userData;

	if (!response.ok) {
		redirect("/");
	}

	return (
		<CycleProvider>
			<TimeCardContent fetchUser={user} fetchCurrentTimeWork={currentTimeWork}>
				<HistoryHoursWorkedList userId={user.id} />
			</TimeCardContent>
		</CycleProvider>
	);
}
