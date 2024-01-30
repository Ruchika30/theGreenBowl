import { Box, Typography, IconButton } from "@mui/material"

import DeleteIcon from "@mui/icons-material/DeleteTwoTone"
import DownloadIcon from "@mui/icons-material/DownloadTwoTone"

type Props = {
	fileName: string
	onDelete: () => void
	url?: string
}

const FileInfo = ({ fileName, onDelete, url }: Props) => {
	return (
		<Box
			justifyContent={"space-between"}
			alignItems={"center"}
			display={"flex"}
		>
			<Typography variant={"SPP_H6"} color={"secondary"}>
				{fileName}
			</Typography>
			<Box display={"flex"} alignItems={"center"}>
				{url && (
					<IconButton
						onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
					>
						<DownloadIcon color="primary" />
					</IconButton>
				)}
				<IconButton onClick={onDelete}>
					<DeleteIcon color="primary" />
				</IconButton>
			</Box>
		</Box>
	)
}

export default FileInfo
