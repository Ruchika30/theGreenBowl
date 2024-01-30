"use client"

import React from "react"

import { InMemoryCache, createHttpLink, split } from "@apollo/client"

import { setContext } from "@apollo/client/link/context"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"

import { getMainDefinition } from "@apollo/client/utilities"

import {
	NextSSRApolloClient,
	ApolloNextAppProvider
} from "@apollo/experimental-nextjs-app-support/ssr"
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"
import { setVerbosity } from "ts-invariant"

import Loading from "@spp/app/loading"

import { User, onIdTokenChanged } from "firebase/auth"

import AuthContext from "./AuthContext"

import { useRouter } from "next/navigation"

import { AuthUserData } from "types/typings"

if (process.env.NODE_ENV === "development") {
	setVerbosity("debug")
	loadDevMessages()
	loadErrorMessages()
}

function makeClient() {
	const httpLink = createHttpLink({
		uri: process.env.NEXT_PUBLIC_GRAPHQL_URL
	})
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
	const router = useRouter()

	const [user, setUser] = React.useState<User | null>(null)
	const [authUserData, setAuthUserData] = React.useState<AuthUserData | null>(
		null
	)
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		const isTokenChanged = async (user: User | null) => {
			if (user) {
				setUser(user)
			}
			setIsLoading(false)
		}

		// const unsubscribe = onIdTokenChanged(_, isTokenChanged)

		// return () => unsubscribe()
	}, [router])

	// wait for the client to load the JWT token & the user object from firebase
	// if (isLoading) {
	// 	return <Loading />
	// }

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				authUserData,
				setAuthUserData
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
