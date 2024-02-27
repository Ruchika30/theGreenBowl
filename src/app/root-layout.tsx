"use client"

import AppProvider from "@spp/context/AppProvider"

import { SnackbarProvider } from "notistack"

import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { CartProvider } from "@spp/context/CartProvider"
import {
	QueryClient,
	QueryClientProvider,
	useQuery
} from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<QueryClientProvider client={queryClient}>
			<CartProvider>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<SnackbarProvider maxSnack={1} preventDuplicate>
						<AppProvider>{children}</AppProvider>
					</SnackbarProvider>
				</LocalizationProvider>
			</CartProvider>
		</QueryClientProvider>
	)
}
