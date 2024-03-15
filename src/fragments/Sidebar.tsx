import React from "react"

import { Constants } from "../constants/constants"

import {
	Box,
	Drawer as MuiDrawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SvgIcon,
	styled
} from "@mui/material"

import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"

const openedMixin = (theme) => ({
	width: Constants.MENU_DRAWER_WIDTH,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: "hidden"
})

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`
	}
})

const DrawerHeader = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
	width: Constants.drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme)
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme)
	})
}))

export default function SideBar({ isDrawerOpen, setIsDrawerOpen }) {
	const toggleSideBar = () => setIsDrawerOpen((v) => !v)

	return (
		<Drawer open={isDrawerOpen} variant="permanent">
			<DrawerHeader>
				<ChevronLeftIcon />
				<MenuIcon />
				<IconButton onClick={toggleSideBar}>
					{/* {true ? <ChevronLeftIcon /> : <MenuIcon />} */}
					<MenuIcon />
				</IconButton>
			</DrawerHeader>

			<List>
				<ListItem
					// key={index}
					disablePadding
					// component={Link}
					// to={routeLink.path}
				>
					<ListItemButton
						// selected={activeURL}
						sx={{
							minHeight: 48,
							justifyContent: isDrawerOpen ? "initial" : "center",
							px: 2.5
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: isDrawerOpen ? 3 : "auto",
								justifyContent: "center"
							}}
						>
							<SvgIcon>
								{/* <SvgIcon color={activeURL ? "primary" : "#000"}> */}
								{/* <Icon /> */}
							</SvgIcon>
						</ListItemIcon>

						<ListItemText
							// primary={routeLink.name}
							primaryTypographyProps={{
								fontSize: 14,
								// color: activeURL ? "primary.dark" : "#000"
								color: "primary.dark"
							}}
							sx={{ opacity: isDrawerOpen ? 1 : 0 }}
						/>
					</ListItemButton>

					{/* {activeURL && <Indicator />} */}
				</ListItem>
			</List>
		</Drawer>
	)
}
