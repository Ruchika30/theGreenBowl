import React from "react"

import { number } from "yup"

const CartContext = React.createContext({
	cartItems: number,
	addItem: (item) => {},
	removeItem: (itemId) => {}
})

export default CartContext
