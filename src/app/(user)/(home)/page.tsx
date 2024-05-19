export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full max-w-85">
				<p className="mb-11 text-2lg">
					Ponto <span className="font-extrabold">Ilumeo</span>
				</p>
				<form>
					<div className="relative">
						<input
							type="text"
							id="user_code"
							className="peer block w-full appearance-none rounded bg-blue-1000 px-2.5 pt-6 pb-2.5 text-sm text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 focus:outline-none focus:ring-0"
							placeholder=""
						/>
						<label
							htmlFor="user_code"
							className="-translate-y-1 peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-1 absolute start-2 top-2 z-10 origin-[0] scale-75 transform bg-transparent px-2 text-sm text-white duration-300 peer-focus:top-2 peer-placeholder-shown:top-1/2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:scale-75 peer-placeholder-shown:scale-100 peer-focus:px-1 peer-focus:font-light peer-focus:dark:text-white peer-focus:text-2xs peer-focus:text-white"
						>
							Código do usuário
						</label>
					</div>
					<button
						type="submit"
						className="mt-6 w-full rounded bg-orange-450 py-3 font-bold text-blue-1200 transition-colors duration-300 ease-in-out hover:bg-orange-500"
					>
						Confirmar
					</button>
				</form>
			</div>
		</div>
	);
}
