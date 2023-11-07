import React from "react"

import AppContext from "./AppContext"

import { FETCH_APP_ENUMS } from "@spp/app/queries"
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"

interface Props {
	children: React.ReactNode
}

export default function AppProvider({ children }: Props) {
	const { data } = useQuery(FETCH_APP_ENUMS)

	const [appConstants, setAppConstants] = React.useState({
		currency: [],
	})

	React.useEffect(() => {
		if (data) {
			setAppConstants({
				currency: data.currencies,
			})
		}
	}, [data])

	return (
		<AppContext.Provider
			value={{
				appConstants: appConstants,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
