import { TextField, TextFieldProps, Box, InputAdornment } from "@mui/material"

interface Props {
	label?: string
	rightEndtext?: string
	textInputProps?: TextFieldProps

}

export default function TextInput({ label, rightEndtext, textInputProps }: Props) {
	return (
		<>

			<Box sx={{ m: 1 }}>
				<TextField
					fullWidth
					label={label}
					variant="outlined"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								{rightEndtext}
							</InputAdornment>
						),
					}}
					{...textInputProps}
				/>
			</Box>
		</>


	)
}
