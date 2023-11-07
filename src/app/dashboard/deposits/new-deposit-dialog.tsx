import React from "react"

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
import AutocompleteBox from "@spp/components/elements/AutocompleteBox"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AddDepositSchema } from "./validation"

import { useLazyQuery } from "@apollo/client"
import { FETCH_ALL_BUSINESSES } from "./queries"

import { enqueueSnackbar } from "notistack"

import { LikeQuery } from "@spp/helpers/LikeQuery"

import { Constants } from "@spp/constants/constants"

import CloseIcon from "@mui/icons-material/Close"

interface Props {
	isAddingDeposit: boolean
	setIsAddingDeposit: (value: boolean) => void
}

export default function NewDepositDialog({
	isAddingDeposit,
	setIsAddingDeposit,
}: Props) {
	const {
		formState: { errors },
		handleSubmit,
		register,
		control,
		setValue,
		reset,
		watch,
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(AddDepositSchema),
	})

	const watchBusiness = watch("business") || null
	const watchBusinessName = watch("business.search") || ""

	const [businesses, setBusinesses] = React.useState<any[]>([])

	const [fetchBusinesses, { loading: isLoadingBusiness }] =
		useLazyQuery(FETCH_ALL_BUSINESSES)

	React.useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			try {
				setBusinesses([])

				const { data } = await fetchBusinesses({
					variables: {
						name: LikeQuery(watchBusinessName),
					},
				})

				if (data?.businesses?.length > 0) {
					let temp = data?.businesses?.map(({ id, name }: any) => ({
						id: id,
						name: name,
						label: name,
					}))

					setBusinesses(temp || [])
				}
			} catch (err) {
				enqueueSnackbar("Unable to fetch businesses!", {
					variant: "error",
				})
			}
		}, Constants.DEBOUNCE_TIME)

		return () => clearTimeout(delayDebounceFn)
	}, [fetchBusinesses, setValue, watchBusinessName])

	const createAccount = (data: any) => {
		console.log(data)

		reset()

		setIsAddingDeposit(false)
	}

	return (
		<Popup
			dialogProps={{
				open: isAddingDeposit,
				component: "form",
				onSubmit: handleSubmit(createAccount),
			}}
		>
			<Box py={10} px={10}>
				<Box display="flex" justifyContent="space-between" mb={6}>
					<Typography variant="SPP_H2" color="secondary">
						Add a New Deposit
					</Typography>

					<Box>
						<IconButton size="large" onClick={() => setIsAddingDeposit(false)}>
							<CloseIcon />
						</IconButton>
					</Box>
				</Box>

				<Grid container spacing={6}>
					<Grid item xs={6}>
						<AutocompleteBox
							isRequired={true}
							loading={false}
							options={businesses}
							isEditing={true}
							name="business"
							control={control}
							setValue={setValue}
							value={watchBusiness}
							autoCompleteProps={{
								value: watchBusiness,
								placeholder: "Select a business",
								noOptionsText: "No businesses found",
								loading: isLoadingBusiness,
								isOptionEqualToValue: (options: any, value: any) =>
									options?.name === value?.name,
								getOptionLabel: (option: any) => option?.name,
							}}
							helperText={errors?.business?.message}
							error={!!errors?.business?.message}
						/>
					</Grid>

					<Grid item xs={6} />

					<Grid item xs={6}>
						<TextBox
							name="productName"
							register={register}
							placeholder="Select an account"
							helperText={errors?.productName?.message}
							error={!!errors?.productName?.message}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextBox
							name="productName"
							register={register}
							placeholder="Select a customer"
							helperText={errors?.productName?.message}
							error={!!errors?.productName?.message}
						/>
					</Grid>
				</Grid>
			</Box>

			<Divider />

			<Box py={10} px={10}>
				<Box display="flex" justifyContent="space-between" mb={6}>
					<Typography variant="SPP_H3" color="secondary">
						Deposit Details
					</Typography>
				</Box>

				<Grid container spacing={6}>
					<Grid item xs={6}>
						<TextBox
							name="productName"
							register={register}
							placeholder="Enter product name"
							helperText={errors?.productName?.message}
							error={!!errors?.productName?.message}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextBox
							name="productPrice"
							register={register}
							placeholder="Enter product price"
							helperText={errors?.productPrice?.message}
							error={!!errors?.productPrice?.message}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextBox
							name="brand"
							register={register}
							placeholder="Select brand"
							helperText={errors?.brand?.message}
							error={!!errors?.brand?.message}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextBox
							name="amountReceivedDate"
							register={register}
							placeholder="Date Received"
							helperText={errors?.amountReceivedDate?.message}
							error={!!errors?.amountReceivedDate?.message}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextBox
							name="amountReceived"
							register={register}
							placeholder="Amount Received"
							helperText={errors?.amountReceived?.message}
							error={!!errors?.amountReceived?.message}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextBox
							name="remarks"
							register={register}
							placeholder="Remarks"
							helperText={errors?.remarks?.message}
							error={!!errors?.remarks?.message}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextBox
							name="tags"
							register={register}
							placeholder="Select Tags"
							helperText={errors?.tags?.message}
							error={!!errors?.tags?.message}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextBox
							name="numberOfCopies"
							register={register}
							placeholder="Number of Copies"
							helperText={errors?.numberOfCopies?.message}
							error={!!errors?.numberOfCopies?.message}
						/>
					</Grid>
				</Grid>

				<Typography variant="SPP_Body_2" color="secondary" mb={1}>
					Upload Signed Invoice
				</Typography>

				<Button variant="contained">UPLOAD PDF</Button>
			</Box>

			<Divider />

			<Box py={5} px={10} textAlign="right">
				<Button variant="contained" color="primary" type="submit">
					ADD A NEW DEPOSIT
				</Button>
			</Box>
		</Popup>
	)
}
