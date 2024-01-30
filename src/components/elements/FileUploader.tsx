import React from "react"

import {
	Box,
	Button,
	CircularProgress,
	FormHelperText,
	Typography
} from "@mui/material"

import {
	FieldError,
	FieldErrors,
	FieldErrorsImpl,
	Merge
} from "react-hook-form"

import { enqueueSnackbar } from "notistack"

import { FileUploadStatus } from "@spp/lib/FileUploadStatus"

interface Props {
	name: string
	disabled?: boolean
	error?: boolean
	buttonText?: string
	helperText?:
		| FieldErrors<any>
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined
	onSuccessUpload: (v: FileUploadResponse) => void
}

export type FileUploadResponse = {
	uid: string
	url: string
	name: string
	type: string
}

export default function FileUploader({
	name,
	error,
	buttonText,
	disabled,
	helperText,
	onSuccessUpload
}: Props) {
	const [percentage, setPercentage] = React.useState(0)
	const [isUploading, setIsUploading] = React.useState(false)
	const [_, setUploadReady] = React.useState<Boolean | null>(null)

	const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setIsUploading(true)

			const fileListObj: FileList | null = e.target.files

			if (fileListObj?.[0]) {
				const name = fileListObj[0].name
				const type = fileListObj[0].type
				const url = await FileUploadStatus(fileListObj[0], setPercentage)
				var uid = new Date().getTime().toString(36)

				onSuccessUpload({
					uid,
					url,
					name,
					type
				})

				setUploadReady(true)
			} else {
				enqueueSnackbar("Please select a file", {
					variant: "error"
				})
			}
		} catch (err) {
			enqueueSnackbar("Unable to uplaod the file", {
				variant: "error"
			})
		} finally {
			setIsUploading(false)
		}
	}

	return (
		<>
			<Box display="flex" alignItems="center">
				<Box mr={1}>
					<Button
						variant="contained"
						component="label"
						disableElevation
						size="small"
						disabled={isUploading || disabled}
					>
						{buttonText || "UPLOAD FILE"}
						<input
							hidden
							accept="image/*, application/pdf, application/msword"
							type="file"
							name={name}
							value=""
							onChange={handleOnChange}
						/>
					</Button>
				</Box>

				{isUploading && (
					<Box display="flex" alignItems="flex-end">
						<CircularProgress size={24} />
						<Typography ml={1}>{percentage}%</Typography>
					</Box>
				)}
			</Box>

			<FormHelperText error={error}>{helperText as string}</FormHelperText>
		</>
	)
}
