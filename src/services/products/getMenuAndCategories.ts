import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "./getCategories"
import { getProductList } from "./getProductList"
import { queryKeys } from "@spp/constants/queryKeys"

export const getMenuAndCategories = () => {
	const [isLoading, setLoading] = useState(false)
	const [isError, setError] = useState(null)
	const [productDetails, setProductDetails] = useState()

	const {
		isLoading: isLoadingCategories,
		error: categoriesError,
		data: categoriesData
	} = useQuery({
		queryKey: [queryKeys.getStoreDashboard],
		queryFn: getCategories
	})

	const {
		isLoading: isLoadingProductList,
		error: productListError,
		data: productListData
	} = useQuery({
		queryKey: [queryKeys.getProductList],
		queryFn: getProductList
	})

	useEffect(() => {
		if (categoriesData && productListData) {
			const categoriesObj = {}
			categoriesData.forEach((item) => {
				if (!categoriesObj[item.categoryId]) {
					categoriesObj[item.categoryId] = item.name
				}
			})

			const groupedByCategoryId = productListData.reduce((acc, currentItem) => {
				const categoryId = currentItem.categoryId
				const existingCategory = acc.find(
					(item) => item.categoryId === categoryId
				)
				if (existingCategory) {
					existingCategory.menus.push(currentItem)
				} else {
					acc.push({ categoryId, details: currentItem })
				}
				return acc
			}, [])

			setProductDetails(groupedByCategoryId)
			setLoading(isLoadingCategories || isLoadingProductList)
			setError(categoriesError || productListError)
		}
	}, [
		categoriesData,
		isLoadingCategories,
		isLoadingProductList,
		productListData
	])

	return {
		isError,
		isLoading,
		productDetails
	}
}
