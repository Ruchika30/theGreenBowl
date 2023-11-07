"use client"

import React from "react"

import { Box } from "@mui/material"

import dynamic from "next/dynamic"

import { Constants } from "@spp/constants/constants"

import PageHeader from "@spp/fragments/PageHeader"

const NewDepositDialog = dynamic(() => import("./new-deposit-dialog"))

export default function DepositsList() {
	const [isAddingDeposit, setIsAddingDeposit] = React.useState(false)

	return (
		<Box p={Constants.CONTAINER_PADDING}>
			<PageHeader
				title="Deposits"
				actionButtons={[
					{
						label: "Create New Deposit",
						onClick: () => setIsAddingDeposit(true),
					},
				]}
			/>

			<NewDepositDialog
				isAddingDeposit={isAddingDeposit}
				setIsAddingDeposit={setIsAddingDeposit}
			/>
		</Box>
	)
}
