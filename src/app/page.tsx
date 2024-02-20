"use client"

import React from "react"

import { Box, styled, Typography, Link } from "@mui/material"
import NextLink from "next/link"
import Image from "next/image"

const StyledContainer = styled(Box)(({ theme }) => ({
	backgroundColor: "#EBEEF1"
}))

const StyledImgContainer = styled(Box)({
	width: "130px",
	height: "120px",
	borderRadius: "50%",
	overflow: "hidden",
	backgroundImage: 'url("/logo.png")',
	backgroundSize: "cover",
	backgroundPosition: "center",
	margin: "auto"
})

const MenuContainer = styled(Box)(({ theme }) => ({
	borderRadius: "20px",
	backgroundColor: theme.palette.primary.contrastText
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
					<StyledImgContainer mb={2} mt={2}>
						<Image
							src="/logo_green_bg.jpeg"
							alt="App Logo"
							width={130}
							height={120}
							priority
						/>
					</StyledImgContainer>

					<Typography mt={2} variant="SPP_H4" color="secondary">
						The Green Bowl
					</Typography>

					<Box mt={4}>
						{list.map((item, index) => {
							return (
								<MenuContainer
									key={index}
									sx={{
										borderRadius: "20px"
									}}
									p={2}
									my={2}
								>
									<Link href={item.path} component={NextLink} underline="none">
										<Typography color="secondary" key={item.value}>
											{item.value}
										</Typography>
									</Link>
								</MenuContainer>
							)
						})}
					</Box>
				</Box>
			</StyledContainer>
		</>
	)
}
