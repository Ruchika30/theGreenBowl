import {
	Box,
	CircularProgress,
	IconButton,
	Menu,
	MenuItem,
	Tooltip
} from "@mui/material"
import FileUploadActionButton from "./FileUploadActionButton"
import ViewDetails from "@mui/icons-material/VisibilityTwoTone"
import InvoiceIcon from "@mui/icons-material/ReceiptLongTwoTone"
import SignedInvoiceIcon from "@mui/icons-material/HistoryEduTwoTone"
import ProofOfPaymentIcon from "@mui/icons-material/RequestPageTwoTone"
import MoreMenu from "@mui/icons-material/MoreHorizTwoTone"
import { uploadFileToFirebaseStorage } from "@spp/helpers/Utils"
import { enqueueSnackbar } from "notistack"
import { useState } from "react"
import { DocumentNode, useApolloClient, useMutation } from "@apollo/client"
import { GENERATE_REFERENCE_ID } from "@spp/common/queries"
import { usePathname } from "next/navigation"
import NavLink from "next/link"

type Props = {
	row: { [key: string]: any }
	featureType: string | null
	updateDocsInDbQuery: DocumentNode
	updateDocsInDbQueryKey: string
	duplicateRecordQuery: DocumentNode
	duplicateRecordQueryKey: string
	duplicateRecordKeys: { id: string; value: string | null }[]
	refetch: () => void
}

const TableActions = ({
	row,
	featureType,
	updateDocsInDbQuery,
	updateDocsInDbQueryKey,
	duplicateRecordQuery,
	duplicateRecordQueryKey,
	duplicateRecordKeys,
	refetch
}: Props) => {
	const pathname = usePathname()

	const [loading, setLoading] = useState(false)
	const [actionType, setActionType] = useState<string | null>(null)
	const [anchorElement, setAnchorElement] = useState<any | null>(null)
	//const [row, setRow] = useState<{[key: string]: any;}>({})
	const apolloClient = useApolloClient()

	const [updateDocs] = useMutation(updateDocsInDbQuery)
	const [duplicateRecord] = useMutation(duplicateRecordQuery)

	// useEffect(() => {
	//     console.log("update called")
	//     setRow(rowData)
	// }, [rowData]);

	const updateDocsInDb = async (
		id: string,
		data: { [key: string]: any },
		type: string
	) => {
		const updateResult = await updateDocs({
			variables: {
				id,
				urlData: data
			}
		})

		if (!updateResult) {
			enqueueSnackbar(`Error uploading document`, {
				variant: "error"
			})
		}

		if (updateResult.data[updateDocsInDbQueryKey][`${type}Url`] != null) {
			enqueueSnackbar(`Document uploaded successfully`, {
				variant: "success"
			})
			refetch()
		} else {
			enqueueSnackbar(`Error uploading document`, {
				variant: "error"
			})
		}
	}

	const duplicateRecordInDb = async (row: any) => {
		const variables: { [key: string]: any } = {}

		duplicateRecordKeys.forEach((record) => {
			if (record.value) {
				variables[record.id] = record.value
			} else {
				variables[record.id] = row[record.id]
			}
		})

		const refIdData = await apolloClient.query({
			query: GENERATE_REFERENCE_ID,
			variables: {
				parentBusinessId: row.parentBusinessId,
				type: featureType === "DEPOSIT" ? "DEPOSIT" : "WITHDRAWAL"
			}
		})

		if (!refIdData) {
			enqueueSnackbar(`Error duplicating record`, {
				variant: "error"
			})
		}

		variables.referenceId = refIdData.data.generateReferenceIds[0].result

		const duplicateResult = await duplicateRecord({
			variables
		})

		if (!duplicateResult) {
			enqueueSnackbar(`Error duplicating record`, {
				variant: "error"
			})
		}

		if (duplicateResult.data[duplicateRecordQueryKey]?.id) {
			enqueueSnackbar(`Record duplicated successfully`, {
				variant: "success"
			})
			refetch()
		} else {
			enqueueSnackbar(`Error duplicating record`, {
				variant: "error"
			})
		}
	}

	const openFilesInNewTab = (url: string) => {
		window.open(url, "_blank", "noopener,noreferrer")
	}

	const onFileChange = async (type: string, row: any, fileObj?: File) => {
		try {
			if (!fileObj) {
				return
			}
			setActionType(type)
			setLoading(true)
			const filePath = `deposits/${type}/${row?.referenceId}_${type}`
			const url = await uploadFileToFirebaseStorage(fileObj, filePath)
			if (url) {
				const data: { [key: string]: any } = {}
				data[`${type}Url`] = url
				await updateDocsInDb(row?.id!, data, type)
			}
		} catch (e) {
			console.log(e)
			enqueueSnackbar("Error uploading file. Please try again.", {
				variant: "error"
			})
		} finally {
			setLoading(false)
			setActionType(null)
		}
	}

	const onActionMenuClose = async (type?: string, row?: any) => {
		try {
			if (type === "duplicate") {
				setActionType(type)
				setLoading(true)
				await duplicateRecordInDb(row)
			}
		} catch (e) {
			console.log(e)
			enqueueSnackbar(`Error duplicating ${featureType}`, {
				variant: "error"
			})
		} finally {
			setLoading(false)
			setActionType(null)
			setAnchorElement(null)
		}
	}

	return (
		<Box display={"flex"} flexWrap={"wrap"}>
			<Tooltip title="View Details">
				<IconButton component={NavLink} href={`${pathname}/view?id=${row.id}`}>
					<ViewDetails color="primary" />
				</IconButton>
			</Tooltip>
			{featureType !== "RR_SETTLEMENT" && (
				<Tooltip
					title={
						featureType === "DEPOSIT"
							? "Download Invoice"
							: featureType === "PAYOUT"
								? "Download Payout Request Form"
								: "Download Settlement Request Form"
					}
				>
					<IconButton
						LinkComponent={NavLink}
						href={
							featureType === "DEPOSIT"
								? `${pathname}/invoice?id=${row.id}`
								: `${pathname}/request-form?id=${row.id}`
						}
					>
						<InvoiceIcon color="primary" />
					</IconButton>
				</Tooltip>
			)}
			{(featureType === "DEPOSIT" && row.signedInvoiceUrl) ||
			(featureType !== "DEPOSIT" && row.invoiceUrl) ? (
				<Tooltip
					title={
						featureType === "DEPOSIT"
							? "Download Signed Invoice"
							: "Download Invoice"
					}
				>
					<IconButton onClick={() => openFilesInNewTab(row?.signedInvoiceUrl)}>
						<SignedInvoiceIcon color="primary" />
					</IconButton>
				</Tooltip>
			) : (
				<FileUploadActionButton
					type={featureType === "DEPOSIT" ? "signedInvoice" : "invoice"}
					data={row}
					onFilePick={onFileChange}
					withTooltip
					tooltipTitle={
						featureType === "DEPOSIT"
							? "Upload Signed Invoice"
							: featureType === "PAYOUT"
								? "Upload Payout Invoice"
								: "Upload Settlement Invoice"
					}
					withIconButton
					loading={
						loading &&
						(actionType === "signedInvoice" || actionType === "invoice")
					}
					buttonIcon={<SignedInvoiceIcon color="primary" />}
				/>
			)}
			{row.proofOfPaymentUrl ? (
				<Tooltip
					title={
						featureType === "PAYOUT"
							? "Download Payout Confirmation Receipt"
							: "Download Proof Of Payment"
					}
				>
					<IconButton onClick={() => openFilesInNewTab(row?.proofOfPaymentUrl)}>
						<ProofOfPaymentIcon color="primary" />
					</IconButton>
				</Tooltip>
			) : (
				<FileUploadActionButton
					type="proofOfPayment"
					data={row}
					onFilePick={onFileChange}
					withTooltip
					tooltipTitle={
						featureType === "PAYOUT"
							? "Upload Payout Confirmation Receipt"
							: "Upload Proof Of Payment"
					}
					withIconButton
					loading={loading && actionType === "proofOfPayment"}
					buttonIcon={<ProofOfPaymentIcon color="primary" />}
				/>
			)}
			<IconButton
				onClick={(e) => {
					setAnchorElement(e.currentTarget)
					setActionType("actionMenu")
				}}
			>
				<MoreMenu color="primary" />
			</IconButton>
			<Menu
				anchorEl={anchorElement}
				open={actionType === "actionMenu"}
				onClose={() => onActionMenuClose()}
			>
				<MenuItem onClick={() => onActionMenuClose("dispute", row)}>
					Raise A Dispute
				</MenuItem>
				{featureType !== "RR_SETTLEMENT" && (
					<MenuItem onClick={() => onActionMenuClose("duplicate", row)}>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							Duplicate
							{loading && actionType === "actionMenu" && (
								<CircularProgress size={20} color="primary" />
							)}
						</Box>
					</MenuItem>
				)}
			</Menu>
		</Box>
	)
}

export default TableActions
