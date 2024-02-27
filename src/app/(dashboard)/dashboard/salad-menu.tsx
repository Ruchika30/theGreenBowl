import { Box, styled, Grid, Typography } from "@mui/material"
import ChipElement from "@spp/components/elements/ChipElement"
import useToggle from "@spp/hooks/useToggle"
import Image from "next/image"
import AddToCartDrawer from "./add-to-cart-drawer"
import { useState } from "react"
import LineClampTypography from "@spp/components/elements/LineClampTypography"

const StyledContainer = styled(Box)({
	flex: 1,
	backgroundColor: "#f6f6f6",
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

function SaladMenu({ list }) {
	const [count, setCount] = useState(0)
	const [selected, setSelected] = useState({})

	const {
		isOpen: openAddToCart,
		open: setOpenAddToCart,
		close: setCloseAddToCart
	} = useToggle(false)

	const handleAdd = (item) => {
		setSelected(item)
		console.log("itemii--", item)

		setOpenAddToCart()
		setCount((prev) => prev + 1)
	}

	return (
		<>
			{list?.map((item: any) => {
				return (
					<Box mb={2} key={item.id}>
						<Box
							sx={{ display: "flex", flex: 1, flexDirection: "row-reverse" }}
						>
							<Box
								sx={{
									height: "150px",
									width: "150px",
									background: "lightSteelBlue",
									position: "relative"
								}}
							>
								<Image
									src={item.image}
									alt="food_img"
									width={150}
									height={150}
									priority
								/>

								<StyledAdd onClick={() => handleAdd(item)}>Add+</StyledAdd>
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
										<Box visibility={item.tag ? "visible" : "hidden"}>
											<ChipElement color="red" text={item.tag || ""} />
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
										{item.itemName}
									</Typography>

									<LineClampTypography
										sx={{ lineHeight: "15px", fontSize: "11px" }}
										lines={2}
										variant="SPP_Body_2"
										color="secondary"
										mt={1}
									>
										{item.description}
									</LineClampTypography>

									<Typography pt={1} variant="SPP_Caption" color="secondary">
										Rs.{item.price[0].value}
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
				)
			})}

			<AddToCartDrawer
				image={""}
				options={selected.price}
				setCount={setCount}
				setCloseAddToCart={setCloseAddToCart}
				count={count}
				isOpen={openAddToCart}
				onClose={setCloseAddToCart}
			/>
		</>
	)
}

export default SaladMenu
