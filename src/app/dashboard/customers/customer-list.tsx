"use client"

import { Box } from "@mui/material"

import { Constants } from "@spp/constants/constants"

import PageHeader from "@spp/fragments/PageHeader"

export default function CustomersList() {
	return (
		<Box p={Constants.CONTAINER_PADDING}>
			<PageHeader
				title="Customers"
				actionButtons={[
					{
						label: "Create New Customer",
						onClick: () => console.log("Add Customer"),
					},
				]}
			/>
		</Box>
	)
}
