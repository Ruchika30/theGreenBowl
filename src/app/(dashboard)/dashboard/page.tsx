"use client"
import {
	Menu,
	MenuItem,
	styled,
	Snackbar,
	Box,
	Link,
	Alert as MuiAlert,
	IconButton,
	Typography
} from "@mui/material"
import NextLink from "next/link"
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp"
import { Constants } from "@spp/constants/constants"
import useToggle from "@spp/hooks/useToggle"
import CancelIcon from "@mui/icons-material/CancelOutlined"
import { useState } from "react"
import {
	Accordion,
	AccordionDetails,
	AccordionActions,
	AccordionSummary
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Button from "@mui/material/Button"
import MenuList from "./salad-menu"
import Image from "next/image"
import { getMenuAndCategories } from "@spp/services/products/getMenuAndCategories"

function FoodMenu() {
	const { isError, isLoading, productDetails } = getMenuAndCategories()

	console.log("yeyye--", productDetails)

	if (isLoading) {
		return <Typography>Loading!</Typography>
	}

	if (isError) {
		return (
			<>
				<Typography>Unable to load data</Typography>
			</>
		)
	}

	return (
		<>
			{/* Menu main content */}
			<Box>
				{productDetails?.map((item) => {
					return (
						<Box key={item.categoryId}>
							<Accordion defaultExpanded elevation={0} id="salads">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1-content"
									id="panel1-header"
								>
									{item.details.name}
								</AccordionSummary>
								<AccordionDetails>
									<MenuList list={item.details.menus} />
								</AccordionDetails>
							</Accordion>
						</Box>
					)
				})}
			</Box>
		</>
	)
}

export default FoodMenu
