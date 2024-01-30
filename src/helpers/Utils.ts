import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ref, uploadBytes, getDownloadURL, getMetadata } from "firebase/storage"

import format from "date-fns/format"

export const handleChangePage = (
	val: number,
	router: AppRouterInstance,
	pathname: string,
	rowsPerPage: number
) => {
	if (val >= 1 && rowsPerPage > 10) {
		router.push(`${pathname}?page=${val}&rows=${rowsPerPage}`)
	} else if (val >= 1) {
		router.push(`${pathname}?page=${val}`)
	} else if (val === 0 && rowsPerPage > 10) {
		router.push(`${pathname}?&rows=${rowsPerPage}`)
	} else {
		router.push(`${pathname}`)
	}
}

export const handleChangeRowsPerPage = (
	e: any,
	router: AppRouterInstance,
	pathname: string
) => {
	if (e?.target?.value) {
		router.push(`${pathname}?rows=${e.target.value}`)
	} else {
		router.push(`${pathname}`)
	}
}

const getOrdinalSuffix = (dayNumber: number) => {
	const suffixes = ["th", "st", "nd", "rd"]
	const relevantDigits = dayNumber % 100

	return (
		suffixes[(relevantDigits - 20) % 10] ||
		suffixes[relevantDigits] ||
		suffixes[0]
	)
}

export const getFormattedDate = (dateString: Date) => {
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
	const date = new Date(dateString)

	const day = date.getDate()
	const suffix = getOrdinalSuffix(day)

	const formattedDate = date.toLocaleDateString("en-US", options)
	const formattedWithSuffix = formattedDate.replace(
		/\b\d+\b/,
		`${day}${suffix}`
	)

	const d = formattedWithSuffix.split(" ")
	return `${d[1]} ${d[0]} ${d[2]}`
}

export function uniqueArray(array: any[]) {
	const uniqueMap = new Map()

	array.forEach((item) => {
		if (!uniqueMap.has(item.id)) {
			uniqueMap.set(item.id, item)
		}
	})

	return Array.from(uniqueMap.values())
}

export const isSafeArray = (arr: any) => {
	return Array.isArray(arr) && arr.length
}

export const Value2FilterString = (value: any) => {
	if (typeof value === "string") {
		return value
	}
	if (typeof value === "number") {
		return Number.isInteger(value)
			? value.toString()
			: value.toFixed(2).toString()
	}
	if (typeof value === "boolean") {
		return value.toString()
	}
	if (value instanceof Date) {
		return format(value, "dd/MM/yyyy")
	}
	if (value?.length > 0) {
		return value.join(",")
	}
	if (typeof value === "object" && (value?.id || value?.name)) {
		return value?.name || value?.id
	}
	console.error("valueToFilterString: Unknown value type", value)

	return ""
}
