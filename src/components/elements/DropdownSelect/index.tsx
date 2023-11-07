import * as React from "react"
import { Select, FormHelperText, FormControl, MenuItem } from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"
import { ICurrencyExchange } from "@spp/app/dashboard/currencyExchange/currencyExchange"

import styles from "./style"

type IMenuItem = {
	id: number
	value: string
}

type IDropdownSelect = {
	menuList: IMenuItem[]
	label: string
	isRequired?: boolean
	control: ICurrencyExchange["control"]
}

export default function DropdownSelect({
	menuList,
	label,
	isRequired = false,
}: IDropdownSelect) {
	const [age, setAge] = React.useState("")
	const { CustomInput, Asterisk } = styles

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value)
	}

	return (
		<FormControl
			sx={{
				width: "100%",
			}}
		>
			<Select
				value={age}
				onChange={handleChange}
				displayEmpty
				inputProps={{ "aria-label": "Without label" }}
				sx={{ height: "72px" }}
			>
				<MenuItem value="">{label}</MenuItem>
				<MenuItem value={10}>Ten</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem>
			</Select>
			<FormHelperText></FormHelperText>
		</FormControl>
	)
}
