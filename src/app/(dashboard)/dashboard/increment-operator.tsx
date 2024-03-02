import { Box, styled, Typography } from "@mui/material"
import { useCart } from "@spp/context/cart-context"
import { useState } from "react"

function IncrementOperator({ product, size }) {
	console.log("heyproduct==", product)

	const { increaseProductQuantity, decreaseProductQuantity } = useCart()

	const handleIncrement = () => {
		increaseProductQuantity(product)
	}

	const handleDecrement = () => {
		decreaseProductQuantity(product)
	}

	const StyledContainer = styled(Box)(({ theme }) => ({
		// backgroundColor: theme.palette.customColors.pastelGreen,
		display: "flex",
		alignItems: "center",
		width: "fit-content",
		height: "25px",
		border: "1px solid black",
		borderRadius: "6px"
	}))

	if (size == "small") {
		return (
			<StyledContainer>
				<Typography px={1} onClick={handleDecrement} fontSize="25px">
					-
				</Typography>

				<Typography fontSize="10px">{product?.quantity}</Typography>
				<Typography px={1} onClick={handleIncrement} fontSize="25px">
					+
				</Typography>
			</StyledContainer>
		)
	}

	return (
		<>
			<StyledContainer px={1}>
				<Typography px={2} onClick={handleDecrement} fontSize="25px">
					-
				</Typography>

				<Typography fontSize="20px">{product?.quantity}</Typography>
				<Typography px={2} onClick={handleIncrement} fontSize="25px">
					+
				</Typography>
			</StyledContainer>
		</>
	)
}

export default IncrementOperator
