import React from "react"

import { BusinessType, Currency, MarketRegions } from "types/typings"

interface AppContextType {
	appConstants: {
		currency: Currency[]
		marketRegions: MarketRegions[]
		businessTypes: BusinessType[]
	}
	dashboard: {
		currency: Currency["code"] | null
		setCurrency: React.Dispatch<React.SetStateAction<Currency["code"] | null>>
	}
}

const AppContext = React.createContext<AppContextType>({
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
