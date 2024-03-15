import { Box, styled, Grid, Typography, Button } from "@mui/material"
import ChipElement from "@spp/components/elements/ChipElement"
import LineClampTypography from "@spp/components/elements/LineClampTypography"
import { useCart } from "@spp/context/cart-context"
import Image from "next/image"
import { ic_nonveg, ic_veg } from "../../../icons"

const StyledContainer = styled(Box)({
	flex: 1,
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

const AddButton = styled(Box)({
	background: "orange",
	width: "100px",
	borderRadius: "2px",
	textAlign: "center"
})
function MenuItem({ product }) {
	const { openCart, addProduct, setSelectedProduct } = useCart()

	const handleAdd = (e) => {
		// addProduct({ ...product, quantity: 1 })
		openCart()
		setSelectedProduct(product)
	}

	const getVegIcon = () => {
		return (
			<Image
				src={ic_veg}
				alt="veg/nonveg icon"
				width={15}
				height={15}
				priority
			/>
		)
	}

	const getNonVegIcon = () => {
		return (
			<Image
				src={ic_nonveg}
				alt="veg/nonveg icon"
				width={15}
				height={15}
				priority
			/>
		)
	}

	const getProductType = () => {
		// if product is superbowl then return both icons
		if (product.categoryType == 2) {
			return (
				<Box sx={{ display: "flex" }}>
					{getVegIcon()}
					{getNonVegIcon()}
				</Box>
			)
		}
		return product.veg ? getVegIcon() : getNonVegIcon()
	}

	return (
		<>
			<Box mb={4}>
				<Box sx={{ display: "flex", flex: 1, flexDirection: "row-reverse" }}>
					{product.image ? (
						<Box
							sx={{
								height: "150px",
								width: "150px",
								background: "lightSteelBlue",
								position: "relative"
							}}
						>
							<Image
								src={product.image}
								// src="https://res.cloudinary.com/avantika-server/image/upload/v1708843958/Sweet_Summer_llh42w.jpg"
								alt="food_img"
								// width={150}
								// height={140}
								layout="fill"
								objectFit="cover"
								priority
							/>

							<StyledAdd onClick={(e) => handleAdd(e)}>Add+</StyledAdd>
						</Box>
					) : (
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<AddButton onClick={(e) => handleAdd(e)}>Add+</AddButton>
						</Box>
					)}

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

								<>{getProductType()}</>
							</Box>

							<Typography variant="SPP_Caption" color="secondary" mt={1}>
								{product.itemName}
							</Typography>

							{!!product.description && (
								<LineClampTypography
									sx={{ lineHeight: "15px", fontSize: "11px" }}
									lines={2}
									variant="SPP_Body_2"
									color="secondary"
									mt={1}
								>
									{product.description}
								</LineClampTypography>
							)}
							<Typography pt={1} variant="SPP_Caption" color="secondary">
								Rs.{product.price[0].value}
							</Typography>

							<Grid container spacing={1} mt={1}>
								{/*<Grid item xs={6}>
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
								</Grid> */}
							</Grid>
						</Box>
					</StyledContainer>
				</Box>
			</Box>
		</>
	)
}

export default MenuItem
