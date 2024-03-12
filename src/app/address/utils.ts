export const isString = (value) => {
	const variable = value.trim()
	const stringRegex = /^[a-zA-Z\s]*$/

	return !!stringRegex.test(variable)
}

export const isNumber = (value) => {
	const variable = value.trim()
	const numberRegex = /^\d+$/

	return !!numberRegex.test(variable)
}

export const isValidAddress = (value) => {
	const variable = value.trim()
	const addressRegex = /^[a-zA-Z0-9\s., -]+$/

	return !!addressRegex.test(variable)
}
