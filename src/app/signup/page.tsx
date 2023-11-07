import { Box, Container, Divider, Toolbar } from "@mui/material"

import NavBar from "@spp/fragments/NavBar"

import MerchantSignup from "./merchant-sign-up"

export default function Signup() {
	return (
		<Box>
			<NavBar authState="unauthenticated" />

			<Toolbar />

			<MerchantSignup />
		</Box>
	)
}
