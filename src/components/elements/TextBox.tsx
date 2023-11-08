import { SetStateAction, useState } from "react"
import {
	Box,
	InputAdornment,
	Skeleton,
	TextField,
	Typography,
} from "@mui/material"

interface Props {
	name: string
	label?: string
	shrink?: boolean
	placeholder?: string
	endIcon?: JSX.Element
	startValue?: string
	endValue?: string
	inputText?: string
	loading?: boolean
	isEditing?: boolean
	register?: any
	helperText?: string
	isRequired?: boolean
	removeHelperText?: boolean
	fullWidth?: boolean
	height?: string
	width?: string
	padding?: string
	[key: string]: any
}

export default function TextBox({
	name,
	shrink = false,
	fullWidth = false,
	height,
	width,
	padding,
	label = "",
	placeholder = "",
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
	const [isFocused, setIsFocused] = useState(false)
	const [inputValue, setInputValue] = useState("")

	const handleInputChange = (event: {
		target: { value: SetStateAction<string> }
	}) => {
		setInputValue(event.target.value)
	}

	const handleFocus = () => {
		setIsFocused(true)
	}

	const handleBlur = () => {
		setIsFocused(false)
	}

	const getLabel = (label: string) => {
		return (
			<>
				{label && (
					<Typography mb={1} ml={1}>
						{label}
						{isRequired && (
							<Typography component="span" color="red">
								*
							</Typography>
						)}
					</Typography>
				)}
			</>
		)
	}

	return (
		<Box>
			{loading ? (
				<Skeleton variant="rounded" width={210} height={40} />
			) : (
				<TextField
					label={shrink ? getLabel(label!) : null}
					fullWidth
					placeholder={placeholder}
					name={name}
					margin="none"
					disabled={!isEditing}
					defaultValue={inputText}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleInputChange}
					sx={{
						"& .mui-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
							height: height || "1.4375em",
							padding: padding || "16.5px 14px",
							width: width || "211.5px",
						},
						"& .Mui-disabled > .MuiOutlinedInput-notchedOutline": {
							border: "none",
						},
						"& .MuiInputBase-input.Mui-disabled": {
							WebkitTextFillColor: "#000000",
						},
						"& .mui-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
							height: height || "1.4375em",
							padding: padding || "16.5px 14px",
						},
					}}
					InputProps={{
						shrink: shrink && (isFocused || inputValue) !== "",
						startAdornment: startValue ? (
							<InputAdornment position="start">{startValue}</InputAdornment>
						) : null,
						endAdornment: endIcon ? (
							<InputAdornment position="end">{endIcon}</InputAdornment>
						) : endValue ? (
							<InputAdornment position="end">{endValue}</InputAdornment>
						) : null,
					}}
					{...register(name)}
					helperText={helperText}
					{...rest}
				/>
			)}
		</Box>
	)
}
