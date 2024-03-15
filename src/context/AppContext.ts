import React from "react"

const AppContext = React.createContext({
	appConstants: {
		currency: [],
		marketRegions: [],
		businessTypes: []
	},
	dashboard: {
		currency: null,
		setCurrency: () => {}
	}
})

export default AppContext
