import * as React from "react"

import "@spp/app/global.css"

import ThemeRegistry from "@spp/components/ThemeRegistry/ThemeRegistry"

import RootLayout from "./root-layout"

import { ApolloProvider } from "@spp/context/ApolloProvider"

export const metadata = {
	title: "TheGreenBowl",
	description: "TheGreenBowl"
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ApolloProvider>
					<ThemeRegistry>
						<RootLayout>{children}</RootLayout>
					</ThemeRegistry>
				</ApolloProvider>
			</body>
		</html>
	)
}
