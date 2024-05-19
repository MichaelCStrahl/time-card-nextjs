interface TimCardProps {
	params: { ref: string };
}

export default function TimeCard({ params }: TimCardProps) {
	const { ref: userRef } = params;

	return (
		<div className="mt-20 flex flex-col items-center">
			<div className="w-full max-w-85">
				<div className="flex items-start justify-between">
					<p className="font-bold text-neutral-100 text-xs">Relógio ponto</p>
					<div className="flex flex-col items-end">
						<p className="font-bold text-neutral-100 text-xs"># {userRef}</p>
						<p className="font-light text-neutral-450 text-xs">Meu nome</p>
					</div>
				</div>

				<div className="my-6">
					<div className="font-bold text-3xl">0h 00m</div>
					<p className="font-bold text-neutral-100 text-xs">Horas de hoje</p>
				</div>
				<button
					type="button"
					className="w-full rounded bg-orange-450 py-3 font-bold text-blue-1200 transition-colors duration-300 ease-in-out hover:bg-orange-500"
				>
					Hora de entrada
				</button>
				<div className="mt-6">
					<p className="font-bold text-neutral-100 text-xs">Dias anteriores</p>
					<div className="mt-2 flex flex-col gap-2">
						<div className="flex items-center justify-between rounded bg-gray-850 py-3 pr-3.5 pl-3 text-xs">
							<span className="font-medium text-neutral-450">19/05/24</span>
							<span className="font-bold text-neutral-100">7h 30m</span>
						</div>
						<div className="flex items-center justify-between rounded bg-gray-850 py-3 pr-3.5 pl-3 text-xs">
							<span className="font-medium text-neutral-450">19/05/24</span>
							<span className="font-bold text-neutral-100">7h 30m</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
