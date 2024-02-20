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

const StyledMenu = styled(Box)({
	background: "black",
	color: "contrastText"
})

export function MenuBar() {
	const [anchorElement, setAnchorElement] = useState(null)
	const openCart = () => {}

	const {
		isOpen: openMenu,
		open: setOpenMenu,
		close: setCloseMenu
	} = useToggle(false)

	const onMenuClick = (e) => {
		setAnchorElement(e.currentTarget)
		setOpenMenu()
	}

	const handleClick = ({ sectionId }) => {
		setCloseMenu()
		const targetSection = document.getElementById(sectionId)
		if (targetSection) {
			targetSection.scrollIntoView({ behavior: "smooth", block: "start" })
		}
	}

	return (
		<Box sx={{ display: "flex", position: "sticky" }} py={1}>
			{openMenu ? (
				<IconButton onClick={setCloseMenu}>
					<StyledMenu px={1} borderRadius={4}>
						<Typography variant="SPP_Body_1" color="white">
							Menu
						</Typography>
					</StyledMenu>
				</IconButton>
			) : (
				<IconButton onClick={onMenuClick}>
					<StyledMenu px={1} borderRadius={4}>
						<Typography variant="SPP_Body_1" color="white">
							Menu
						</Typography>
					</StyledMenu>
				</IconButton>
			)}

			<Box ml={2} sx={{ flexGrow: 1 }} />

			<IconButton onClick={openCart}>
				<ShoppingCartSharpIcon color="secondary" />
			</IconButton>

			{/* Anchor Menu */}
			<Menu anchorEl={anchorElement} open={openMenu} onClose={setCloseMenu}>
				<MenuItem>
					<Link
						href="#"
						onClick={() => handleClick({ sectionId: "salads" })}
						component={NextLink}
						underline="none"
					>
						<Typography color="secondary">Salads</Typography>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link
						href="#"
						onClick={() => handleClick({ sectionId: "smoothies" })}
						component={NextLink}
						underline="none"
					>
						<Typography color="secondary">Smoothies</Typography>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link href="/drinks" component={NextLink} underline="none">
						<Typography color="secondary">Drinks</Typography>
					</Link>
				</MenuItem>
			</Menu>
		</Box>
	)
}

function FoodMenu() {
	return (
		<>
			<Box
				px={1}
				sx={{ position: "sticky", top: 50, zIndex: 1000, background: "white" }}
			>
				<MenuBar />
			</Box>

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
