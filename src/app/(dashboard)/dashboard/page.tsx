"use client"
import {
	Menu,
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
import MenuList from "./menu-item"
import Image from "next/image"
import useMenu from "@spp/hooks/useMenu"
import MenuItem from "./menu-item"
import AddToCartDrawer from "./add-to-cart-drawer"

function FoodMenu() {
	const { menuData, isLoadingMenu, menuError } = useMenu()

	if (isLoadingMenu) {
		return <Typography>Loading!</Typography>
	}

	if (menuError) {
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
				{menuData?.map((item) => {
					return (
						<>
							<Box key={item._id}>
								<Accordion defaultExpanded elevation={0} id="salads">
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1-content"
										id={item.name}
									>
										{item.name}
									</AccordionSummary>
									<AccordionDetails>
										{item.menus.map((menu) => {
											return <MenuItem product={menu} key={menu.id} />
										})}
									</AccordionDetails>
								</Accordion>
							</Box>
						</>
					)
				})}

				<AddToCartDrawer />
			</Box>
		</>
	)
}

export default FoodMenu
