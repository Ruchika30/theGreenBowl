import { apiRoutes } from "@spp/constants/apiRoutes"

export const getProductList = async () => {
	try {
		const response = await fetch(apiRoutes.menuItemtList, {
			method: "GET"
		})
		if (!response.ok) {
			throw new Error("Network response was not ok")
		}

		const data = await response.json()

		// Process the  data
		return data
	} catch (error) {
		console.error("Error fetching  data:", error)
	}
}
