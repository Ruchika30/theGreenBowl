import React from "react"
import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	styled,
	AppBar as MuiAppBar,
	Link,
	Box,
	IconButton,
	Typography
} from "@mui/material"
import NextLink from "next/link"

const FullPageDrawer = styled(Drawer)({
	width: "100%",
	height: "100vh",
	flexShrink: 0,
	"& .MuiDrawer-paper": {
		width: "100%"
	}
})

const DrawerContainer = styled("div")({
	width: "100%"
})

const FullPageMenu = ({ isOpen = "true" }) => {
	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return
		}
	}

	// Add your menu categories here
	const menuItems = [
		{ value: "Monday", timing: "12:00 AM - 11:59 PM" },
		{ value: "Tuesday", timing: "12:00 AM - 11:59 PM" },
		{ value: "Wednesday", timing: "12:00 AM - 11:59 PM" },
		{ value: "Thursday", timing: "12:00 AM - 11:59 PM" },
		{ value: "Friday", timing: "12:00 AM - 11:59 PM" },
		{ value: "Saturday", timing: "12:00 AM - 11:59 PM" },
		{ value: "Sunday", timing: "12:00 AM - 11:59 PM" }
	]

	return (
		// <Box mt={4}>
		<FullPageDrawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
			<DrawerContainer
				sx={{ marginTop: "70px", padding: 2 }}
				onClick={toggleDrawer(false)}
				onKeyDown={toggleDrawer(false)}
				role="presentation"
			>
				<Typography color="secondary" variant="SPP_H5">
					Call us!
				</Typography>
				<Typography color="secondary" variant="SPP_Body_1">
					9757024944
				</Typography>

				<Typography color="secondary" variant="SPP_Caption" mt={4}>
					Opening hours
				</Typography>

				<Box mt={4}>
					<table>
						<tbody>
							{menuItems.map((item) => (
								<tr key={item.value}>
									<td>
										<Typography color="secondary" variant="SPP_Caption">
											{item.value}
										</Typography>
									</td>
									<td>
										<Typography color="secondary" variant="SPP_Caption">
											{item.timing}
										</Typography>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</Box>
			</DrawerContainer>
		</FullPageDrawer>
	)
}

export default FullPageMenu
