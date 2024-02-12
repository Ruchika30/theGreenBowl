"use client"

import React from "react"

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
	Select
} from "@mui/material"
import { Constants } from "@spp/constants/constants"
import useToggle from "@spp/hooks/useToggle"
import MenuOptionsDrawer from "../app/(dashboard)/menu-options-drawer"
import MenuIcon from "@mui/icons-material/Menu"
import CancelIcon from "@mui/icons-material/CancelOutlined"

// interface Props {
// 	authState?: "authenticated" | "unauthenticated"
// }

const AppBar = styled(MuiAppBar, {
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

function AuthNavBar({ setMenu, openMenu }) {
	const openCart = () => {}

	return (
		<>
			<IconButton onClick={setMenu}>
				{openMenu ? <CancelIcon /> : <MenuIcon />}
			</IconButton>

			<Box ml={2} sx={{ flexGrow: 1 }} />

			<IconButton onClick={openCart}>
				<Avatar alt="cart" sx={{ width: 30, height: 30, marginLeft: "auto" }} />
			</IconButton>
		</>
	)
}

export default function NavBar({ authState, setOpenMenu, openMenu }) {
	return (
		<>
			<AppBar
				elevation={0}
				position="fixed"
				variant="outlined"
				authState={authState}
			>
				<Toolbar>
					<AuthNavBar setMenu={setOpenMenu} openMenu={openMenu} />
				</Toolbar>
			</AppBar>
		</>
	)
}
