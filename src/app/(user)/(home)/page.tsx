import UserSignInForm from "@/components/user-sign-in-form";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full max-w-85">
				<p className="mb-11 text-2lg">
					Ponto <span className="font-extrabold">Ilumeo</span>
				</p>
				<UserSignInForm />
			</div>
		</div>
	);
}
