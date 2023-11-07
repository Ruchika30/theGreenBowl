"use client"

import { Box, Button, Typography } from "@mui/material"

import { useRouter } from "next/navigation"

export default function NotFound() {
	const navigation = useRouter()

	return (
		<Box display="flex" flexDirection="column" width="100vw" height="100vh">
			<Box margin="auto" textAlign="center">
				<Typography variant="SPP_H1" mb={2}>
					404 Not found
				</Typography>

				<Typography variant="SPP_H3" color="secondary" align="center" mb={8}>
					It seems you are lost
				</Typography>

				<Button variant="contained" onClick={() => navigation.back()}>
					Go Back
				</Button>
			</Box>
		</Box>
	)
}
