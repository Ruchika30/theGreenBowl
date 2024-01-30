"use client"

import React from "react"

import { Box, Typography, Link } from "@mui/material"
import NextLink from "next/link"

export default function Page() {
	// Add your menu categories here
	const menuItems = [
		{ value: "Food", path: "/food-screen" },
		{ value: "Drinks", path: "/drinks" }
	]

	return (
		<Box>
			<Box mt={10}>
				<Typography variant="SPP_H3" sx={{ textAlign: "center" }}>
					Menu Categories
				</Typography>
				<Typography variant="SPP_Caption" sx={{ textAlign: "center" }}>
					Select your option
				</Typography>

				{menuItems?.map((item) => {
					return (
						<Box py={5} mt={5} sx={{ border: "1px solid grey" }}>
							<Link href={item.path} component={NextLink} underline="none">
								<Typography variant="SPP_CTA" sx={{ textAlign: "center" }}>
									{item.value}
								</Typography>
							</Link>
						</Box>
					)
				})}
			</Box>
		</Box>
	)
}
