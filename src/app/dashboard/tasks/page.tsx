"use client"

import { Box } from "@mui/material"

import { Constants } from "@spp/constants/constants"

import PageHeader from "@spp/fragments/PageHeader"

export default function TasksList() {
	return (
		<Box p={Constants.CONTAINER_PADDING}>
			<PageHeader
				title="Tasks"
				actionButtons={[
					{
						label: "Create New Task",
						onClick: () => console.log("Add Task"),
					},
				]}
			/>
		</Box>
	)
}
