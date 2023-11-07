import { Typography, Box, Grid } from "@mui/material"
import styles from "./style"

// TODO - remove any
function ExchangeHistory({ list }: any) {
	const { StyledHistoryContainer, StyledTitle } = styles

	return (
		<>
			<StyledHistoryContainer>
				<StyledTitle>
					<Typography variant="SPP_H2" color="secondary">
						Exchange History
					</Typography>
				</StyledTitle>

				<Box
					sx={{
						marginTop: "5.25rem",
					}}
				>
					<Grid container spacing={3} mt={2}>
						{list.map((item: any) => {
							return (
								<>
									<Grid item xs={7}>
										<Box sx={{ display: "flex", flexDirection: "column" }}>
											<Typography variant="SPP_H6" color="secondary">
												{item.title}
											</Typography>
											<Typography variant="SPP_Body_2" color="secondary">
												{item.date}
											</Typography>
										</Box>
									</Grid>
									<Grid item xs={5}>
										<Typography
											variant="SPP_H6"
											sx={{ display: "flex", justifyContent: "end" }}
										>
											{item.value}
										</Typography>
										<Box
											sx={{ display: "flex", justifyContent: "space-between" }}
										>
											<Typography variant="SPP_Body_2" color="secondary">
												Conversion Rate: {item.rate}
											</Typography>
											<Typography variant="SPP_Body_2" color="secondary">
												Fees: {item.fees}
											</Typography>
										</Box>
									</Grid>
								</>
							)
						})}
					</Grid>

					<Typography variant="SPP_H4" sx={{ marginTop: "5rem" }}>
						See 53,628 Older Exchanges
					</Typography>
				</Box>
			</StyledHistoryContainer>
		</>
	)
}

export default ExchangeHistory
