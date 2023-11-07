import { Grid, Box, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { CurrencyExchangeSchema } from "@spp/app/validation"

type IData = {
	name: string
	value: number
	id: number
}

export default function ConversionSummary({ data }: { data: IData[] }) {
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm({
		mode: "onSubmit",
		resolver: yupResolver(CurrencyExchangeSchema),
	})

	return (
		<Box sx={{ margin: "32px 0px" }}>
			<Grid container spacing={3} mt={2}>
				{data.map((item) => (
					<>
						<Grid item xs={6}>
							<Typography>{item.name}</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography style={{ textAlign: "right" }}>
								{item.value}
							</Typography>
						</Grid>
					</>
				))}
			</Grid>
		</Box>
	)
}
