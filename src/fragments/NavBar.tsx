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

const StyledLogo = styled(Box)(({ theme }) => ({
	height: "45px",
	width: "55px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
}))

const StyledMenu = styled(Box)({
	background: "black",
	color: "contrastText"
})

function MenuNavBar({ isOpen, setMenu, closeMenu }) {
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
		setMenu()
	}

	const handleClick = ({ sectionId }) => {
		closeMenu()
		const targetSection = document.getElementById(sectionId)
		if (targetSection) {
			targetSection.scrollIntoView({ behavior: "smooth", block: "start" })
		}
	}

	return (
		<>
			{isOpen ? (
				<IconButton onClick={closeMenu}>
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
			<Menu anchorEl={anchorElement} open={isOpen} onClose={closeMenu}>
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

				{/* <MenuItem>
					<Link
						href="#"
						onClick={() => handleClick({ sectionId: "smoothies" })}
						component={NextLink}
						underline="none"
					>
						<Typography color="secondary">Smoothies</Typography>
					</Link>
				</MenuItem> */}
			</Menu>

			<ContactUsDrawer isOpen={openContactUs} />
		</>
	)
}

export default function NavBar({ type = "basic" }) {
	const {
		isOpen: openMenu,
		open: setOpenMenu,
		close: setCloseMenu
	} = useToggle(false)

	if (type == "menu") {
		return (
			<>
				<AppBar elevation={0} position="fixed" variant="outlined">
					<Toolbar>
						<MenuNavBar
							setMenu={setOpenMenu}
							isOpen={openMenu}
							closeMenu={setCloseMenu}
						/>
					</Toolbar>
				</AppBar>
			</>
		)
	}

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
