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
import { useEffect } from "react"
import useCart from "@spp/context/cart-context/useCart"
import { isSafeArray } from "@spp/helpers/Utils"
import ProductCard from "./product-card"
import { closeSnackbar } from "notistack"
import NextLink from "next/link"
import Navbar from "../../fragments/NavBar"
import WhatsappConfirmComponent from "./whatsapp-confirm-btn"

function CartPage() {
	const { products, userOptions, setUserOptions } = useCart()

	useEffect(() => {
		/* Hide snackbar for cart page */
		closeSnackbar()
	}, [])

	const handleProceed = () => {}

	const checkboxOptions = [
		{ name: "dontSendCutlery", label: "Do not send cutlery" },
		{ name: "dontSendNapkins", label: "Do not send napkins" },
		{
			name: "useOldAddress",
			label: "I have ordered previously. Use same address"
		}
	]

	const handleCheckboxChange = (event: {
		target: { name: any; checked: any }
	}) => {
		const { name, checked } = event.target

		setUserOptions((prevFormData: any) => ({
			...prevFormData,
			[name]: checked
		}))
	}

	const goBackBtn = () => {
		return (
			<Button
				style={{ width: "100%" }}
				onClick={handleProceed}
				variant="contained"
				color="primary"
				type="submit"
				// disabled={isSubmitting}
			>
				<Link
					href={"/dashboard"}
					component={NextLink}
					underline="none"
					color="white"
				>
					Go Back
				</Link>
			</Button>
		)
	}

	const proceedBtn = () => {
		return (
			<Button
				style={{ width: "100%" }}
				onClick={handleProceed}
				variant="contained"
				color="primary"
				type="submit"
				// disabled={isSubmitting}
			>
				<Link
					href={"/address"}
					component={NextLink}
					underline="none"
					color="white"
				>
					Proceed to add Address
				</Link>
			</Button>
		)
	}

	const getButton = () => {
		if (isSafeArray(products)) {
			/* 
				1. If checked old address - Show confirmBtn
				2. If unchecked - show proceedBtn
			*/

			if (userOptions.useOldAddress) {
				return <WhatsappConfirmComponent />
			} else return proceedBtn()
		} else {
			/* IF CART IS EMPTY */
			return goBackBtn()
		}
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
						products.map((item: any) => {
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
							checked={userOptions[item.name]}
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

			{userOptions.useOldAddress && (
				<Typography
					variant="SPP_Body_2"
					color="secondary"
					fontWeight="bold"
					mb={1}
				>
					Payment details will be shared over WhatsApp
				</Typography>
			)}

			<Box sx={{ width: "100%" }}>
				{getButton()}
				{/* <Button
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
						getButton()
					)}
				</Button> */}
			</Box>
		</Box>
	)
}

export default CartPage
