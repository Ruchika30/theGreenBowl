"use client"

import { Box, IconButton, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import BackIcon from "@mui/icons-material/ArrowBack"

interface Props {
	variant?: any
	color?: string
	title: string
	backText: string
	onBack?: () => void
}

export default function ViewHeader({ onBack, title }: Props) {
	const router = useRouter()

	return (
		<Box display="flex" alignItems="center" mb={2}>
			<IconButton
				size="large"
				color="primary"
				onClick={() => {
					onBack ? onBack() : router.back()
				}}
			>
				<BackIcon fontSize="large" />
			</IconButton>

			<Typography variant="SPP_H2" color="secondary">
				{title}
			</Typography>
		</Box>
	)
}
