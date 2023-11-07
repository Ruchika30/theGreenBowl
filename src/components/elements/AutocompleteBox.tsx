import { Autocomplete, Box, Skeleton, TextField } from "@mui/material"

import { Controller } from "react-hook-form"

interface OptionType {
	name: string
	search: string
}

interface Props {
	label?: string
	loading: boolean
	options: OptionType[]
	name: string
	isEditing: boolean
	control: any
	setValue: any
	error: boolean
	value: any
	helperText?: string
	autoCompleteProps?: any
	isRequired?: boolean
}

export default function AutocompleteBox({
	label,
	loading,
	options,
	name,
	isEditing,
	control,
	setValue,
	error,
	value,
	helperText,
	autoCompleteProps,
	isRequired,
}: Props) {
	return (
		<Box>
			{loading ? (
				<Skeleton variant="rounded" width={210} height={40} />
			) : (
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<Autocomplete
							{...field}
							margin="none"
							options={options}
							disabled={!isEditing}
							{...autoCompleteProps}
							value={value || null}
							renderInput={(params) => (
								<TextField
									{...params}
									fullWidth
									sx={{
										"& .Mui-disabled > .MuiOutlinedInput-notchedOutline": {
											border: "none",
										},
										"& .Mui-disabled > .MuiAutocomplete-endAdornment": {
											display: "none",
										},
										"& .Mui-disabled > .MuiChip-root": {
											opacity: 1,
										},
										"& .Mui-disabled > .MuiInputBase-input": {
											display: "none",
										},
										"& .Mui-disabled > .MuiChip-deleteIcon": {
											display: "none",
										},
										"& .MuiInputBase-input.Mui-disabled": {
											WebkitTextFillColor: "#000000",
										},
									}}
									placeholder={autoCompleteProps?.placeholder}
									error={error}
								/>
							)}
							onInputChange={(_, newValue, reason) => {
								if (reason === "reset") {
									// We did this because reset was triggered when we set the value from the chip click event
									return
								}
								setValue(name, {
									name: newValue || "",
									search: newValue || "",
								})
							}}
							onChange={(_, newValue, reason) => {
								if (reason === "clear") {
									setValue(name, null)
								} else {
									if (autoCompleteProps.multiple) {
										setValue(name, [...newValue])
									} else {
										setValue(name, {
											...newValue,
											name: newValue?.name,
											search: newValue?.search,
										})
									}
								}
							}}
						/>
					)}
				/>
			)}
		</Box>
	)
}
