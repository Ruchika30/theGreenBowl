"use client"
import { Toolbar, Box, IconButton } from "@mui/material"
import useCart from "@spp/context/cart-context/useCart"
import { AppBar } from "@spp/fragments/NavBar"
import { isSafeArray } from "@spp/helpers/Utils"
import { useRouter } from "next/navigation"
import ProductCard from "./product-card"
import { ArrowBackIosNew as BackIcon } from "@mui/icons-material"

function Navbar() {
	const router = useRouter()

	return (
		<AppBar elevation={0} position="fixed" variant="outlined">
			<Toolbar>
				<IconButton color="secondary" onClick={() => router.back()}>
					<BackIcon fontSize="small" />
				</IconButton>
			</Toolbar>
		</AppBar>
	)
}

function CartPage() {
	const { products } = useCart()

	return (
		<Box sx={{ backgroundColor: "whiteSmoke", height: "100vh" }} p={1}>
			<Navbar />

			<Box component="main" sx={{ flexGrow: 1 }}>
				<Toolbar />

				<Box sx={{ backgroundColor: "white", borderRadius: "10px" }} p={1}>
					{isSafeArray(products) &&
						products.map((item) => {
							return (
								<>
									<ProductCard product={item} key={item.id} />
								</>
							)
						})}
				</Box>
			</Box>
		</Box>
	)
}

export default CartPage
