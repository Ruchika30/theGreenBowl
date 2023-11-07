"use client"

import { Box } from "@mui/material"

import { Constants } from "@spp/constants/constants"

import PageHeader from "@spp/fragments/PageHeader"

export default function WithdrawalsList() {
	return (
		<Box p={Constants.CONTAINER_PADDING}>
			<PageHeader
				title="Withdrawals"
				actionButtons={[
					{
						label: "Create New Withdrawal",
						onClick: () => console.log("Add Withdrawal"),
					},
				]}
			/>
		</Box>
	)
}
