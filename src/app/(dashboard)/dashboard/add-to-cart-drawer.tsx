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
	ListItem
} from "@mui/material"
import IncrementOperator from "./increment-operator"
import Image from "next/image"
import { enqueueSnackbar } from "notistack"
import { isSafeArray } from "@spp/helpers/Utils"
import { useCart } from "@spp/context/cart-context"
import NextLink from "next/link"

const StyledContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	width: "100%"
}))

const Wrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center"
}))

function AddToCartDrawer() {
	const { addProduct, selectedProduct, isOpen, closeCart, total } = useCart()
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

	return (
		<>
			<Drawer
				anchor="bottom"
				open={isOpen}
				onClose={closeCart}
				sx={{ zIndex: 1500 }}
			>
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
								// src="https://res.cloudinary.com/avantika-server/image/upload/v1708843958/Sweet_Summer_llh42w.jpg"
								alt="App Logo"
								layout="fill" // Fill the entire container
								objectFit="cover"
								priority
							/>
						</Box>
					)}
					<Box
						sx={{ border: "1px solid lightgrey", borderRadius: "5px" }}
						m={1}
					>
						<List>
							{isSafeArray(selectedProduct.price) &&
								selectedProduct.price.map((item) => {
									return (
										<ListItem key={item.id}>
											<StyledContainer>
												<Typography variant="SPP_Body_1" color="secondary">
													{item.name}
												</Typography>
												<Wrapper>
													<Typography variant="SPP_Body_1" color="secondary">
														Rs.{item.value}
													</Typography>
													<Radio
														size="small"
														checked={selectedOption == item.value}
														onChange={(e) => handleChange(e, item)}
														value={item.value}
														name="radio-buttons"
														inputProps={{ "aria-label": "A" }}
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
