"use client"

import React from "react"

import { Box, Typography } from "@mui/material"

import AuthContext from "@spp/context/AuthContext"

import { Constants } from "@spp/constants/constants"

export type CanModuleTypes =
	| "dashboardView"
	| "depositView"
	| "depositCreate"
	| "withdrawalView"
	| "withdrawalCreate"
	| "taskView"
	| "taskCreate"
	| "customerView"
	| "customerCreate"
	| "userView"
	| "userCreate"
	| "mailboxView"
	| "mailboxCreate"
	| "merchantView"
	| "merchantCreate"
	| "accountView"
	| "accountCreate"
	| "settingsView"
	| "settingsCreate"
	| "activityLogView"
	| "activityLogCreate"
	| "NO_CHECK"

interface Props {
	children: React.ReactNode
	module: CanModuleTypes
}

export default function Can({ children, module }: Props) {
	const { isLoading, authUserData } = React.useContext(AuthContext)

	if (isLoading) {
		return null
	}

	if (authUserData) {
		if (
			(authUserData.hasOwnProperty(module) && authUserData[module]) ||
			module === "NO_CHECK"
		) {
			return children
		} else {
			return null
		}
	}

	return (
		<Box p={Constants.CONTAINER_PADDING}>
			<Typography variant="SPP_Body_1" color="secondary">
				Access denied
			</Typography>
		</Box>
	)
}
