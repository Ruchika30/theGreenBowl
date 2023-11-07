import { Typography, Box, Button } from "@mui/material"
import TextBox from "@spp/components/elements/TextBox"
import DropdownSelect from "../../../components/elements/DropdownSelect"
import { Control, UseFormRegister } from "react-hook-form"
import styles from "./style"
import ConversionSummary from "./ConversionSummary"

export type ICurrencyExchange = {
	control: Control<
		{
			fees: number
			selectBusiness: string
		},
		any
	>
	register: UseFormRegister<{
		fees: number
		selectBusiness: string
	}>
}

function CurrencyExchange({ control, register }: ICurrencyExchange) {
	const { StyledContainer, StyledTitle } = styles

	const businessTypes = [
		{
			id: 1,
			value: "bifold",
		},

		{
			id: 1,
			value: "trifold",
		},
		{
			id: 1,
			value: "creditcard",
		},
	]

	const summaryData = [
		{ id: 1, name: "Amount Entered", value: "200 USD" },
		{
			id: 2,
			name: "Fees",
			value: (
				<Box
					sx={{
						display: "flex",
						justifyContent: "end",
						margin: "40 40",
						"& .mui-vvs61f-MuiInputBase-root-MuiOutlinedInput-root": {
							borderRadius: "4px",
						},
					}}
				>
					{/* <Image src="/ic_edit.svg" alt="edit" width={20} height={20} /> */}
					<TextBox
						width="50px"
						height="24px"
						padding="0 0"
						name="fees"
						register={register}
					/>
				</Box>
			),
		},
		{
			id: 3,
			name: "Amount to be Converted",
			value: "195 USD",
		},
		{
			id: 4,
			name: "Exchange Rate",
			value: "1 USD = 0.95 EUR",
		},
		{
			id: 5,
			name: (
				<Typography variant="SPP_H5" color="secondary">
					Converted Amount
				</Typography>
			),
			value: (
				<Typography variant="SPP_H5" color="secondary">
					72 USD
				</Typography>
			),
		},
	]

	return (
		<>
			<StyledContainer>
				<StyledTitle>
					<Typography variant="SPP_H2" color="secondary">
						Exchange Currency
					</Typography>
				</StyledTitle>

				<Box sx={{ marginTop: "42px" }}>
					<Box>
						<DropdownSelect
							control={control}
							isRequired
							menuList={businessTypes}
							label="Select a business"
						/>
					</Box>

					<Box sx={{ display: "flex", margin: "24px 0px" }}>
						<Box sx={{ marginRight: "24px", flex: 1 }}>
							<DropdownSelect
								control={control}
								isRequired
								menuList={businessTypes}
								label="From Currency"
							/>
						</Box>
						<Box sx={{ flex: 1 }}>
							<DropdownSelect
								control={control}
								isRequired
								menuList={businessTypes}
								label="To Currency"
							/>
						</Box>
					</Box>

					<Box>
						<TextBox
							isRequired
							height="52px"
							padding="10px 10px"
							name="selectBusiness"
							register={register}
							placeholder="Select a business"
							label="Select a business"
							endValue={`Availble: 177 USD`}
						/>
					</Box>
				</Box>

				<Box sx={{ margin: "32px 0px" }}>
					<Typography variant="SPP_H5" color="secondary">
						Conversion Summary
					</Typography>
				</Box>

				<ConversionSummary data={summaryData} />

				<Box display="flex" justifyContent="end" alignItems="center">
					<Button variant="contained" type="submit" disabled={false}>
						Confirm
					</Button>
				</Box>
			</StyledContainer>
		</>
	)
}

export default CurrencyExchange
