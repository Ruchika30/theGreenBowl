import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@spp/constants/queryKeys"
import { getProductList } from "@spp/services/products/getProductList"

const useMenu = () => {
	const {
		isLoading: isLoadingMenu,
		error: menuError,
		data: menuData
	} = useQuery({
		queryKey: [queryKeys.getProductList],
		queryFn: getProductList
	})

	return {
		menuData,
		isLoadingMenu,
		menuError
	}
}

export default useMenu
