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
import useCart from "@spp/hooks/useCart"
import { isSafeArray } from "@spp/helpers/Utils"

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

function AddToCartDrawer({
	image,
	options = [],
	count,
	setCount,
	isOpen,
	onClose,
	setCloseAddToCart
}) {
	const { cartItems, addItem, cartCount } = useCart()
	const [selectedValue, setSelectedValue] = useState()

	useEffect(() => {
		if (isSafeArray(options)) setSelectedValue(options[0].value)
	}, [options])

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
			<Button
				sx={{ fontSize: "12px" }}
				color="inherit"
				onClick={() => {
					closeSnackbar(snackbarId)
				}}
			>
				Cancel
			</Button>
		</>
	)

	const handleAddToCart = () => {
		addItem(selectedValue)
		setCloseAddToCart()
		//open snackbar
		enqueueSnackbar(
			<Typography variant="SPP_Caption" color="primary.contrastText">
				{cartItems.length} Item added
			</Typography>,
			{
				action,
				variant: "success",
				persist: true
			}
		)

		//update cart
	}

	return (
		<>
			<Drawer
				anchor="bottom"
				open={isOpen}
				onClose={onClose}
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
						<List>
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
						</List>
					</Box>

					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center"
						}}
						p={1}
					>
						<IncrementOperator count={count} setCount={setCount} />

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
