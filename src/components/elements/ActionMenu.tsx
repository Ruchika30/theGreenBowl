import { Popover } from "@mui/material"

type Props = {
	width?: string
	children: React.ReactNode
	isOpen: boolean
	anchorElement: any | null
	onClose: () => void
	onSubmit: () => void
}

const ActionMenu = ({
	width = "452px",
	children,
	isOpen,
	anchorElement,
	onClose,
	onSubmit
}: Props) => {
	return (
		<Popover
			component="form"
			onSubmit={onSubmit}
			onClose={onClose}
			anchorEl={anchorElement}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left"
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "right"
			}}
			open={isOpen}
			sx={{
				"& .MuiPopover-paper": {
					width: width,
					borderRadius: "8px",
					boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.08)"
				}
			}}
		>
			{children}
		</Popover>
	)
}

export default ActionMenu
