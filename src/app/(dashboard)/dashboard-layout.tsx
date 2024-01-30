"use client"

import React from "react"

import NavBar from "@spp/fragments/NavBar"
import { Toolbar, Box } from "@mui/material"
import useToggle from "@spp/hooks/useToggle"

import MenuOptionsDrawer from "./MenuOptionsDrawer"

interface Props {
	children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
	const {
		isOpen: openMenu,
		open: setOpenMenu,
		close: setCloseMenu
	} = useToggle(false)

	return (
		<Box p={2}>
			<NavBar setOpenMenu={setOpenMenu} openMenu={openMenu} />

			<Box component="main" sx={{ flexGrow: 1 }}>
				<Toolbar />

				{children}
			</Box>

			<MenuOptionsDrawer isOpen={openMenu} />
		</Box>
	)
}
