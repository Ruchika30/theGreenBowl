import { Box, styled, Typography } from "@mui/material"
import ChipElement from "@spp/components/elements/ChipElement"
import useToggle from "@spp/hooks/useToggle"
import Image from "next/image"
import AddToCartDrawer from "./add-to-cart-drawer"
import { saladList } from "./saladList"
import { useState } from "react"

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

function SaladMenu() {
	const [count, setCount] = useState(0)

	const {
		isOpen: openAddToCart,
		open: setOpenAddToCart,
		close: setCloseAddToCart
	} = useToggle(false)

	const handleAdd = () => {
		setOpenAddToCart()
		setCount((prev) => prev + 1)
	}

	return (
		<>
			{saladList.map((item) => {
				return (
					<Box
						sx={{ display: "flex", flex: 1, flexDirection: "row-reverse" }}
						mb={2}
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
								src={item.foodImg}
								alt="food_img"
								width={150}
								height={150}
								priority
							/>

							<StyledAdd onClick={handleAdd}>Add+</StyledAdd>
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

								<Typography pl={1} variant="SPP_H6" color="secondary" mt={1}>
									{item.menuItem}
								</Typography>

								<Typography
									pl={1}
									pt={1}
									variant="SPP_Caption"
									color="secondary"
								>
									Rs.{item.price}
								</Typography>
							</Box>
						</StyledContainer>
					</Box>
				)
			})}

			<AddToCartDrawer
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
