"use client"

import AppProvider from "@spp/context/AppProvider"

import { SnackbarProvider } from "notistack"

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SnackbarProvider maxSnack={3} preventDuplicate>
			<AppProvider>{children}</AppProvider>
		</SnackbarProvider>
	)
}
