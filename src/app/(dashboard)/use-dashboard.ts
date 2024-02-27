import { queryKeys } from "@spp/constants/queryKeys"
import { getMenuAndCategories } from "@spp/services/products/getMenuAndCategories"
import { getProductList } from "@spp/services/products/getProductList"
import { useQuery } from "@tanstack/react-query"

const useDashboard = () => {
	const { isLoading, error, data } = useQuery({
		queryKey: [queryKeys.getStoreDashboard],
		queryFn: () => getMenuAndCategories()
	})

	return { isLoading, error, data }
}

export default useDashboard
