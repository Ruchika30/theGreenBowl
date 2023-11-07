"use client"

import { Box, Button, Typography } from "@mui/material"

interface Props {
	title: string
	actionButtons?: Array<{
		label: string
		onClick: () => void
	}>
}

export default function PageHeader({ title, actionButtons }: Props) {
	return (
		<Box display="flex">
			<Box flexGrow={1}>
				<Typography variant="SPP_H1" color="secondary">
					{title}
				</Typography>
			</Box>

			<Box>
				{actionButtons &&
					actionButtons.map((button, index) => (
						<Button
							key={index}
							onClick={button.onClick}
							variant="contained"
							sx={{ ml: 2 }}
						>
							{button.label}
						</Button>
					))}
			</Box>
		</Box>
	)
}
