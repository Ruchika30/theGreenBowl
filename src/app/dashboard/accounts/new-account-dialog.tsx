import {
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	Typography,
} from "@mui/material"

import Popup from "@spp/components/elements/Popup"
import TextBox from "@spp/components/elements/TextBox"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AddAccountSchema } from "./validation"

import CloseIcon from "@mui/icons-material/Close"
interface Props {
	isAddingAccount: boolean
	setIsAddingAccount: (value: boolean) => void
}

export default function NewAccountDialog({
	isAddingAccount,
	setIsAddingAccount,
}: Props) {
	const {
		formState: { errors },
		handleSubmit,
		register,
		reset,
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(AddAccountSchema),
	})

	const createAccount = (data: any) => {
		console.log(data)
		reset()
		setIsAddingAccount(false)
	}

	return (
		<Popup
			dialogProps={{
				open: isAddingAccount,
				component: "form",
				onSubmit: handleSubmit(createAccount),
			}}
		>
			<Box py={10} px={10}>
				<Box display="flex" justifyContent="space-between">
					<Typography variant="SPP_H2" color="secondary">
						Add a New Account
					</Typography>

					<Box>
						<IconButton size="large" onClick={() => setIsAddingAccount(false)}>
							<CloseIcon />
						</IconButton>
					</Box>
				</Box>

				<Grid container spacing={6} mt={0}>
					<Grid item xs={6}>
						<TextBox
							name="accountName"
							register={register}
							placeholder="Enter account name"
							helperText={errors?.accountName?.message}
							error={!!errors?.accountName?.message}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextBox
							name="accountNickname"
							register={register}
							placeholder="Enter account nickname"
							helperText={errors?.accountNickname?.message}
							error={!!errors?.accountNickname?.message}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextBox
							name="accountNumber"
							register={register}
							placeholder="Enter account number / IBAN"
							helperText={errors?.accountNumber?.message}
							error={!!errors?.accountNumber?.message}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextBox
							name="currency"
							register={register}
							placeholder="Select account currency"
							helperText={errors?.currency?.message}
							error={!!errors?.currency?.message}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextBox
							name="bankCharges"
							register={register}
							placeholder="Enter bank charges"
							helperText={errors?.bankCharges?.message}
							error={!!errors?.bankCharges?.message}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextBox
							name="accountAddress"
							register={register}
							placeholder="Enter account address"
							helperText={errors?.accountAddress?.message}
							error={!!errors?.accountAddress?.message}
						/>
					</Grid>
				</Grid>
			</Box>

			<Divider />

			<Box py={5} px={10} textAlign="right">
				<Button variant="contained" color="primary" type="submit">
					CONFIRM AND ADD ACCOUNT
				</Button>
			</Box>
		</Popup>
	)
}
