"use client"
import {
	Menu,
	MenuItem,
	Avatar,
	Box,
	Link,
	IconButton,
	Typography
} from "@mui/material"
import NextLink from "next/link"

import { Constants } from "@spp/constants/constants"
import useToggle from "@spp/hooks/useToggle"
import CancelIcon from "@mui/icons-material/CancelOutlined"
import { useState } from "react"
import MenuContent from "./menu-content"

function MenuBar() {
	const [anchorElement, setAnchorElement] = useState(null)
	const openCart = () => {}

	const {
		isOpen: openMenu,
		open: setOpenMenu,
		close: setCloseMenu
	} = useToggle(false)

	const onMenuClick = (e) => {
		console.log("openMenu--", openMenu)
		setAnchorElement(e.currentTarget)
		setOpenMenu()
	}

	return (
		<Box sx={{ display: "flex" }}>
			{openMenu ? (
				<IconButton onClick={setCloseMenu}>
					<Typography>Menu</Typography>
				</IconButton>
			) : (
				<IconButton onClick={onMenuClick}>
					<Typography>Menu</Typography>
				</IconButton>
			)}

			<Box ml={2} sx={{ flexGrow: 1 }} />

			<IconButton onClick={openCart}>
				<Avatar alt="cart" sx={{ width: 30, height: 30, marginLeft: "auto" }} />
			</IconButton>

			{/* Anchor Menu */}
			<Menu anchorEl={anchorElement} open={openMenu} onClose={setCloseMenu}>
				<MenuItem>
					<Link href="/profile" component={NextLink} underline="none">
						<Typography color="secondary">Salads</Typography>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link href="/profile" component={NextLink} underline="none">
						<Typography color="secondary">Sandwiches</Typography>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link href="/profile" component={NextLink} underline="none">
						<Typography color="secondary">Drinks</Typography>
					</Link>
				</MenuItem>
			</Menu>
		</Box>
	)
}

function FoodMenu() {
	return (
		<>
			<Box p={Constants.CONTAINER_PADDING}>
				<MenuBar />
			</Box>

			<MenuContent />
		</>
	)
}

export default FoodMenu
