import { useState } from "react"
import {
	Drawer,
	Radio,
	List,
	ListItem,
	Button,
	Box,
	Typography,
	styled
} from "@mui/material"
import IncrementOperator from "./increment-operator"
import RadioGroup from "@spp/components/elements/Radio"
import { enqueueSnackbar } from "notistack"

const StyledContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	width: "100%"
}))

const Wrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center"
}))

const list = [
	{
		id: "0",
		name: "Regular",
		value: "regular",
		price: "Rs.100"
	},
	{
		id: "1",
		name: "Medium",
		value: "medium",
		price: "Rs.200"
	},
	{
		id: "2",
		name: "Large",
		value: "large",
		price: "Rs.300"
	}
]

function AddToCartDrawer({
	count,
	setCount,
	isOpen,
	onClose,
	setCloseAddToCart
}) {
	const [selectedValue, setSelectedValue] = useState(list[0].value)

	const handleChange = (event) => {
		setSelectedValue(event.target.value)
	}

	const handleAddToCart = () => {
		setCloseAddToCart()
		//open snackbar
		enqueueSnackbar("Item added to cart", {
			variant: "success"
		})
	}

	return (
		<>
			<Drawer anchor="bottom" open={isOpen} onClose={onClose}>
				<Box sx={{ border: "1px solid lightgrey", borderRadius: "5px" }} m={1}>
					<List>
						{list.map((item) => {
							return (
								<ListItem>
									<StyledContainer>
										<Typography>{item.name}</Typography>
										<Wrapper>
											<Typography>{item.price}</Typography>
											<Radio
												size="small"
												checked={selectedValue === item.value}
												onChange={handleChange}
												value={item.value}
												name="radio-buttons"
												inputProps={{ "aria-label": "A" }}
											/>
										</Wrapper>
									</StyledContainer>
								</ListItem>
							)
						})}
					</List>
				</Box>

				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					}}
					p={1}
				>
					<IncrementOperator count={count} setCount={setCount} />

					<Button
						onClick={handleAddToCart}
						variant="contained"
						color="primary"
						type="submit"
						// disabled={isSubmitting}
					>
						Add to cart
					</Button>
				</Box>
			</Drawer>
		</>
	)
}

export default AddToCartDrawer
