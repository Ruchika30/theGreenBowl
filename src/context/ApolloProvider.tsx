"use client"

import { ApolloLink, HttpLink } from "@apollo/client"
import {
	NextSSRApolloClient,
	ApolloNextAppProvider,
	NextSSRInMemoryCache,
	SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr"
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"
import { setVerbosity } from "ts-invariant"

if (process.env.NODE_ENV === "development") {
	setVerbosity("debug")
	loadDevMessages()
	loadErrorMessages()
}

function makeClient() {
	const httpLink = new HttpLink({
		uri: "http://178.128.116.251:8080/v1/graphql",
	})

	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
		link:
			typeof window === "undefined"
				? ApolloLink.from([
						// in a SSR environment, if you use multipart features like
						// @defer, you need to decide how to handle these.
						// This strips all interfaces with a `@defer` directive from your queries.
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
				  ])
				: httpLink,
	})
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	)
}
