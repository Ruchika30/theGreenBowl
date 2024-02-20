import { set, createStore, keys, getMany, get, del, clear } from "idb-keyval"

let productsStore = null

if (typeof window === "object" || process.env.NODE_ENV === "test") {
	productsStore = createStore("B2B_PRODUCTS_DB", "PRODUCTS")
}

type NewProductsKeyTypes = {}

export const addOrUpdateCartProduct = (
	productObj: NewProductsKeyTypes
): Promise<void> => {
	const { id } = productObj

	if (productObj.count) {
		return set(id, productObj, productsStore)
	} else {
		return del(id, productsStore)
	}
}

export const getProductById = async (
	productId: number | string
): Promise<NewProductsKeyTypes | null> => {
	return get(productId, productsStore).catch(() => null)
}

export const getAllCartProducts = async (): Promise<NewProductsKeyTypes[]> => {
	const allKeys = await keys(productsStore)
	return getMany(allKeys, productsStore)
}

export const getKeysWithCount = async (): Promise<{
	[key: string]: NewProductsKeyTypes
}> => {
	const cartCountWithKey = {}
	const allProducts = await getAllCartProducts()
	allProducts.forEach((ap) => (cartCountWithKey[ap.id] = ap))
	return cartCountWithKey
}

export const clearDB = (): Promise<void> => {
	return clear(productsStore)
}
