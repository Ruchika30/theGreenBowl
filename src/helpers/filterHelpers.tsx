import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

import { ReadonlyURLSearchParams } from "next/navigation"

import { isSafeArray } from "./Utils"

import format from "date-fns/format"
import isValid from "date-fns/isValid"

export const getUrlToFieldsObject = (
	params: ReadonlyURLSearchParams | null
) => {
	const tempParams = new URLSearchParams(params?.toString())
	// remove table pagination values
	tempParams.delete("rows")
	tempParams.delete("page")

	if (tempParams) {
		const tempObject: {
			[key: string]: string | string[] | boolean | number | Date | null
		} = {}
		tempParams.forEach((_, key) => {
			const tempValue = tempParams
				?.getAll(key)
				.filter((val) => val.trim() !== "")
			if (tempValue.length > 1) {
				tempObject[key] = tempValue
			} else if (tempValue.length === 1) {
				if (tempValue[0].includes("-") && isValid(new Date(tempValue[0]))) {
					tempObject[key] = new Date(tempValue[0])
				} else if (!isNaN(Number(tempValue[0]))) {
					tempObject[key] = Number(tempValue)
				} else if (tempValue[0].toLowerCase() === "true") {
					tempObject[key] = true
				} else if (tempValue[0].toLowerCase() === "false") {
					tempObject[key] = false
				} else if (typeof tempValue[0] === "string") {
					tempObject[key] = tempValue[0]
				} else {
					tempObject[key] = null
				}
			}
		})

		return tempObject
	}
}

export const updateUrlFromObject = (
	router: AppRouterInstance,
	pathname: string | null,
	filter: any
) => {
	const newParams = new URLSearchParams("") // overrides old params

	Object.keys(filter).map((key: string) => {
		if (
			filter[key] !== "" &&
			filter[key] !== null &&
			filter[key] !== undefined
		) {
			if (isSafeArray(filter[key])) {
				filter[key].map((val: any) => {
					if (val instanceof Date) {
						// converts dates to strings
						newParams.append(key, format(val, "yyyy-MM-dd"))
					} else if (typeof val === "object" && val?.name) {
						newParams.append(key, val?.name)
					} else if (typeof val === "object" && val?.id) {
						newParams.append(key, val?.id)
					} else if (
						typeof val === "string" ||
						typeof val === "number" ||
						typeof val === "boolean"
					) {
						newParams.append(key, val.toString())
					} else {
						console.error("Unexpected type value in filter array object", val)
					}
				})
			} else if (filter[key] instanceof Date) {
				// converts dates to strings
				newParams.set(key, format(filter[key], "yyyy-MM-dd"))
			} else if (
				typeof filter[key] === "object" &&
				filter[key]?.id &&
				isNaN(filter[key]?.id)
			) {
				newParams.set(key, filter[key]?.id)
			} else if (typeof filter[key] === "object" && filter[key]?.name) {
				newParams.set(key, filter[key]?.name)
			} else if (
				typeof filter[key] === "string" ||
				typeof filter[key] === "number" ||
				typeof filter[key] === "boolean"
			) {
				newParams.set(key, filter[key])
			} else {
				console.error(
					"Unexpected type value in filter object",
					filter[key],
					key
				)
			}
		}
	})

	router.push(pathname + "?" + newParams.toString())
}
