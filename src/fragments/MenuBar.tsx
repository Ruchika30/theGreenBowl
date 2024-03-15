"use client"

import React, { useState } from "react"
import Image from "next/image"
import NextLink from "next/link"
import {
	Box,
	AppBar as MuiAppBar,
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

const StyledMenu = styled(Box)({
	background: "black",
	color: "contrastText"
})

const StyledLogo = styled(Box)(({ theme }) => ({
	height: "45px",
	width: "55px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
}))

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

function MenuNavBar() {
	const {
		isOpen: openMenu,
		open: setOpenMenu,
		close: setCloseMenu
	} = useToggle(false)

	const [anchorElement, setAnchorElement] = useState(null)
	const { categoriesData, isLoadingCategories, categoriesError } =
		useCategories()

	const {
		isOpen: openContactUs,
		open: setContactUs,
		close: closeContactUs
	} = useToggle(false)

	const onMenuClick = (e) => {
		setAnchorElement(e.currentTarget)
		setOpenMenu()
	}

	const handleClick = ({ sectionId }) => {
		setCloseMenu()
		const targetSection = document.getElementById(sectionId)
		if (targetSection) {
			targetSection.scrollIntoView({ behavior: "smooth", block: "start" })
		}
	}

	return (
		<AppBar elevation={0} position="fixed" variant="outlined">
			<Toolbar>
				{openMenu ? (
					<IconButton onClick={setCloseMenu}>
						<StyledMenu px={1} borderRadius={4}>
							<Typography variant="SPP_Body_1" color="white">
								Menu
							</Typography>
						</StyledMenu>
					</IconButton>
				) : (
					<IconButton onClick={onMenuClick}>
						<StyledMenu px={1} borderRadius={4}>
							<Typography variant="SPP_Body_1" color="white">
								Menu
							</Typography>
						</StyledMenu>
					</IconButton>
				)}

				<Box ml={2} sx={{ flexGrow: 1 }} />

				{/* Logo */}

				{openContactUs ? (
					<StyledLogo>
						<IconButton onClick={closeContactUs} sx={{ padding: 0 }}>
							<CancelIcon />
						</IconButton>
					</StyledLogo>
				) : (
					<IconButton onClick={setContactUs} sx={{ padding: 0 }}>
						<Image
							src="logo.png"
							alt="App Logo"
							width={55}
							height={45}
							priority
						/>
					</IconButton>
				)}

				{/* Anchor menu */}
				<Menu anchorEl={anchorElement} open={openMenu} onClose={setCloseMenu}>
					{categoriesData?.map((item) => {
						return (
							<MenuItem key={item.id}>
								<Link
									href="#"
									onClick={() => handleClick({ sectionId: item.name })}
									component={NextLink}
									underline="none"
								>
									<Typography color="secondary">{item.name}</Typography>
								</Link>
							</MenuItem>
						)
					})}
				</Menu>

				<ContactUsDrawer isOpen={openContactUs} />
			</Toolbar>
		</AppBar>
	)
}

export default MenuNavBar
