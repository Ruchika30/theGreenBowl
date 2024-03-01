import { useCartContext } from "./CartContextProvider"
import useCartProducts from "./useCartProducts"
import useCartTotal from "./useCartTotal"

const useCart = () => {
	const { isOpen, setIsOpen, selectedProduct, setSelectedProduct } =
		useCartContext()
	const {
		products,
		addProduct,
		removeProduct,
		increaseProductQuantity,
		decreaseProductQuantity
	} = useCartProducts()

	const { total, updateCartTotal } = useCartTotal()

	const openCart = () => setIsOpen(true)
	const closeCart = () => setIsOpen(false)

	return {
		isOpen,
		openCart,
		closeCart,
		products,
		addProduct,
		removeProduct,
		selectedProduct,
		setSelectedProduct,
		increaseProductQuantity,
		decreaseProductQuantity,
		total,
		updateCartTotal
	}
}

export default useCart
