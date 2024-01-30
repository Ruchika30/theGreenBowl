import React from "react"
import { Chip } from "@mui/material"

import ClearIcon from "@mui/icons-material/Clear"

import CamelCaseToWords from "@spp/helpers/Camel2TitleCase"
import { Value2FilterString } from "@spp/helpers/Utils"

interface Props {
	onClose: (label: string) => void
	label: string
	value: any
}

function FilterChip({ label, value, onClose }: Props) {
	return (
		<Chip
			label={`Search ${CamelCaseToWords(label)}: ${Value2FilterString(value)}`}
			deleteIcon={<ClearIcon />}
			onDelete={() => onClose(label)}
			sx={{
				mr: 1,
				mb: 1
			}}
		/>
	)
}

export default FilterChip
