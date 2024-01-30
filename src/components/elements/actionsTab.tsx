import React from "react"
import { Box, Button, Grid, Typography } from "@mui/material"

import ChipSelector, {
	ChipDataItem
} from "@spp/components/elements/ChipSelector"
import TextBox from "@spp/components/elements/TextBox"
import DateSelector from "@spp/components/elements/DateSelector"
import FileInfo from "@spp/components/elements/FileInfo"
import FileUploadActionButton from "@spp/components/elements/FileUploadActionButton"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { StatusChangeMenuSchema } from "../../app/(dashboard)/deposits/validation"

import {
	getFileNameFromFirebaseDownloadUrl,
	uploadFileToFirebaseStorage
} from "@spp/helpers/Utils"
import { DocumentNode, useMutation } from "@apollo/client"
import { enqueueSnackbar } from "notistack"
import { UPDATE_DEPOSIT_DOCS } from "@spp/app/(dashboard)/deposits/queries"

type Props = {
	row: any
	refetch: () => void
	featureType: string
	updateRecordQuery: DocumentNode
	updateRecordQueryKey: string
}

let baseStatusListForDeposits = [
	{
		id: "NEW",
		name: "NEW"
	},
	{
		id: "RECEIVED",
		name: "RECEIVED"
	},
	{
		id: "REFUNDED",
		name: "REFUNDED"
	},
	{
		id: "CANCELLED",
		name: "CANCELLED"
	}
]

let baseStatusListForWithdrawals = [
	{
		id: "NEW",
		name: "NEW"
	},
	{
		id: "PROCESSING",
		name: "PROCESSING"
	},
	{
		id: "PAID",
		name: "PAID"
	},
	{
		id: "CANCELLED",
		name: "CANCELLED"
	},
	{
		id: "RETURNED",
		name: "RETURNED"
	}
]

let baseStatusListForRRSettlement = [
	{
		id: "NEW",
		name: "NEW"
	},
	{
		id: "PAID",
		name: "PAID"
	},
	{
		id: "CANCELLED",
		name: "CANCELLED"
	}
]
type ActionFormData = {
	amountReceived?: number | null | undefined
	amountReceivedDate?: Date | null | undefined
	cancelledDate?: Date | null | undefined
	refundedDate?: Date | null | undefined
	featureType: string
	status: {
		id: string
		name: string
	}
	refundedAmount?: number | null | undefined
	datePaid?: Date | null | undefined
	dateReturned?: Date | null | undefined
	amountReturned?: number | null | undefined
	withdrawalAmount?: number | null | undefined
	bankCharges?: number | null | undefined
}

const ActionTab = ({
	row,
	refetch,
	featureType,
	updateRecordQuery,
	updateRecordQueryKey
}: Props) => {
	const {
		formState: { errors },
		handleSubmit,
		register,
		control,
		setValue,
		watch
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(StatusChangeMenuSchema),
		defaultValues: {
			status: {},
			amountReceived: undefined,
			amountReceivedDate: new Date(),
			cancelledDate: new Date(),
			dateReturned: new Date(),
			datePaid: new Date(),
			refundedDate: new Date()
		}
	})

	const watchStatus = watch("status")

	const [invoiceFileName, setInvoiceFileName] = React.useState<
		string | undefined
	>(undefined)
	const [proofOfPaymentFileName, setProofOfPaymentFileName] = React.useState<
		string | undefined
	>(undefined)
	const [fileUploading, setFileUploading] = React.useState<boolean>(false)
	const [currentType, setCurrentType] = React.useState<string>("")

	const [updateRecordStatus, { loading }] = useMutation(updateRecordQuery)
	const [updateTxDocs] = useMutation(UPDATE_DEPOSIT_DOCS)

	React.useEffect(() => {
		if (featureType === "DEPOSIT" && row.signedInvoiceUrl) {
			getFileNameFromFirebaseDownloadUrl(row.signedInvoiceUrl)
				.then((fileName) => {
					setInvoiceFileName(fileName)
				})
				.catch(() => {
					enqueueSnackbar("Error fetching file name", {
						variant: "error"
					})
				})
		}

		if (row.proofOfPaymentUrl) {
			getFileNameFromFirebaseDownloadUrl(row.proofOfPaymentUrl)
				.then((fileName) => {
					setProofOfPaymentFileName(fileName)
				})
				.catch(() => {
					enqueueSnackbar("Error fetching file name", {
						variant: "error"
					})
				})
		}

		setValue("status", { id: row.status, name: row.status })
		setValue("featureType", featureType)
		setValue("amountReceived", row.amountReceived)
		setValue(
			"amountReceivedDate",
			row.amountReceivedDate
				? new Date(row.amountReceivedDate)
				: row.status === "RECEIVED"
					? new Date()
					: undefined
		)

		setValue("refundedAmount", row.refundedAmount)
		setValue(
			"refundedDate",
			row.refundedDate
				? new Date(row.refundedDate)
				: row.status === "REFUNDED"
					? new Date()
					: undefined
		)
		setValue(
			"cancelledDate",
			row.cancelledDate
				? new Date(row.cancelledDate)
				: row.status === "CANCELLED"
					? new Date()
					: undefined
		)
		setValue("withdrawalAmount", row.amount)
		setValue("bankCharges", row.bankCharges ?? row.fromAccountBankCharges)
		setValue(
			"datePaid",
			row.datePaid
				? new Date(row.datePaid)
				: row.status === "PAID"
					? new Date()
					: undefined
		)
		setValue(
			"dateReturned",
			row.dateReturned
				? new Date(row.dateReturned)
				: row.status === "RETURNED"
					? new Date()
					: undefined
		)
	}, [row, featureType, setValue])

	const onDocDelete = async (docType: string) => {
		const data: { [key: string]: any } = {}
		data[`${docType}Url`] = null // for unlinking file url from Deposit/Withdrawal
		await updateTxDocs({
			variables: {
				id: row?.id,
				urlData: data
			}
		})
		enqueueSnackbar("File deleted successfully", {
			variant: "success"
		})
		if (docType === "signedInvoice" || docType === "invoice") {
			setInvoiceFileName(undefined)
		} else {
			setProofOfPaymentFileName(undefined)
		}
	}

	const selectedStatus = (watch("status") as ChipDataItem) || null

	const onSubmit = async (data: ActionFormData) => {
		try {
			const {
				status,
				amountReceived,
				amountReceivedDate,
				refundedAmount,
				refundedDate,
				cancelledDate
			} = data

			const variables: { [key: string]: any } = {
				id: row.id,
				status: status.name,
				cancelledDate
			}

			variables["amountReceived"] = amountReceived
			variables["amountReceivedDate"] = amountReceivedDate
			variables["refundedAmount"] = refundedAmount
			variables["refundedDate"] = refundedDate

			const result = await updateRecordStatus({
				variables
			})

			if (!result) {
				enqueueSnackbar("Error updating status", {
					variant: "error"
				})
				return
			}

			if (featureType === "DEPOSIT") {
				if (result.data?.[updateRecordQueryKey]?.data?.status === status.name) {
					enqueueSnackbar("Status updated successfully", {
						variant: "success"
					})
				} else {
					enqueueSnackbar("Unable to change the status!", {
						variant: "error"
					})
				}
			} else {
				if (result.data?.[updateRecordQueryKey]?.data?.status === status.name) {
					enqueueSnackbar("Status updated successfully", {
						variant: "success"
					})
				} else {
					enqueueSnackbar("Unable to change the status!", {
						variant: "error"
					})
				}
			}
			if (refetch) refetch()
		} catch (e) {
			enqueueSnackbar("Error updating status", {
				variant: "error"
			})
		}
	}

	const onFilePick = async (type: string, data?: any, file?: File) => {
		if (!file) {
			return
		}
		setCurrentType(type)
		setFileUploading(true)

		const fileName = `${data.referenceId}_${type}`
		const fileUrl = await uploadFileToFirebaseStorage(
			file,
			`deposits/${type}/${fileName}`
		)
		if (fileUrl) {
			const data: { [key: string]: any } = {}
			data[`${type}Url`] = fileUrl
			await updateTxDocs({
				variables: {
					id: row?.id,
					urlData: data
				}
			})
			enqueueSnackbar("File uploaded successfully", {
				variant: "success"
			})
			refetch()
			if (type === "invoice" || type === "signedInvoice") {
				setInvoiceFileName(fileName)
			} else if (type === "proofOfPayment") {
				setProofOfPaymentFileName(fileName)
			}
			setFileUploading(false)
			setCurrentType("")
		}
	}

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)} p={10}>
			<Box mb={3}>
				<Typography variant="SPP_H6" color="secondary" mb={0.5}>
					Changing Status to
				</Typography>
				<ChipSelector
					sx={{ marginTop: "24px" }}
					listItem={
						featureType === "DEPOSIT"
							? baseStatusListForDeposits
							: featureType === "RR_SETTLEMENT"
								? baseStatusListForRRSettlement
								: baseStatusListForWithdrawals
					}
					selectedValue={selectedStatus}
					onChange={(v) => setValue("status", v)}
				/>
			</Box>
			<Grid container spacing={6}>
				<Grid item xs={6}>
					<Grid container spacing={6}>
						{selectedStatus.name !== "NEW" &&
							selectedStatus.name !== "CANCELLED" && (
								<Grid item xs={12}>
									{selectedStatus?.id === "REFUNDED" && (
										<>
											<Typography
												mb={2}
												variant="SPP_Body_2"
												color="secondary"
												textAlign="right"
											>
												Received Amount: {row?.amountReceived || 0}
											</Typography>
											<TextBox
												name={"refundedAmount"}
												label={"Refunded Amount"}
												register={register}
												placeholder={"Enter refunded amount"}
												helperText={errors?.refundedAmount?.message}
												error={!!errors?.refundedAmount?.message}
											/>
										</>
									)}
									{selectedStatus?.id === "RECEIVED" && (
										<>
											<Typography
												mb={2}
												variant="SPP_Body_2"
												color="secondary"
												textAlign="right"
											>
												Price: {row?.productPrice || 0}
											</Typography>
											<TextBox
												label="Received Amount"
												name="amountReceived"
												register={register}
												placeholder="Enter received amount"
												helperText={errors?.amountReceived?.message}
												error={!!errors?.amountReceived?.message}
												disabled={row?.status === "RECEIVED"}
											/>
										</>
									)}
									{selectedStatus?.id === "RETURNED" && (
										<TextBox
											label={"Returned Amount"}
											name={"amountReturned"}
											register={register}
											placeholder={"Enter returned amount"}
											helperText={errors?.amountReturned?.message}
											error={!!errors?.amountReturned?.message}
										/>
									)}
									{selectedStatus?.id === "PAID" && (
										<TextBox
											label={"Amount"}
											name={"withdrawalAmount"}
											register={register}
											placeholder={"Enter amount"}
											helperText={errors?.withdrawalAmount?.message}
											error={!!errors?.withdrawalAmount?.message}
										/>
									)}
									{selectedStatus?.id === "PAID" && (
										<TextBox
											sx={{ mt: 2 }}
											label={"Bank charges"}
											name={"bankCharges"}
											register={register}
											placeholder={"Enter bank charges"}
											helperText={errors?.bankCharges?.message}
											error={!!errors?.bankCharges?.message}
										/>
									)}
								</Grid>
							)}

						{selectedStatus.name !== "NEW" && (
							<Grid item xs={12}>
								{selectedStatus?.id === "RECEIVED" && (
									<DateSelector
										label="Amount Received Date"
										placeholder="Received Date"
										name="amountReceivedDate"
										control={control}
										helperText={errors?.amountReceivedDate?.message}
										error={!!errors?.amountReceivedDate?.message}
										textFieldProps={{ disabled: row?.status === "RECEIVED" }}
										isRequired
									/>
								)}
								{selectedStatus?.id === "CANCELLED" && (
									<DateSelector
										label="Cancelled Date"
										placeholder="Cancelled Date"
										name="cancelledDate"
										control={control}
										helperText={errors?.cancelledDate?.message}
										error={!!errors?.cancelledDate?.message}
										isRequired
										textFieldProps={{ disabled: row?.status === "CANCELLED" }}
									/>
								)}
								{selectedStatus?.id === "RETURNED" && (
									<DateSelector
										placeholder={"Return Date"}
										name={"dateReturned"}
										control={control}
										helperText={errors?.dateReturned?.message}
										error={!!errors?.dateReturned?.message}
										isRequired
									/>
								)}
								{selectedStatus?.id === "PAID" && (
									<DateSelector
										placeholder={"Date Paid"}
										name={"datePaid"}
										control={control}
										helperText={errors?.datePaid?.message}
										error={!!errors?.datePaid?.message}
										isRequired
									/>
								)}
								{selectedStatus?.id === "REFUNDED" && (
									<DateSelector
										placeholder={"Date Refunded"}
										name={"refundedDate"}
										control={control}
										helperText={errors?.refundedDate?.message}
										error={!!errors?.refundedDate?.message}
										isRequired
									/>
								)}
							</Grid>
						)}

						<Grid item xs={12}>
							<Button
								disabled={loading || watchStatus?.id === row?.status}
								type="submit"
								variant="contained"
							>
								Submit
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={6}>
					{featureType !== "RR_SETTLEMENT" && (
						<Box mt={2}>
							{invoiceFileName ? (
								<FileInfo
									url={
										featureType === "DEPOSIT"
											? row.signedInvoiceUrl
											: row.invoiceUrl
									}
									onDelete={() =>
										onDocDelete(
											featureType === "DEPOSIT" ? "signedInvoice" : "invoice"
										)
									}
									fileName={invoiceFileName}
								/>
							) : (
								<FileUploadActionButton
									variant="text"
									type={featureType === "DEPOSIT" ? "signedInvoice" : "invoice"}
									buttonText={
										featureType === "DEPOSIT"
											? "Upload Signed Invoice"
											: "Upload Invoice"
									}
									disabled={
										(currentType === "signedInvoice" ||
											currentType === "invoice") &&
										fileUploading
									}
									data={row}
									onFilePick={onFilePick}
								/>
							)}
						</Box>
					)}
					{featureType !== "RR_SETTLEMENT" && (
						<Box mt={2}>
							{proofOfPaymentFileName ? (
								<FileInfo
									url={row.proofOfPaymentUrl}
									fileName={proofOfPaymentFileName}
									onDelete={() => onDocDelete("proofOfPayment")}
								/>
							) : (
								<FileUploadActionButton
									variant="text"
									type="proofOfPayment"
									buttonText={
										featureType === "PAYOUT"
											? "Upload Payout Confirmation Receipt"
											: "Upload Proof Of Payment"
									}
									disabled={currentType === "proofOfPayment" && fileUploading}
									data={row}
									onFilePick={onFilePick}
								/>
							)}
						</Box>
					)}
				</Grid>
			</Grid>
		</Box>
	)
}

export default ActionTab
