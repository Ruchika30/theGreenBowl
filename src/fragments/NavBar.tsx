"use client"

import React, { useState } from "react"

import {
	AppBar as MuiAppBar,
	Avatar,
	Box,
	IconButton,
	Typography,
	Toolbar,
	Menu,
	MenuItem,
	Link,
	styled,
} from "@mui/material"

import Image from "next/image"
import { Constants } from "@spp/constants/constants"

interface Props {
	authState: "authenticated" | "unauthenticated"
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "authState",
})<{ authState: Props["authState"] }>(({ theme, authState }) => ({
	borderLeft: "none",
	zIndex: theme.zIndex.drawer + 1,
	backgroundColor: theme.palette.background.paper,
	maxWidth:
		authState === "authenticated"
			? `calc(100vw - ${Constants.DRAWER_MD_WIDTH}px)`
			: "100vw",
	[theme.breakpoints.up("xl")]: {
		maxWidth:
			authState === "authenticated"
				? `calc(100vw - ${Constants.DRAWER_WIDTH}px)`
				: "100vw",
	},
}))

function AuthNavBar() {
	const [showMenu, setShowMenu] = React.useState(false)
	const [showPlans, setShowPlans] = React.useState(false)

	const handleMenu = () => setShowMenu((prev) => !prev)
	const handlePlans = () => setShowPlans((prev) => !prev)

	const closeModal = () => {
		setShowMenu(false)
	}

	function ImageModal({ imageUrl }: { imageUrl: string }) {
		return (
			<div className="modal">
				<div className="modal-content">
					<img src={imageUrl} alt="Image" />
					<button onClick={() => closeModal()}>Close</button>
				</div>
			</div>
		)
	}

	return (
		<>
			<Box ml={2} sx={{ flexGrow: 1 }} />

			<Typography
				onClick={handleMenu}
				variant="SPP_H6"
				color="secondary"
				mr={3}
				ml={3}
				sx={{ cursor: "pointer" }}
			>
				Menu
			</Typography>

			<Typography
				onClick={handlePlans}
				variant="SPP_H6"
				color="secondary"
				mr={3}
				ml={3}
			>
				Plans
			</Typography>

			{showMenu && <ImageModal imageUrl="your-image-url.jpg" />}

			{showPlans && <ImageModal imageUrl="your-image-url.jpg" />}

			{/* <Menu
				open={openMenu}
				onClose={handleMenuClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			></Menu> */}
		</>
	)
}

function UnAuthNavBar() {
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<Box mr={2} mt={2}>
					<Image src="/logo.png" alt="App Logo" width={77} height={27} />
				</Box>
			</Box>

			<Typography variant="SPP_H6" color="secondary" mr={3} ml={3}>
				Need Help?
			</Typography>
		</>
	)
}

export default function NavBar({ authState }: Props) {
	return (
		<AppBar
			elevation={0}
			position="fixed"
			variant="outlined"
			authState={authState}
		>
			<Toolbar>
				{authState === "authenticated" ? <AuthNavBar /> : null}
				{authState === "unauthenticated" ? <UnAuthNavBar /> : null}
			</Toolbar>
		</AppBar>
	)
}
