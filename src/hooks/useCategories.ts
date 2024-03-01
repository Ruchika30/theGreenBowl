import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@spp/constants/queryKeys"
import { getCategories } from "@spp/services/products/getCategories"

export const useCategories = () => {
	const {
		isLoading: isLoadingCategories,
		error: categoriesError,
		data: categoriesData
	} = useQuery({
		queryKey: [queryKeys.getStoreDashboard],
		queryFn: getCategories
	})

	return {
		categoriesData,
		isLoadingCategories,
		categoriesError
	}
}
