"use client"

import React from "react"

import { Box, styled, Typography, Link } from "@mui/material"
import NextLink from "next/link"
import Image from "next/image"

const StyledContainer = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.customColors.pastelGreen
}))

export default function Home() {
	const list = [
		{
			value: "Menu",
			path: "/dashboard"
		},
		{
			value: "Join Whatsapp Community",
			path: ""
		},
		{
			value: "Review on Google",
			path: ""
		},
		{
			value: "Follow on Instagram!",
			path: ""
		}
	]

	return (
		<>
			<StyledContainer
				sx={{
					px: 3,
					height: "100vh",
					textAlign: "center"
				}}
			>
				<Box pt={8}>
					<Box sx={{ width: "100%" }}>
						<Image
							src="/logo.png"
							alt="App Logo"
							width={77}
							height={27}
							priority
						/>
					</Box>

					<Box>
						<Typography>Get set. Go healthy!</Typography>
					</Box>

					<Box mt={4}>
						{list.map((item, index) => {
							return (
								<Box
									key={index}
									sx={{ border: "1px solid black", borderRadius: "20px" }}
									p={2}
									my={2}
								>
									<Link href={item.path} component={NextLink} underline="none">
										<Typography key={item.value}>{item.value}</Typography>
									</Link>
								</Box>
							)
						})}
					</Box>
				</Box>
			</StyledContainer>
		</>
	)
}
