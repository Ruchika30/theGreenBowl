import * as React from "react"
import {
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	FormControlLabel
} from "@mui/material"

interface IProps {
	options: any
	value?: any
	register?: any
	defaultValue?: string
	title: string
	name: string
}
export default function RadioComponent({
	defaultValue,
	options,
	register,
	title,
	value,
	name,
	...rest
}: IProps) {
	return (
		<>
			<FormControl>
				<FormLabel>{title}</FormLabel>
				<RadioGroup defaultValue={defaultValue} {...rest}>
					{options?.map((item: any) => {
						return (
							<FormControlLabel
								key={item.id}
								value={item.name}
								control={<Radio />}
								label={item.label}
								{...register(name)}
							/>
						)
					})}
				</RadioGroup>
			</FormControl>
		</>
	)
}
