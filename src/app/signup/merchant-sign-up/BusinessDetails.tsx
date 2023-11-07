import { Box, Chip, Grid, Typography } from "@mui/material"

import TextBox from "@spp/components/elements/TextBox"

interface Props {
	register: any
	errors: any
}

const industries = [
	{
		id: "Industry",
		name: "Industry",
	},
	{
		id: "Industry",
		name: "Industry",
	},
	{
		id: "Industry",
		name: "Industry",
	},
]

const regionTargeted = [
	{
		id: "india",
		name: "India",
	},
	{
		id: "usa",
		name: "USA",
	},
	{
		id: "singapore",
		name: "Singapore",
	},
]

const currencyRequired = [
	{
		id: "india",
		name: "India",
	},
	{
		id: "usa",
		name: "USA",
	},
	{
		id: "singapore",
		name: "Singapore",
	},
]

export default function BusinessDetails({ register, errors }: Props) {
	return (
		<Box sx={{ marginTop: 8 }} px={6}>
			<Typography variant="SPP_H3" color="secondary" mb={8}>
				Business Details
			</Typography>

			<Grid container spacing={4} mb={8}>
				<Grid item xs={6}>
					<Typography variant="SPP_Body_2" color="secondary" mb={2}>
						Industry
					</Typography>

					{industries.map((industry) => (
						<Chip key={industry.id} label={industry.name} sx={{ mr: 2 }} />
					))}
				</Grid>

				<Grid item xs={6}>
					<TextBox
						name="legalCompanyName"
						register={register}
						placeholder="Legal Company Name"
						helperText={errors?.legalCompanyName?.message}
						error={!!errors?.legalCompanyName?.message}
					/>
				</Grid>

				<Grid item xs={6}>
					<TextBox
						name="companyRegistrationNumber"
						register={register}
						placeholder="Company Registration / License Number"
						helperText={errors?.companyRegistrationNumber?.message}
						error={!!errors?.companyRegistrationNumber?.message}
					/>
				</Grid>

				<Grid item xs={6}>
					<TextBox
						name="companyAddress"
						register={register}
						placeholder="Company Address"
						helperText={errors?.companyAddress?.message}
						error={!!errors?.companyAddress?.message}
					/>
				</Grid>

				<Grid item xs={6}>
					<TextBox
						name="companyWebsite"
						register={register}
						placeholder="Website / Brand Name"
						helperText={errors?.companyWebsite?.message}
						error={!!errors?.companyWebsite?.message}
					/>
				</Grid>

				<Grid item xs={6}>
					<TextBox
						name="primaryContactName"
						register={register}
						placeholder="Primary Contact Name"
						helperText={errors?.primaryContactName?.message}
						error={!!errors?.primaryContactName?.message}
					/>
				</Grid>

				<Grid item xs={6}>
					<TextBox
						name="companyNickname"
						register={register}
						placeholder="Company Nickname"
						helperText={errors?.companyNickname?.message}
						error={!!errors?.companyNickname?.message}
					/>
				</Grid>

				<Grid item xs={6}>
					<TextBox
						name="referralPartner"
						register={register}
						placeholder="Referral Partner"
						helperText={errors?.referralPartner?.message}
						error={!!errors?.referralPartner?.message}
					/>
				</Grid>

				<Grid item xs={6}>
					<Typography variant="SPP_Body_2" color="secondary" mb={2}>
						Regions Targeted
					</Typography>

					{regionTargeted.map((regions) => (
						<Chip key={regions.id} label={regions.name} sx={{ mr: 2 }} />
					))}
				</Grid>

				<Grid item xs={6}>
					<Typography variant="SPP_Body_2" color="secondary" mb={2}>
						Currencies Required
					</Typography>

					{currencyRequired.map((currency) => (
						<Chip key={currency.id} label={currency.name} sx={{ mr: 2 }} />
					))}
				</Grid>
			</Grid>
		</Box>
	)
}
