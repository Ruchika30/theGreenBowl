import { Box, Typography } from "@mui/material"

import { Constants } from "@spp/constants/constants"

export default function Page() {
	return (
		<Box p={Constants.CONTAINER_PADDING}>
			<Typography variant="SPP_H3" color="secondary">
				Cashflow Overview
			</Typography>
		</Box>
	)
}
