import { Box, Typography } from "@mui/material"

interface Props {
	color: string
	text: string
	className?: string
}

export default function ChipElement({ color, text, className }: Props) {
	return (
		<Box
			pl={1}
			pr={1}
			sx={{
				borderRadius: "4px",
				backgroundColor: color
			}}
			display="flex"
			alignItems="center"
			className={className}
		>
			<Typography component="p" variant="caption" color="#FFF">
				{text}
			</Typography>
		</Box>
	)
}
