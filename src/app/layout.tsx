import * as React from "react"

import "@spp/app/global.css"

import ThemeRegistry from "@spp/components/ThemeRegistry/ThemeRegistry"

import RootLayout from "./root-layout"

export const metadata = {
	title: "TheGreenBowl",
	description: "TheGreenBowl"
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>
					<RootLayout>{children}</RootLayout>
				</ThemeRegistry>
			</body>
		</html>
	)
}
