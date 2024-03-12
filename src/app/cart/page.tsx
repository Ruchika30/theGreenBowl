"use client"
import {
	Toolbar,
	Link,
	Checkbox,
	Button,
	Box,
	FormControlLabel,
	Typography
} from "@mui/material"
import { useEffect, useState } from "react"
import useCart from "@spp/context/cart-context/useCart"
import { AppBar } from "@spp/fragments/NavBar"
import { isSafeArray } from "@spp/helpers/Utils"
import { useRouter } from "next/navigation"
import ProductCard from "./product-card"
import { closeSnackbar } from "notistack"
import NextLink from "next/link"
import Navbar from "../../fragments/NavBar"

function CartPage() {
	const { products } = useCart()
	const [options, setOptions] = useState({
		sendCutlery: false,
		sendNapkins: false,
		useOldAddress: false
	})

	useEffect(() => {
		/* Hide snackbar for cart page */
		closeSnackbar()
	}, [])

	const handleProceed = () => {}

	const checkboxOptions = [
		{ name: "sendCutlery", label: "Do not send cutlery" },
		{ name: "sendUtensils", label: "Do not send napkins" },
		{
			name: "useOldAddress",
			label: "I have ordered previously. Use same address"
		}
	]

	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target

		setOptions((prevFormData) => ({
			...prevFormData,
			[name]: checked
		}))
	}

	const getButtonValue = () => {
		if (options.useOldAddress) {
			return (
				<Link
					href={"/address"}
					component={NextLink}
					underline="none"
					color="white"
				>
					Confirm over whatsapp
				</Link>
			)
		}

		return (
			<Link
				href={"/address"}
				component={NextLink}
				underline="none"
				color="white"
			>
				Proceed to add Address
			</Link>
		)
	}

	return (
		<Box
			sx={{
				backgroundColor: "whiteSmoke",
				height: "100vh",
				display: "flex",
				flexDirection: "column"
			}}
			p={1}
		>
			<Navbar />

			<Box component="main" sx={{ flex: 1 }}>
				<Toolbar />

				<Box
					sx={{ backgroundColor: "white", borderRadius: "10px", flex: 1 }}
					p={1}
				>
					{isSafeArray(products) ? (
						products.map((item) => {
							return (
								<>
									<ProductCard product={item} key={item.id} />
								</>
							)
						})
					) : (
						<Box>
							<Typography>Your cart is empty!!</Typography>
						</Box>
					)}
				</Box>
			</Box>

			{checkboxOptions.map((item) => (
				<FormControlLabel
					key={item.name}
					control={
						<Checkbox
							checked={options[item.name]}
							onChange={handleCheckboxChange}
							name={item.name}
						/>
					}
					label={
						<Typography variant="SPP_Caption" color="secondary">
							{item.label}
						</Typography>
					}
				/>
			))}

			<Box sx={{ width: "100%" }}>
				<Button
					style={{ width: "100%" }}
					onClick={handleProceed}
					variant="contained"
					color="primary"
					type="submit"
					// disabled={isSubmitting}
				>
					{!isSafeArray(products) ? (
						<Link
							href={"/dashboard"}
							component={NextLink}
							underline="none"
							color="white"
						>
							Go Back
						</Link>
					) : (
						getButtonValue()
					)}
				</Button>
			</Box>
		</Box>
	)
}

export default CartPage
