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
				borderRadius: "2px",
				backgroundColor: color
			}}
			display="flex"
			alignItems="center"
			className={className}
		>
			<Typography component="p" variant="caption" color="#FFF">
				<strong>{text}</strong>
			</Typography>
		</Box>
	)
}
