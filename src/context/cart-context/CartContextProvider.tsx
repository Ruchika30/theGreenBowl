import React, { useContext, FC, useState } from "react"

interface Total {
	// Define the structure of your total object
}

interface UserOptions {
	dontSendCutlery: boolean
	dontSendNapkins: boolean
	useOldAddress: boolean
}

interface Product {
	// Define the structure of your product object
}

interface ContextState {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	products: Product[]
	selectedProduct: Product | null
	setSelectedProduct: (product: Product | null) => void
	total: Total
	userOptions: UserOptions
	setUserOptions: (prevFormData: any) => any
	userAddress: string
	setUserAddress: (address: string) => void // Define the setter function
}

const totalInitialValues = {
	productQuantity: 0,
	installments: 0,
	totalPrice: 0,
	currencyId: "USD",
	currencyFormat: "$"
}

const initialState: ContextState = {
	isOpen: false,
	products: [],
	selectedProduct: null, // Or initial selected product
	total: totalInitialValues,
	userOptions: {
		dontSendCutlery: false,
		dontSendNapkins: false,
		useOldAddress: false
	},
	userAddress: "",
	setIsOpen: () => {}, // Define setIsOpen setter function
	setSelectedProduct: () => {}, // Define setSelectedProduct setter function
	setUserOptions: () => {}, // Define setUserOptions setter function
	setUserAddress: () => {}
}

const CartContext = React.createContext<ContextState>(initialState)

const useCartContext = () => {
	const context = useContext(CartContext)

	if (!context) {
		throw new Error("useCartContext must be used within a CartProvider")
	}

	return context
}

const CartProvider: FC = (props: any) => {
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
