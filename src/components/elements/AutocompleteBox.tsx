import { Autocomplete, Box, Chip, Skeleton, TextField } from "@mui/material"

import {
	Controller,
	FieldError,
	FieldErrors,
	FieldErrorsImpl,
	Merge
} from "react-hook-form"

interface OptionType {
	name: string
	search: string
}

interface Props {
	label?: string
	loading?: boolean
	options: OptionType[]
	name: string
	isEditing?: boolean
	control: any
	setValue: any
	error: boolean
	value: any
	helperText?:
		| FieldErrors<any>
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined
	autoCompleteProps?: any
	isRequired?: boolean
	onSelect?: (value: any) => void
	onInputClear?: () => void
}

export default function AutocompleteBox({
	loading = false,
	options,
	name,
	isEditing = true,
	control,
	setValue,
	error,
	value,
	helperText,
	autoCompleteProps,
	onSelect,
	onInputClear,
	label
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
									label={label ?? ""}
									fullWidth
									sx={{
										"& .Mui-disabled > .MuiOutlinedInput-notchedOutline": {
											border: "none"
										},
										"& .Mui-disabled > .MuiAutocomplete-endAdornment": {
											display: "none"
										},
										"& .Mui-disabled > .MuiChip-root": {
											opacity: 1
										},
										"& .Mui-disabled > .MuiInputBase-input": {
											display: "none"
										},
										"& .Mui-disabled > .MuiChip-deleteIcon": {
											display: "none"
										},
										"& .MuiInputBase-input.Mui-disabled": {
											WebkitTextFillColor: "#000000"
										}
									}}
									placeholder={autoCompleteProps?.placeholder}
									error={!!error}
									helperText={helperText as string}
								/>
							)}
							renderTags={(
								value: { id: string; name: string }[],
								getTagProps
							) =>
								value.map(
									(option: { id: string; name: string }, index: number) => (
										// eslint-disable-next-line react/jsx-key
										<Chip
											variant="outlined"
											label={option.name}
											{...getTagProps({ index })}
										/>
									)
								)
							}
							onInputChange={(_, newValue: OptionType, reason) => {
								if (reason === "reset") {
									// We did this because reset was triggered when we set the value from the chip click event
									return
								}
								setValue(name, {
									...newValue,
									name: newValue || "",
									search: newValue || ""
								})
							}}
							onChange={(_, newValue: any, reason) => {
								if (autoCompleteProps.multiple && newValue != null) {
									setValue(name, [...newValue])
								} else {
									onSelect && onSelect(newValue)
									reason.includes("clear") && onInputClear && onInputClear()
									field.onChange(newValue)
								}
							}}
						/>
					)}
				/>
			)}
		</Box>
	)
}
