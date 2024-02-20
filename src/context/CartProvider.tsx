import { useEffect, useState } from "react"
import CartContext from "./CartContext"

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([])
	const [cartCount, setCartCount]= useState(0)

	const addItem = (item) => {
		setCartItems((prevCartItems) => [...prevCartItems, item])
	}

	const removeItem = (itemId) => {
		setCartItems(cartItems.filter((item) => item.id !== itemId))
	}

	useEffect(() => {
		console.log("cartItems--", cartItems)
		setCartCount(prev => prev+1)
	}, [cartItems.length])

	return (
		<CartContext.Provider value={{cartCount, cartItems, addItem, removeItem }}>
			{children}
		</CartContext.Provider>
	)
}
