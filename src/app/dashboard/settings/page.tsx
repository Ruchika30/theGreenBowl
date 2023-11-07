import { Box } from "@mui/material"

import { Constants } from "@spp/constants/constants"

import PageHeader from "@spp/fragments/PageHeader"

export default function Settings() {
	return (
		<Box p={Constants.CONTAINER_PADDING}>
			<PageHeader title="Settings" />
		</Box>
	)
}
