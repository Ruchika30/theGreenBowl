import React, { useState, createContext } from "react"
import { Button, Link } from "@mui/material"
import NextLink from "next/link"
import { useCart } from "./cart-context"
import { Snackbar } from "@mui/material"
import { useSnackbar } from "notistack"

const SnackbarContext = createContext(false)

// Create a provider component to wrap your application
export const SnackbarProvider = ({ children, message, variant }) => {
	const { total } = useCart()
	const [showContent, setShowContent] = useState(false)
	const [state, setState] = useState({ message: "", variant: "default" })
	const { closeSnackbar } = useSnackbar()

	const action = (
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

	// Function to open snackbar
	const showSnackbar = (data) => {
		setShowContent(true)
		setState({
			message: data.message,
			variant: data.variant
		})
	}

	return (
		<SnackbarContext.Provider value={{ showSnackbar }}>
			{showContent ? (
				<Snackbar
					open={true}
					autoHideDuration={3000}
					// onClose={handleClose}
					message={state.message}
					action={action}
					color="primary.contrastText"
				/>
			) : null}
			{children}
		</SnackbarContext.Provider>
	)
}
