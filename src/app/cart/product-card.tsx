import { Box, styled, Typography } from "@mui/material"
import Image from "next/image"
import IncrementOperator from "../(dashboard)/dashboard/increment-operator"
import { useCart } from "@spp/context/cart-context"
import { isSafeArray } from "@spp/helpers/Utils"

const StyledContainer = styled(Box)({
	flex: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between"
})

function ProductCard({ product }) {
	const { increaseProductQuantity, decreaseProductQuantity, removeProduct } =
		useCart()

	const getTotalAmount = (product) => {
		const { variant = "", quantity = "" } = product
		const total = Number(variant?.value * quantity)
		return total
	}

	const handleIncrement = () => {
		increaseProductQuantity(product)
	}

	const handleDecrement = () => {
		if (product.quantity > 1) {
			decreaseProductQuantity(product)
		} else removeProduct(product)
	}

	return (
		<>
			<Box mb={4}>
				<Box sx={{ display: "flex", flex: 1 }}>
					<StyledContainer pr={1}>
						<Box>
							<Box sx={{ display: "flex" }}>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row-reverse",
										justifyContent: "space-between"
									}}
								>
									<Image
										src="https://dummyimage.com/15x15/000/fff"
										alt="veg/nonveg icon"
										width={15}
										height={15}
										priority
									/>
								</Box>

								<Box ml={1}>
									<Typography variant="SPP_Caption" color="secondary">
										{product.itemName}
									</Typography>
									{isSafeArray(product.price) && (
										<Box sx={{ display: "flex" }}>
											<Typography variant="SPP_Body_2" color="secondary">
												{`(${product.variant?.name})`}
											</Typography>

											<Typography variant="SPP_Body_2" color="secondary" ml={2}>
												{`Rs.${product.variant?.value}`}
											</Typography>
										</Box>
									)}
								</Box>
							</Box>
						</Box>
					</StyledContainer>

					{/* stepper */}
					<Box>
						<Box>
							<IncrementOperator
								product={product}
								size="small"
								onClickPlus={handleIncrement}
								onClickMinus={handleDecrement}
							/>
						</Box>

						<Box sx={{ marginTop: "5px", display: "flex" }}>
							<Typography
								color="secondary"
								variant="SPP_Display_2"
								fontWeight="bold"
							>
								Rs.{getTotalAmount(product)}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	)
}

export default ProductCard
