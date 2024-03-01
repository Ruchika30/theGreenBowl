import { Box, styled, Grid, Typography } from "@mui/material"
import ChipElement from "@spp/components/elements/ChipElement"
import useToggle from "@spp/hooks/useToggle"
import Image from "next/image"
import AddToCartDrawer from "./add-to-cart-drawer"
import { useState } from "react"
import LineClampTypography from "@spp/components/elements/LineClampTypography"
import { useCart } from "@spp/context/cart-context"

const StyledContainer = styled(Box)({
	flex: 1,
	// backgroundColor: "#f6f6f6",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between"
})

const StyledAdd = styled(Box)({
	zIndex: 999,
	position: "absolute",
	left: "50%",
	transform: "translateX(-50%)",
	bottom: "-12px",
	width: "100px",
	textAlign: "center",
	borderRadius: "2px",
	background: "orange"
})

function MenuItem({ product }) {
	const { openCart, setSelectedProduct } = useCart()
	const [count, setCount] = useState(0)

	// const {
	// 	isOpen: openAddToCart,
	// 	open: setOpenAddToCart,
	// 	close: setCloseAddToCart
	// } = useToggle(false)

	const handleAdd = (product) => {
		openCart()
		setSelectedProduct(product)
		// console.log("itemii--", product)

		// setOpenAddToCart()
		setCount((prev) => prev + 1)
	}

	return (
		<>
			<Box mb={4}>
				<Box sx={{ display: "flex", flex: 1, flexDirection: "row-reverse" }}>
					<Box
						sx={{
							height: "150px",
							width: "150px",
							background: "lightSteelBlue",
							position: "relative"
						}}
					>
						<Image
							// src={product.image}
							src="https://res.cloudinary.com/avantika-server/image/upload/v1708843958/Sweet_Summer_llh42w.jpg"
							alt="food_img"
							// width={150}
							// height={140}
							layout="fill"
							objectFit="cover"
							priority
						/>

						<StyledAdd onClick={() => handleAdd(product)}>Add+</StyledAdd>
					</Box>

					<StyledContainer pr={1}>
						<Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row-reverse",
									justifyContent: "space-between"
								}}
							>
								<Box visibility={product.tag ? "visible" : "hidden"}>
									<ChipElement color="red" text={product.tag || ""} />
								</Box>

								<Image
									src="https://dummyimage.com/15x15/000/fff"
									alt="veg/nonveg icon"
									width={15}
									height={15}
									priority
								/>
							</Box>

							<Typography variant="SPP_Caption" color="secondary" mt={1}>
								{product.itemName}
							</Typography>

							<LineClampTypography
								sx={{ lineHeight: "15px", fontSize: "11px" }}
								lines={2}
								variant="SPP_Body_2"
								color="secondary"
								mt={1}
							>
								{product.description}
							</LineClampTypography>

							<Typography pt={1} variant="SPP_Caption" color="secondary">
								Rs.{product.price[0].value}
							</Typography>

							<Grid container spacing={1} mt={1}>
								<Grid item xs={6}>
									<Typography variant="SPP_Display_2" color="secondary">
										Energy: 1001kcal
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="SPP_Display_2" color="secondary">
										Fats: 1001kcal
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="SPP_Display_2" color="secondary">
										Protein: 1001kcal
									</Typography>
								</Grid>

								<Grid item xs={6}>
									<Typography variant="SPP_Display_2" color="secondary">
										Carbs: 1001kcal
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</StyledContainer>
				</Box>
			</Box>
		</>
	)
}

export default MenuItem
