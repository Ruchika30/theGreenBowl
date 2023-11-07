"use client"

import React from "react"

import { Box, Typography } from "@mui/material"

import { DataGrid, GridColDef } from "@mui/x-data-grid"

import { Constants } from "@spp/constants/constants"
import PageHeader from "@spp/fragments/PageHeader"

import dynamic from "next/dynamic"

const NewAccountDialog = dynamic(() => import("./new-account-dialog"))

interface Props {
	accounts: any
}

const columns: GridColDef[] = [
	{
		headerName: "Account Number / IBAN",
		field: "accountNumber",
		sortable: true,
		flex: 1,
	},
	{
		headerName: "Nickname",
		field: "nickname",
		sortable: true,
		flex: 1,
	},
	{
		headerName: "Account Name",
		field: "name",
		sortable: true,
		flex: 1,
	},
	{
		headerName: "SWIFT Code",
		field: "swiftCode",
		sortable: true,
		flex: 1,
	},
	{
		headerName: "Currency",
		field: "currency",
		sortable: false,
		flex: 1,
	},
	{
		headerName: "Bank",
		field: "bankName",
		sortable: false,
		flex: 1,
		renderCell: ({ row }) => {
			return (
				<Typography color="primary" variant="SPP_Body_1" fontWeight={700}>
					{row?.bankName}
				</Typography>
			)
		},
	},
]

export default function AccountsList({ accounts }: Props) {
	const [isAddingAccount, setIsAddingAccount] = React.useState(false)

	return (
		<Box p={Constants.CONTAINER_PADDING}>
			<PageHeader
				title="Accounts"
				actionButtons={[
					{
						label: "Add New Bank",
						onClick: () => console.log("Add Bank"),
					},
					{
						label: "Add New Account",
						onClick: () => setIsAddingAccount(true),
					},
				]}
			/>

			<Box mt={6}>
				<DataGrid
					rowHeight={60}
					columns={columns}
					autoHeight={true}
					hideFooter={true}
					rows={accounts}
					disableColumnFilter={true}
					hideFooterPagination={true}
					disableColumnSelector={true}
					disableColumnMenu={true}
					disableDensitySelector={true}
					disableRowSelectionOnClick={true}
					sortingMode="server"
					getRowSpacing={() => ({ top: 10, bottom: 10 })}
				/>
			</Box>

			<NewAccountDialog
				isAddingAccount={isAddingAccount}
				setIsAddingAccount={setIsAddingAccount}
			/>
		</Box>
	)
}
