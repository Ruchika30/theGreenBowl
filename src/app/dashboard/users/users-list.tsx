"use client"

import { Box } from "@mui/material"

import { Constants } from "@spp/constants/constants"

import PageHeader from "@spp/fragments/PageHeader"

export default function UsersList() {
	return (
		<Box p={Constants.CONTAINER_PADDING}>
			<PageHeader
				title="Users"
				actionButtons={[
					{
						label: "Create New User",
						onClick: () => console.log("Add User"),
					},
				]}
			/>
		</Box>
	)
}
