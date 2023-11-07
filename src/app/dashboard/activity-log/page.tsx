import { Box } from "@mui/material"

import { Constants } from "@spp/constants/constants"

import PageHeader from "@spp/fragments/PageHeader"

export default function AcitivityLog() {
	return (
		<Box p={Constants.CONTAINER_PADDING}>
			<PageHeader title="Acitivity Log" />
		</Box>
	)
}
