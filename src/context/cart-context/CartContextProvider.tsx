import React, { useContext, FC, useState } from "react"

const CartContext = React.createContext(undefined)
const useCartContext = () => {
	const context = useContext(CartContext)

	if (!context) {
		throw new Error("useCartContext must be used within a CartProvider")
	}

	return context
}

const totalInitialValues = {
	productQuantity: 0,
	installments: 0,
	totalPrice: 0,
	currencyId: "USD",
	currencyFormat: "$"
}

const CartProvider: FC = (props) => {
	const [isOpen, setIsOpen] = useState(false)
	const [products, setProducts] = useState([])
	const [selectedProduct, setSelectedProduct] = useState({})
	const [total, setTotal] = useState(totalInitialValues)
	const [userOptions, setUserOptions] = useState({
		dontSendCutlery: false,
		dontSendNapkins: false,
		useOldAddress: false
	})
	const [userAddress, setUserAddress] = useState("")

	const CartContextValue = {
		isOpen,
		setIsOpen,
		products,
		setProducts,
		selectedProduct,
		setSelectedProduct,
		total,
		setTotal,
		userOptions,
		setUserOptions,
		userAddress,
		setUserAddress
	}

	return (
		<CartContext.Provider value={CartContextValue} {...props}>
			{props.children}
		</CartContext.Provider>
	)
}

export { CartProvider, useCartContext }
