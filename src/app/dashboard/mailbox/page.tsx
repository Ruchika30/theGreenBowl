import { Box } from "@mui/material"

import { Constants } from "@spp/constants/constants"

import PageHeader from "@spp/fragments/PageHeader"

export default function Mailbox() {
	return (
		<Box p={Constants.CONTAINER_PADDING}>
			<PageHeader title="Mailbox" />
		</Box>
	)
}
