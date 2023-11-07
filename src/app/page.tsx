import React from "react"

import { Box, Card, CardContent, Container, Typography } from "@mui/material"

import Image from "next/image"
import NavBar from "@spp/fragments/NavBar"

export default function Home() {
	return (
		<>
			{/* <NavBar authState="authenticated" /> */}

			<Container sx={{ mt: 6, mb: 6, px: 3 }}>
				<Box maxWidth={500} margin="60px auto">
					<Card variant="outlined">
						<CardContent sx={{ p: 4 }}>
							<Box my={4} sx={{ display: "flex", justifyContent: "center" }}>
								<Image
									src="/logo.webp"
									alt="App Logo"
									width={200}
									height={200}
								/>
							</Box>

							<Typography variant="SPP_H1" mb={4} sx={{ textAlign: "center" }}>
								Welcome, to TheGreenBowl
							</Typography>

							{/* <LogIn /> */}
						</CardContent>
					</Card>
				</Box>
			</Container>
		</>
	)
}
