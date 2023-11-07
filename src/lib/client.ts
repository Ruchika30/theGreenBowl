import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	split,
} from "@apollo/client"

import { setContext } from "@apollo/client/link/context"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"

import { getMainDefinition } from "@apollo/client/utilities"

import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc"

import { auth } from "./firebase"

export const { getClient } = registerApolloClient(() => {
	const httpLink = createHttpLink({
		uri: "http://178.128.116.251:8080/v1/graphql",
	})

	const wsLink = new GraphQLWsLink(
		createClient({
			url: "ws://178.128.116.251:8080/v1/graphql",
			connectionParams: async () => {
				const token = await auth.currentUser?.getIdToken()
				return {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			},
		})
	)

	const authLink = setContext(async (_, { headers }) => {
		// return the headers to the context so httpLink can read them
		const token = await auth.currentUser?.getIdToken()

		if (!token) {
			return {
				headers,
			}
		}
		return {
			headers: {
				...headers,
				Authorization: `Bearer ${token}`,
			},
		}
	})

	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query)
			return (
				definition.kind === "OperationDefinition" &&
				definition.operation === "subscription"
			)
		},
		wsLink,
		authLink.concat(httpLink)
	)

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: splitLink,
	})
})
