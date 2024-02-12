import { Box, styled, Typography } from "@mui/material"
import { useState } from "react"

function IncrementOperator({ count, setCount }) {
	const handleIncrement = () => {
		setCount((prev) => prev + 1)
	}

	const handleDecrement = () => {
		if (count > 0) {
			setCount((prev) => prev - 1)
		}
	}

	const StyledContainer = styled(Box)(({ theme }) => ({
		// backgroundColor: theme.palette.customColors.pastelGreen,
		display: "flex",
		alignItems: "center",
		width: "fit-content",
		border: "1px solid black",
		borderRadius: "6px"
	}))

	return (
		<>
			<StyledContainer px={1}>
				<Typography px={2} onClick={handleDecrement} fontSize="25px">
					-
				</Typography>

				<Typography fontSize="20px">{count}</Typography>
				<Typography px={2} onClick={handleIncrement} fontSize="25px">
					+
				</Typography>
			</StyledContainer>
		</>
	)
}

export default IncrementOperator
