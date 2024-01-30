"use client"

import AppProvider from "@spp/context/AppProvider"

import { SnackbarProvider } from "notistack"

import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<SnackbarProvider maxSnack={3} preventDuplicate>
				<AppProvider>{children}</AppProvider>
			</SnackbarProvider>
		</LocalizationProvider>
	)
}
