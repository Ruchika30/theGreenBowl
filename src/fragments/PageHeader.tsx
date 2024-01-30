"use client"

import { Box, Button, Typography } from "@mui/material"

import Can, { CanModuleTypes } from "./Can"

interface Props {
	title: string
	subtitle?: string
	canCheckModuelName: CanModuleTypes
	actionButtons?: Array<{
		label: string
		onClick: () => void
	}>
}

export default function PageHeader({
	title,
	subtitle,
	actionButtons,
	canCheckModuelName
}: Props) {
	return (
		<Box display="flex">
			<Box flexGrow={1}>
				<Typography variant="SPP_H1" color="secondary">
					{title}
				</Typography>

				{subtitle && (
					<Typography variant="SPP_Body_1" color="secondary">
						{subtitle}
					</Typography>
				)}
			</Box>

			<Can module={canCheckModuelName}>
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
			</Can>
		</Box>
	)
}
