interface User {
	id: string;
	name: string;
	ref: string;
}

interface CurrentTimeWork {
	id: string;
	startDate: Date;
	endDate: Date | null;
	userId: string;
}
