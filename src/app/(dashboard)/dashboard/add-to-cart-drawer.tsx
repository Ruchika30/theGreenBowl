import { useEffect, useState } from "react"
import {
	Drawer,
	Radio,
	List,
	ListItem,
	Button,
	Box,
	Typography,
	styled
} from "@mui/material"
import IncrementOperator from "./increment-operator"
import Image from "next/image"
import { enqueueSnackbar } from "notistack"
import { isSafeArray } from "@spp/helpers/Utils"
import { useCart } from "@spp/context/cart-context"

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

function AddToCartDrawer(
	{
		// product,
		// image,
		// options = [],
		// count,
		// setCount,
		// isOpen,
		// onClose,
		// setCloseAddToCart
	}
) {
	const {
		addProduct,
		products,
		selectedProduct,
		setSelectedProduct,
		setSelectedValue,
		isOpen,
		closeCart,
		total
	} = useCart()

	const handleChange = (event) => {
		setSelectedValue(event.target.value)
	}

	const action = (snackbarId) => (
		<>
			<Button
				sx={{ fontSize: "12px" }}
				color="inherit"
				onClick={() => {
					alert(`I belong to snackbar with id ${snackbarId}`)
				}}
			>
				Go to cart
			</Button>
		</>
	)

	const openSnackbar = (count) => [
		enqueueSnackbar(
			<Typography variant="SPP_Caption" color="primary.contrastText">
				{/* {total.productQuantity} Items added */}
				{count} items
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
		addProduct({ ...selectedProduct, quantity: 1 })
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
							src="https://res.cloudinary.com/avantika-server/image/upload/v1708843958/Sweet_Summer_llh42w.jpg"
							alt="App Logo"
							layout="fill" // Fill the entire container
							objectFit="cover"
							priority
						/>
					</Box>

					<Box
						sx={{ border: "1px solid lightgrey", borderRadius: "5px" }}
						m={1}
					>
						{/* <List>
							{isSafeArray(options) &&
								options.map((item) => {
									return (
										<ListItem key={item.id}>
											<StyledContainer>
												<Typography variant="SPP_Body_1" color="secondary">
													{item.name}
												</Typography>
												<Wrapper>
													<Typography variant="SPP_Body_1" color="secondary">
														{item.value}
													</Typography>
													<Radio
														size="small"
														checked={selectedValue == item.value}
														onChange={handleChange}
														value={item.value}
														name="radio-buttons"
														inputProps={{ "aria-label": "A" }}
													/>
												</Wrapper>
											</StyledContainer>
										</ListItem>
									)
								})}
						</List> */}
					</Box>

					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center"
						}}
						p={1}
					>
						<IncrementOperator
							count={total.productQuantity}
							// setCount={setCount}
						/>

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
