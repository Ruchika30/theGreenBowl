"use client"
import { useEffect, useState } from "react"
import {
	Drawer,
	Radio,
	Link,
	Button,
	Box,
	Typography,
	styled,
	List,
	ListItem,
	FormControlLabel,
	IconButton
} from "@mui/material"
import Image from "next/image"
import { enqueueSnackbar } from "notistack"
import { isSafeArray } from "@spp/helpers/Utils"
import { useCart } from "@spp/context/cart-context"
import NextLink from "next/link"
import { ic_nonveg, ic_veg } from "../../../icons"
import CloseIcon from "@mui/icons-material/Close"

const StyledContainer = styled(Box)(() => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	width: "100%"
}))

const Wrapper = styled(Box)(() => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center"
}))

function AddToCartDrawer() {
	const {
		addProduct,
		selectedProduct = {},
		isOpen,
		closeCart,
		total
	} = useCart()
	const [variant, setVariant] = useState()
	const [selectedOption, setSelectedOption] = useState()

	const handleChange = (event, item) => {
		setSelectedOption(event.target.value)
		setVariant(item)
	}

	useEffect(() => {
		if (isSafeArray(selectedProduct?.price)) {
			setSelectedOption(selectedProduct?.price[0].value)
			setVariant(selectedProduct?.price[0])
		}
	}, [selectedProduct])

	const action = () => (
		<>
			<Button sx={{ fontSize: "12px" }} color="inherit">
				<Link
					href={"/cart"}
					component={NextLink}
					underline="none"
					color="white"
				>
					Go to cart
				</Link>
			</Button>
		</>
	)

	const openSnackbar = () => [
		enqueueSnackbar(
			<Typography variant="SPP_Caption" color="primary.contrastText">
				{total.productQuantity} Items added
			</Typography>,
			{
				action,
				variant: "success",
				persist: true
			}
		)
	]

	useEffect(() => {
		if (total.productQuantity) openSnackbar(total.productQuantity)
	}, [total.productQuantity])

	const handleAddToCart = () => {
		addProduct({ ...selectedProduct, quantity: 1, variant })
		closeCart()
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
		/* If product is superbowl then return both icons */
		if (selectedProduct.categoryType == 2) {
			return (
				<Box sx={{ display: "flex" }}>
					{getVegIcon()}
					{getNonVegIcon()}
				</Box>
			)
		}
		return selectedProduct.veg ? getVegIcon() : getNonVegIcon()
	}

	return (
		<>
			<Drawer
				anchor="bottom"
				open={isOpen}
				onClose={closeCart}
				sx={{ zIndex: 1500, position: "relative" }}
			>
				<Box
					sx={{
						marginLeft: "auto"
					}}
					mr={1}
				>
					<IconButton
						onClick={closeCart}
						sx={{
							// background: "#000",
							color: "#000",
							// boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
							borderRadius: "50%",
							zIndex: 1
						}}
					>
						<CloseIcon fontSize="small" />
					</IconButton>
				</Box>

				<Box sx={{ background: "transparent" }}>
					<Box>
						{selectedProduct.image && (
							<Box
								sx={{
									border: "1px solid lightgrey",
									borderRadius: "5px",
									height: "200px",
									position: "relative" // Add position relative to contain the image
								}}
								m={1}
							>
								<Image
									src={selectedProduct.image}
									alt="App Logo"
									layout="fill" // Fill the entire container
									objectFit="cover"
									priority
								/>
							</Box>
						)}

						<Box m={1}>
							<Box sx={{ display: "flex", alignItems: "flex-start" }}>
								{getProductType()}
								<Typography variant="SPP_Caption" color="secondary" ml={1}>
									{selectedProduct.itemName}
								</Typography>
							</Box>
							<Typography mt={1} variant="SPP_Body_2" color="secondary" ml={3}>
								{selectedProduct.description}
							</Typography>
						</Box>
					</Box>

					<Box
						sx={{ border: "1px solid lightgrey", borderRadius: "5px" }}
						m={1}
					>
						<List dense={true}>
							{isSafeArray(selectedProduct.price) &&
								selectedProduct.price.map((item) => {
									return (
										<ListItem key={item.id} sx={{ marginBottom: "-6px" }}>
											<StyledContainer>
												<Typography variant="SPP_Body_1" color="secondary">
													{item.name}
												</Typography>
												<Wrapper>
													<FormControlLabel
														value={item.value}
														control={
															<Radio
																size="small"
																checked={selectedOption == item.value}
																onChange={(e) => handleChange(e, item)}
																name="radio-buttons"
																inputProps={{ "aria-label": "A" }}
															/>
														}
														label={
															<Typography
																variant="SPP_Body_1"
																color="secondary"
															>
																Rs.{item.value}
															</Typography>
														}
														labelPlacement="start"
													/>
												</Wrapper>
											</StyledContainer>
										</ListItem>
									)
								})}
						</List>
					</Box>

					<Box
						sx={{
							display: "flex",
							justifyContent: "end",
							alignItems: "center"
						}}
						p={1}
					>
						{/* TODO: fix the operations */}
						{/* <IncrementOperator product={selectedProduct} /> */}

						<Button
							onClick={handleAddToCart}
							variant="contained"
							color="primary"
							type="submit"
							// disabled={isSubmitting}
						>
							Add to cart
						</Button>
					</Box>
				</Box>
			</Drawer>
		</>
	)
}

export default AddToCartDrawer
