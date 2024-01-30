import React from "react"

import { Box, BoxProps, Typography } from "@mui/material"

interface Props extends BoxProps {
	title: string
	subtitle?: string
	action?: React.ReactNode
}

export default function SectionHeader({
	title,
	subtitle,
	action,
	...rest
}: Props) {
	return (
		<Box
			display="flex"
			alignItems="flex-start"
			justifyContent="space-between"
			{...rest}
		>
			<Box>
				<Typography variant="SPP_H5" color="secondary" mb={2}>
					{title}
				</Typography>

				{subtitle && (
					<Typography variant="SPP_Body_1" color="secondary">
						{subtitle}
					</Typography>
				)}
			</Box>

			{action && action}
		</Box>
	)
}
