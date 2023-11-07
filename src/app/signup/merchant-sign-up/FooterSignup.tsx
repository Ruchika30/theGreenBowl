import { Box, Button, LinearProgress, Typography } from "@mui/material"

export default function FooterSignup() {
	return (
		<Box display="flex" justifyContent="space-between" px={6} my={4}>
			<Box display="flex" alignItems="center">
				<Typography variant="SPP_H6" color="secondary" mr={2}>
					25% complete
				</Typography>

				<Box width={240}>
					<LinearProgress variant="determinate" value={25} />
				</Box>
			</Box>

			<Box>
				<Button variant="contained" type="submit">
					Next
				</Button>
			</Box>
		</Box>
	)
}
