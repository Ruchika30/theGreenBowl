import {
	Box,
	FormHelperText,
	MenuItem,
	Skeleton,
	TextField,
	Typography
} from "@mui/material"

import {
	Controller,
	FieldError,
	FieldErrors,
	FieldErrorsImpl,
	Merge
} from "react-hook-form"

interface Props {
	label?: string
	name: string
	control?: any
	loading?: boolean
	options: any[]
	isEditing?: boolean
	error?: boolean
	setValue?: any
	helperText?:
		| FieldErrors<any>
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined
	isRequired?: boolean
	placeholder?: string
	startAdornment?: JSX.Element
}

export default function SelectBox({
	name,
	label,
	control,
	loading = false,
	isEditing = true,
	options,
	error,
	helperText,
	isRequired,
	placeholder = "",
	startAdornment,
	...rest
}: Props) {
	return (
		<>
			{loading ? (
				<Skeleton variant="rounded" width={210} height={40} />
			) : (
				<>
					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								margin="none"
								label={label || ""}
								disabled={!isEditing}
								fullWidth
								select={true}
								error={!!helperText}
								sx={{
									"& .Mui-disabled ~ fieldset": {
										border: "none"
									},
									"& .Mui-disabled ~ .MuiSvgIcon-root ": {
										fill: "transparent"
									},
									"& .MuiInputBase-input.Mui-disabled": {
										WebkitTextFillColor: "#000000"
									}
								}}
								SelectProps={{
									displayEmpty: label ? false : true,
									startAdornment: startAdornment,
									renderValue: (selected) => {
										if (selected?.length === 0) {
											return (
												<Box color="#999">
													{placeholder || "Select an option"}
												</Box>
											)
										}

										const selectedOption = options?.find(
											(option) => option?.id === selected
										)

										if (selectedOption) {
											return selectedOption?.name
										}

										return selected
									}
								}}
								{...rest}
							>
								{placeholder !== "" && options?.length > 0 && (
									<MenuItem disabled value="">
										<Typography>{placeholder}</Typography>
									</MenuItem>
								)}

								{options?.length > 0 ? (
									options?.map((data) => (
										<MenuItem key={data?.id} value={data?.id || data?.name}>
											{data?.name}
										</MenuItem>
									))
								) : (
									<MenuItem>
										<em>No input to select</em>
									</MenuItem>
								)}
							</TextField>
						)}
					/>

					<FormHelperText error={error ? true : false} sx={{ ml: 2 }}>
						{isEditing ? (helperText as string) : ""}
					</FormHelperText>
				</>
			)}
		</>
	)
}
