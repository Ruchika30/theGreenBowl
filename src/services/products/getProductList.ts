export const getProductList = async ({ apiUrl }) => {
	try {
		const response = await fetch(apiUrl)

		if (!response.ok) {
			throw new Error("Network response was not ok")
		}

		const data = await response.json()

		// Process the  data
		console.log(data)
	} catch (error) {
		console.error("Error fetching weather data:", error)
	}
}
