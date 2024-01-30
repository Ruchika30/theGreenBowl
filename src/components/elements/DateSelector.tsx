import { FormHelperText, Skeleton } from "@mui/material"

import { DatePicker } from "@mui/x-date-pickers"

import {
	Controller,
	FieldError,
	FieldErrors,
	FieldErrorsImpl,
	Merge
} from "react-hook-form"

interface Props {
	name: string
	label?: string
	control: any
	error?: boolean
	helperText?:
		| FieldErrors<any>
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined
	placeholder?: string
	loading?: boolean
	isEditing?: boolean
	isRequired?: boolean
	textFieldProps?: any
}

export default function DateSelector({
	name,
	label,
	error,
	control,
	helperText,
	placeholder,
	loading = false,
	isEditing = true,
	textFieldProps
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
							<DatePicker
								{...field}
								format="dd/MM/yyyy"
								disabled={!isEditing}
								slotProps={{
									actionBar: {
										actions: ["clear"]
									},
									textField: {
										margin: "none",
										fullWidth: true,
										error: error,
										label: label || "",
										placeholder: placeholder,
										sx: {
											"& .Mui-disabled > .MuiOutlinedInput-notchedOutline": {
												border: "none"
											},
											"& .Mui-disabled > .MuiInputAdornment-positionEnd": {
												display: "none"
											},
											"& .MuiInputBase-input.Mui-disabled": {
												WebkitTextFillColor: "#000000"
											}
										},
										...textFieldProps
									}
								}}
							/>
						)}
					/>

					<FormHelperText error={error ? true : false} sx={{ ml: 2 }}>
						{isEditing ? (helperText as string) : " "}
					</FormHelperText>
				</>
			)}
		</>
	)
}
