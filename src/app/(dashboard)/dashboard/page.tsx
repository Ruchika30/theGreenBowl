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
import SaladMenu from "./salad-menu"
import Image from "next/image"

function FoodMenu() {
	return (
		<>
			{/* Menu main content */}
			<Box>
				<Accordion defaultExpanded elevation={0} id="salads">
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1-content"
						id="panel1-header"
					>
						Salads
					</AccordionSummary>
					<AccordionDetails>
						<SaladMenu />
					</AccordionDetails>
				</Accordion>
				<Accordion defaultExpanded elevation={0} id="smoothies">
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2-content"
						id="panel2-header"
					>
						Smoothies
					</AccordionSummary>
					<AccordionDetails>
						<SaladMenu />
					</AccordionDetails>
				</Accordion>
				<Accordion defaultExpanded elevation={0}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel3-content"
						id="panel3-header"
					>
						Drinks
					</AccordionSummary>
					<AccordionDetails>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
					</AccordionDetails>
					<AccordionActions>
						<Button>Cancel</Button>
						<Button>Agree</Button>
					</AccordionActions>
				</Accordion>
			</Box>
		</>
	)
}

export default FoodMenu
