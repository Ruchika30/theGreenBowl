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
	const { total } = useCart()

	const getTotalAmount = () => {}
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
										{product.itemName || "name"}
									</Typography>
									{isSafeArray(product.price) && (
										<Typography pt={1} variant="SPP_Caption" color="secondary">
											Rs.{product.price[0].value || "91991"}
										</Typography>
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
								count={total.productQuantity}
							/>
						</Box>

						<Box sx={{ marginTop: "5px", display: "flex" }}>
							<Typography color="secondary" variant="SPP_Display_2">
								{getTotalAmount}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	)
}

export default ProductCard
