"use client"
import { Box, Typography } from "@mui/material"
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import useMenu from "@spp/hooks/useMenu"
import MenuItem from "./menu-item"
import AddToCartDrawer from "./add-to-cart-drawer"
import Loading from "@spp/app/loading"

function FoodMenu() {
	const { menuData, isLoadingMenu, menuError } = useMenu()

	if (isLoadingMenu) {
		return <Loading />
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
			<Box mb={8}>
				{menuData?.map((item) => {
					return (
						<>
							<Box key={item._id}>
								<Accordion defaultExpanded elevation={0} id="salads">
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1-content"
										id={item.name.replaceAll(" ", "-")}
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
