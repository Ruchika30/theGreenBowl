"use client"

import React, { useState } from "react"
import Image from "next/image"
import NextLink from "next/link"
import {
	AppBar as MuiAppBar,
	Box,
	IconButton,
	Typography,
	Toolbar,
	Menu,
	MenuItem,
	Link,
	styled
} from "@mui/material"
import { Constants } from "@spp/constants/constants"
import useToggle from "@spp/hooks/useToggle"
import CancelIcon from "@mui/icons-material/CancelOutlined"
import ContactUsDrawer from "../app/(dashboard)/contact-us-drawer"
import { useCategories } from "@spp/hooks/useCategories"
import { useRouter } from "next/navigation"
import { ArrowBackIosNew as BackIcon } from "@mui/icons-material"
import MenuNavBar from "./MenuBar"

export const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "authState"
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
				: "100vw"
	}
}))

export default function NavBar({ type = "basic" }) {
	const router = useRouter()

	return (
		<>
			<AppBar elevation={0} position="fixed" variant="outlined">
				<Toolbar>
					<IconButton color="secondary" onClick={() => router.back()}>
						<BackIcon fontSize="small" />
					</IconButton>
				</Toolbar>
			</AppBar>
		</>
	)
}
