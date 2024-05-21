import { CycleProvider } from "@/app/contexts/cycle-context";
import HistoryHoursWorkedList from "@/components/history-hours-worked";
import TimeCardContent from "@/components/time-card-content";
import { api } from "@/data/api";
import { redirect } from "next/navigation";

interface UserDataProps {
	user: User;
}

interface TimCardProps {
	params: { ref: string };
}

export default async function TimeCard({ params }: TimCardProps) {
	const { ref: userRef } = params;

	const response = await api(`/users/${userRef}`, {
		method: "GET",
		next: {
			revalidate: 60 * 60, // 1 hour
		},
	});

	const userData: UserDataProps = await response.json();

	const { user } = userData;

	if (!response.ok) {
		redirect("/");
	}

	return (
		<CycleProvider userId={user.id}>
			<TimeCardContent user={user}>
				<HistoryHoursWorkedList userId={user.id} />
			</TimeCardContent>
		</CycleProvider>
	);
}
