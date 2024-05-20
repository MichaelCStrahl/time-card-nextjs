"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const fetchUserByRefSchema = z.object({
	userRef: z
		.string({ message: "Informe o Usuário" })
		.min(1, "Informe o Usuário")
		.max(7),
});

export type FormInputType = z.infer<typeof fetchUserByRefSchema>;

export default function UserSignInForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputType>({
		resolver: zodResolver(fetchUserByRefSchema),
	});
	const { push } = useRouter();

	const hasUserRefError = !!errors.userRef?.message;

	const handleGetUserByRef: SubmitHandler<FormInputType> = async (data) => {
		const { userRef } = data;
		push(`timecard/${userRef}`);
	};

	return (
		<form onSubmit={handleSubmit(handleGetUserByRef)}>
			<div className="relative">
				<input
					type="text"
					id="userRef"
					{...register("userRef")}
					className="peer block w-full appearance-none rounded bg-blue-1000 px-2.5 pt-6 pb-2.5 text-sm text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 focus:outline-none focus:ring-0"
					placeholder=""
				/>
				<label
					htmlFor="userRef"
					className="-translate-y-1 peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-1 absolute start-2 top-2 z-10 origin-[0] scale-75 transform bg-transparent px-2 text-sm text-white duration-300 peer-focus:top-2 peer-placeholder-shown:top-1/2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:scale-75 peer-placeholder-shown:scale-100 peer-focus:px-1 peer-focus:font-light peer-focus:dark:text-white peer-focus:text-2xs peer-focus:text-white"
				>
					Código do usuário
				</label>
				{hasUserRefError && (
					<p className="mt-1 text-red-500 text-sm">{errors.userRef?.message}</p>
				)}
			</div>
			<button
				type="submit"
				className="mt-6 w-full rounded bg-orange-450 py-3 font-bold text-blue-1200 transition-colors duration-300 ease-in-out hover:bg-orange-500"
			>
				Confirmar
			</button>
		</form>
	);
}
