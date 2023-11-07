import { Box } from "@mui/material"

import { Constants } from "@spp/constants/constants"

import PageHeader from "@spp/fragments/PageHeader"

export default function Merchants() {
	return (
		<Box p={Constants.CONTAINER_PADDING}>
			<PageHeader title="Merchants" />
		</Box>
	)
}
