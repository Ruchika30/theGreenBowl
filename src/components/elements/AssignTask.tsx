import { Box, Typography, Chip, Button } from "@mui/material"

import AssignTaskMenu from "@spp/components/elements/AssignTaskMenu"
import RoleToString from "@spp/helpers/RoleToString"

import { useState } from "react"

type Props = {
	row: { [key: string]: any }
	isDeposit: boolean
	refetch: () => void
}

const AssignTask = ({ row, isDeposit, refetch }: Props) => {
	// const [data, setData] = useState<any>({})
	const [anchorElement, setAnchorElement] = useState<any | null>(null)

	const onAssignTaskMenuClose = () => {
		setAnchorElement(null)
		refetch()
	}

	const openAssignTaskMenu = (event: any) => {
		setAnchorElement(event.currentTarget)
	}

	// useEffect(() => {
	//     setData(row)
	// }, [row]);

	const taskId = row?.tasks?.[0]?.id
	const assignedUser = row?.tasks?.[0]?.assignedToUser?.[0]

	return (
		<>
			<Box
				onClick={(e) => openAssignTaskMenu(e)}
				display="flex"
				flexDirection="column"
				alignItems="flex-start"
				sx={{ cursor: "pointer" }}
			>
				{taskId ? (
					<>
						<Typography variant="SPP_Body_1" color="secondary">
							{assignedUser?.name}
						</Typography>
						<Chip
							size="small"
							variant="filled"
							label={RoleToString({ role: assignedUser?.userType }).text}
						/>
					</>
				) : (
					<Button onClick={(e) => openAssignTaskMenu(e)}>Assign</Button>
				)}
			</Box>
			<AssignTaskMenu
				isDeposit={isDeposit}
				internalId={row?.internalId}
				txId={row?.id}
				taskId={taskId}
				assigneeId={assignedUser?.id}
				anchorElement={anchorElement}
				onClose={onAssignTaskMenuClose}
				isOpen={Boolean(anchorElement)}
				fromAccountId={row?.fromAccountId}
			/>
		</>
	)
}

export default AssignTask
