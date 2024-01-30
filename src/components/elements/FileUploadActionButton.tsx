import { Button, CircularProgress, IconButton, Tooltip } from "@mui/material"

type Props = {
	type: string
	data?: any
	onFilePick: (type: string, data: any, file?: File) => void
	withIconButton?: boolean
	withTooltip?: boolean
	tooltipTitle?: string
	buttonText?: string
	buttonIcon?: React.ReactNode
	fullWidth?: boolean
	loading?: boolean
	[key: string]: any
}

const FileUploadActionButton = ({
	type,
	data,
	onFilePick,
	buttonIcon,
	buttonText,
	fullWidth,
	tooltipTitle,
	withIconButton,
	withTooltip,
	loading,
	...rest
}: Props) => {
	const onFileSelect = (e: any) => {
		const fileObj: File =
			e.target.files && e.target.files.length > 0 && e.target.files[0]
		onFilePick(type, data, fileObj)
	}

	if (loading) {
		return <CircularProgress size={28} />
	}

	const fileInput = (
		<input
			hidden
			accept="application/pdf, image/*"
			type="file"
			value=""
			onChange={onFileSelect}
		/>
	)

	let finalButtonComponent = withButton(
		<>
			{buttonText}
			{fileInput}
		</>,
		{
			variant: "contained",
			fullWidth,
			component: "label",
			...rest
		}
	)

	if (withIconButton) {
		finalButtonComponent = IconButtonWrapper(
			<>
				{buttonIcon}
				{fileInput}
			</>,
			{
				component: "label",
				...rest
			}
		)
	}

	if (withTooltip) {
		finalButtonComponent = TooptipWrapper(finalButtonComponent, {
			title: tooltipTitle
		})
	}

	return finalButtonComponent
}

const IconButtonWrapper = (children: React.ReactNode, rest?: any) => {
	return <IconButton {...rest}>{children}</IconButton>
}

const TooptipWrapper = (children: React.ReactNode, rest?: any) => {
	return <Tooltip {...rest}>{children}</Tooltip>
}

const withButton = (children: React.ReactNode, rest?: any) => {
	return (
		<Button sx={{ textAlign: "center" }} {...rest}>
			{children}
		</Button>
	)
}

export default FileUploadActionButton
