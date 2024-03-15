import React from "react"

import AppContext from "./AppContext"

interface Props {
	children: React.ReactNode
}

export default function AppProvider({ children }: Props) {
	const { data } = {}

	const [appConstants, setAppConstants] = React.useState({
		currency: [],
		marketRegions: [],
		businessTypes: []
	})
	const [currency, setCurrency] = React.useState(null)

	React.useEffect(() => {
		if (data) {
			setAppConstants({
				currency: data.currencies.map((currency) => ({
					...currency,
					id: currency?.code,
					name: currency?.code
				})),
				marketRegions: data.marketRegions.map(
					(marketRegion: MarketRegions) => ({
						...marketRegion,
						id: marketRegion?.enumValue,
						name: marketRegion?.name
					})
				),
				businessTypes: data.businessTypes.map((businessType: BusinessType) => ({
					...businessType,
					id: businessType?.enumValue,
					name: businessType?.name
				}))
			})
			setCurrency(data.currencies[0].code)
		}
	}, [data])

	return (
		<AppContext.Provider
			value={{
				appConstants: appConstants,
				dashboard: {
					currency: currency,
					setCurrency
				}
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
