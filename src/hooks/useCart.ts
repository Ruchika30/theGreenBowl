import CartContext from "@spp/context/CartContext"
import { useContext, useState } from "react"

function useCart() {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error("useCart must be used within a CartProvider")
	}

	return context
}

export default useCart
