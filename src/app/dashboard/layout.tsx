import { Box, Toolbar, Typography } from "@mui/material"

import NavBar from "@spp/fragments/NavBar"
import Sidebar from "@spp/fragments/Sidebar"

interface Props {
	children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
	return (
		<Box display="flex">
			<NavBar authState="authenticated" />

			<Sidebar />

			<Box component="main" sx={{ flexGrow: 1 }}>
				<Toolbar />

				{children}
			</Box>
		</Box>
	)
}
