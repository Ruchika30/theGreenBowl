import { apiRoutes } from "@spp/constants/apiRoutes"

export const getCategories = async () => {
	try {
		const response = await fetch(apiRoutes.menuCategories, {
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
