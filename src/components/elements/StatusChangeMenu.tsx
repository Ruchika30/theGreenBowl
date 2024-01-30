import { useEffect, useState } from "react"

import { Box, Button, Divider } from "@mui/material"

import Typography from "@mui/material/Typography"
import ActionMenu from "@spp/components/elements/ActionMenu"
import ChipSelector, {
	ChipDataItem
} from "@spp/components/elements/ChipSelector"
import TextBox from "@spp/components/elements/TextBox"
import { useForm } from "react-hook-form"
import { StatusChangeMenuSchema } from "../../app/(dashboard)/deposits/validation"
import { yupResolver } from "@hookform/resolvers/yup"
import DateSelector from "@spp/components/elements/DateSelector"
import {
	getFileNameFromFirebaseDownloadUrl,
	uploadFileToFirebaseStorage
} from "@spp/helpers/Utils"
import FileInfo from "@spp/components/elements/FileInfo"
import FileUploadActionButton from "@spp/components/elements/FileUploadActionButton"
import { DocumentNode, useMutation } from "@apollo/client"
import { enqueueSnackbar } from "notistack"

type Props = {
	isOpen: boolean
	anchorElement: any | null
	onClose: () => void
	row: any
	featureType: string
	updateRecordQuery: DocumentNode
	updateTxDocsQuery: DocumentNode
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

const StatusChangeMenu = ({
	isOpen,
	anchorElement,
	onClose,
	row,
	featureType,
	updateRecordQuery,
	updateTxDocsQuery,
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
			refundedDate: new Date(),
			bankCharges: row?.bankCharges ?? row?.fromAccountBankCharges ?? 0
		}
	})

	const selectedStatus: { [key: string]: any } = watch("status")

	const [invoiceFileName, setInvoiceFileName] = useState<string | undefined>(
		undefined
	)
	const [proofOfPaymentFileName, setProofOfPaymentFileName] = useState<
		string | undefined
	>(undefined)
	const [updatingStatus, setUpdatingStatus] = useState<boolean>(false)
	const [fileUploading, setFileUploading] = useState<boolean>(false)
	const [currentType, setCurrentType] = useState<string>("")

	const [updateRecordStatus] = useMutation(updateRecordQuery)
	const [updateTxDocs] = useMutation(updateTxDocsQuery)

	useEffect(() => {
		if (featureType === "DEPOSIT" && row?.signedInvoiceUrl) {
			getFileNameFromFirebaseDownloadUrl(row?.signedInvoiceUrl)
				.then((fileName) => {
					setInvoiceFileName(fileName)
				})
				.catch(() => {
					enqueueSnackbar("Error getting file url", {
						variant: "error"
					})
				})
		}
		if (featureType != "DEPOSIT" && row.invoiceUrl) {
			getFileNameFromFirebaseDownloadUrl(row?.invoiceUrl)
				.then((fileName) => {
					setInvoiceFileName(fileName)
				})
				.catch(() => {
					enqueueSnackbar("Error getting file url", {
						variant: "error"
					})
				})
		}

		if (row?.proofOfPaymentUrl) {
			getFileNameFromFirebaseDownloadUrl(row?.proofOfPaymentUrl)
				.then((fileName) => {
					setProofOfPaymentFileName(fileName)
				})
				.catch(() => {
					enqueueSnackbar("Error getting file url", {
						variant: "error"
					})
				})
		}

		setValue("status", { id: row.status, name: row?.status })
		setValue("featureType", featureType)
		setValue("amountReceived", row.amountReceived || null)
		setValue(
			"amountReceivedDate",
			row?.amountReceivedDate
				? new Date(row?.amountReceivedDate)
				: row?.status === "RECEIVED"
				? new Date()
				: undefined
		)

		setValue("refundedAmount", row?.refundedAmount || null)
		setValue(
			"refundedDate",
			row?.refundedDate
				? new Date(row?.refundedDate)
				: row?.status === "REFUNDED"
				? new Date()
				: undefined
		)
		setValue(
			"cancelledDate",
			row?.cancelledDate
				? new Date(row?.cancelledDate)
				: row?.status === "CANCELLED"
				? new Date()
				: undefined
		)
		setValue("withdrawalAmount", row?.amount)
		setValue(
			"bankCharges",
			row?.bankCharges ?? row?.fromAccountBankCharges ?? 0
		)
		setValue(
			"datePaid",
			row?.datePaid
				? new Date(row?.datePaid)
				: row?.status === "PAID"
				? new Date()
				: undefined
		)
		setValue(
			"dateReturned",
			row?.dateReturned
				? new Date(row?.dateReturned)
				: row?.status === "RETURNED"
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

	const onSubmit = async (data: any) => {
		setUpdatingStatus(true)
		try {
			const {
				status,
				amountReceived,
				amountReceivedDate,
				refundedAmount,
				refundedDate,
				cancelledDate,
				datePaid,
				dateReturned,
				amountReturned,
				withdrawalAmount,
				bankCharges
			} = data

			const variables: { [key: string]: any } = {
				id: row?.id,
				status: status.name,
				cancelledDate
			}

			if (featureType === "DEPOSIT") {
				variables["amountReceived"] = amountReceived
				variables["amountReceivedDate"] = amountReceivedDate
				variables["refundedAmount"] = refundedAmount
				variables["refundedDate"] = refundedDate
			} else {
				variables["amount"] = withdrawalAmount
				variables["bankCharges"] = bankCharges
				variables["datePaid"] = datePaid
				variables["dateReturned"] = dateReturned
				variables["amountReturned"] = amountReturned
			}

			const result = await updateRecordStatus({
				variables
			})
			if (
				result?.data?.updateWithdrawalStatus?.status === "error" &&
				result?.data?.updateWithdrawalStatus?.message
			) {
				enqueueSnackbar(result?.data.updateWithdrawalStatus.message, {
					variant: "error"
				})
				setUpdatingStatus(false)
				return
			}
			if (!result) {
				enqueueSnackbar("Error updating status", {
					variant: "error"
				})
				setUpdatingStatus(false)
				return
			}

			if (featureType === "DEPOSIT") {
				if (result.data?.[updateRecordQueryKey]?.data?.status === status.name) {
					enqueueSnackbar("Status updated successfully", {
						variant: "success"
					})

					onClose()
				}
			} else {
				if (result.data?.[updateRecordQueryKey]?.data?.status === status.name) {
					enqueueSnackbar("Status updated successfully", {
						variant: "success"
					})

					onClose()
				}
			}
		} catch (e) {
			enqueueSnackbar("Error updating status", {
				variant: "error"
			})
		}
		setUpdatingStatus(false)
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
		<ActionMenu
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}
			anchorElement={anchorElement}
			isOpen={isOpen}
		>
			<Box sx={{ padding: "42px 42px 24px 42px" }}>
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
					selectedValue={selectedStatus as ChipDataItem}
					onChange={(v) => setValue("status", v!)}
				/>
			</Box>
			<Divider />
			<Box sx={{ padding: "24px 42px 42px 42px" }}>
				{selectedStatus.name !== "NEW" &&
					selectedStatus.name !== "CANCELLED" && (
						<>
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
										Price: {row.productPrice || 0}
									</Typography>

									<TextBox
										label={"Received Amount"}
										name={"amountReceived"}
										register={register}
										autoFocus={true}
										placeholder={"Enter received amount"}
										helperText={errors?.amountReceived?.message}
										error={!!errors?.amountReceived?.message}
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
						</>
					)}
				<Box mt={2}>
					{selectedStatus.name !== "NEW" && (
						<>
							{selectedStatus?.id === "RECEIVED" && (
								<DateSelector
									placeholder={"Received Date"}
									name={"amountReceivedDate"}
									control={control}
									helperText={errors?.amountReceivedDate?.message}
									error={!!errors?.amountReceivedDate?.message}
									isRequired
								/>
							)}
							{selectedStatus?.id === "CANCELLED" && (
								<DateSelector
									placeholder={"Cancelled Date"}
									name={"cancelledDate"}
									control={control}
									helperText={errors?.cancelledDate?.message}
									error={!!errors?.cancelledDate?.message}
									isRequired
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
						</>
					)}
				</Box>
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
								type={featureType === "DEPOSIT" ? "signedInvoice" : "invoice"}
								buttonText={
									featureType === "DEPOSIT"
										? "Upload Signed Invoice"
										: "Upload Invoice"
								}
								data={row}
								fullWidth
								onFilePick={onFilePick}
								disabled={
									(currentType === "signedInvoice" ||
										currentType === "invoice") &&
									fileUploading
								}
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
								type="proofOfPayment"
								buttonText={
									featureType === "PAYOUT"
										? "Upload Payout Confirmation Receipt"
										: "Upload Proof Of Payment"
								}
								fullWidth
								data={row}
								onFilePick={onFilePick}
								disabled={currentType === "proofOfPayment" && fileUploading}
							/>
						)}
					</Box>
				)}
				<Box mt={2}>
					<Button
						disabled={updatingStatus}
						type="submit"
						fullWidth
						variant="contained"
					>
						Submit
					</Button>
				</Box>
			</Box>
		</ActionMenu>
	)
}

export default StatusChangeMenu
