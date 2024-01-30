import { Box, Chip, FormHelperText, styled } from "@mui/material"
import {
	FieldError,
	FieldErrors,
	FieldErrorsImpl,
	Merge
} from "react-hook-form"

export type ChipDataItem = {
	id: string
	name: string
} | null

interface Props {
	selectedValue: ChipDataItem
	listItem: Array<ChipDataItem>
	onChange?: (v: ChipDataItem) => void
	helperText?:
		| FieldErrors<any>
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined
	error?: boolean
	multiSelect?: boolean
	disabled?: boolean
	[rest: string]: any
	isDeselecteable?: boolean
}

const SelectedChip = styled(Chip)(({ theme }) => ({
	marginRight: theme.spacing(2),
	marginBottom: theme.spacing(2),
	backgroundColor: theme.palette.primary.light,
	color: theme.palette.primary.dark,
	fontWeight: "bold",
	outline: `1px solid ${theme.palette.primary.main}`,
	"&:hover": {
		backgroundColor: theme.palette.primary.light
	}
}))

const UnSelectedChip = styled(Chip)(({ theme }) => ({
	marginRight: theme.spacing(2),
	marginBottom: theme.spacing(2),
	backgroundColor: "transparent",
	fontWeight: "600",
	outline: `1px solid ${theme.palette.outline.main}`,
	"&:hover": {
		backgroundColor: "transparent"
	}
}))

export default function ChipSelector({
	selectedValue,
	listItem = [],
	helperText,
	error,
	multiSelect = false,
	isDeselecteable = false,
	disabled = false,
	onChange,
	...rest
}: Props) {
	const handleSelect = (v: ChipDataItem) => {
		if (multiSelect) {
			if (Array.isArray(selectedValue) && onChange) {
				if (selectedValue.filter((e: any) => e.id === v?.id).length > 0) {
					// @ts-ignore
					onChange(selectedValue.filter((e: any) => e.id !== v.id))
				} else {
					// @ts-ignore
					onChange([v, ...selectedValue])
				}
			}
		} else {
			if (selectedValue?.id === v?.id && isDeselecteable && onChange) {
				onChange(null)
			} else if (onChange) {
				onChange(v)
			}
		}
	}

	return (
		<Box {...rest}>
			{listItem.map((item) => {
				let ChipType = UnSelectedChip

				if (multiSelect) {
					ChipType =
						// @ts-ignore
						selectedValue.filter((e: any) => e.id === item.id).length > 0
							? SelectedChip
							: UnSelectedChip
				} else {
					ChipType =
						selectedValue?.id === item?.id ? SelectedChip : UnSelectedChip
				}

				return (
					<ChipType
						key={item?.id}
						label={item?.name}
						onClick={() => handleSelect(item)}
						disabled={disabled}
					/>
				)
			})}

			<FormHelperText error={error ? true : false} sx={{ ml: 2 }}>
				{helperText as string}
			</FormHelperText>
		</Box>
	)
}
