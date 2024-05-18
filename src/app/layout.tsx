import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
});

export const metadata: Metadata = {
	title: "Controle de Ponto",
	description: "Registre suas horas trabalhadas",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt" className={montserrat.variable}>
			<body className="bg-blue-1200 text-neutral-100 antialiased">
				{children}
			</body>
		</html>
	);
}
