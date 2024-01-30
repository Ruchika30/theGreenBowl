import { InputAdornment, Skeleton, TextField } from "@mui/material"

import {
	FieldError,
	FieldErrors,
	FieldErrorsImpl,
	Merge
} from "react-hook-form"

interface Props {
	name: string
	endIcon?: JSX.Element
	startValue?: string
	endValue?: string
	inputText?: string
	loading?: boolean
	isEditing?: boolean
	register?: any
	helperText?:
		| FieldErrors<any>
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined
	isRequired?: boolean
	removeHelperText?: boolean
	[key: string]: any
	label?: string
}

export default function TextBox({
	name,
	endIcon,
	startValue,
	endValue,
	inputText,
	loading = false,
	isEditing = true,
	register,
	helperText,
	isRequired,
	removeHelperText = false,
	...rest
}: Props) {
	return (
		<>
			{loading ? (
				<Skeleton variant="rounded" width={210} height={40} />
			) : (
				<TextField
					name={name}
					margin="none"
					disabled={!isEditing}
					defaultValue={inputText}
					fullWidth
					sx={{
						// "& .Mui-disabled > .MuiOutlinedInput-notchedOutline": {
						// 	border: "none"
						// },
						"& .MuiInputBase-input.Mui-disabled": {
							WebkitTextFillColor: "#000000"
						}
					}}
					InputProps={{
						startAdornment: startValue ? (
							<InputAdornment position="start">{startValue}</InputAdornment>
						) : null,
						endAdornment: endIcon ? (
							<InputAdornment position="end">{endIcon}</InputAdornment>
						) : endValue ? (
							<InputAdornment position="end">{endValue}</InputAdornment>
						) : null
					}}
					{...register(name)}
					helperText={helperText}
					{...rest}
				/>
			)}
		</>
	)
}
