"use client"

import { Box, Chip, Grid, Typography } from "@mui/material"

import TextBox from "@spp/components/elements/TextBox"

interface Props {
	register: any
	errors: any
}

const roles = [
	{
		id: "MERCHANT",
		name: "Merchant",
	},
	{
		id: "PARTNER",
		name: "Partner",
	},
	{
		id: "PSP",
		name: "PSP",
	},
]

export default function NewMerchant({ register, errors }: Props) {
	return (
		<Box sx={{ marginTop: 10 }} px={6}>
			<Typography variant="SPP_H2" color="secondary" mb={8}>
				Add a New Merchant
			</Typography>

			<Grid container spacing={6} mb={2}>
				<Grid item xs={6}>
					<TextBox
						name="email"
						register={register}
						placeholder="Enter email"
						helperText={errors?.email?.message}
						error={!!errors?.email?.message}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextBox
						name="password"
						register={register}
						placeholder="Enter password"
						helperText={errors?.password?.message}
						error={!!errors?.password?.message}
					/>
				</Grid>
			</Grid>

			<Box mb={8}>
				<Typography variant="SPP_Body_2" color="secondary" mb={2}>
					Sign up as
				</Typography>

				{roles.map((role) => (
					<Chip key={role.id} label={role.name} sx={{ mr: 2 }} />
				))}
			</Box>
		</Box>
	)
}
