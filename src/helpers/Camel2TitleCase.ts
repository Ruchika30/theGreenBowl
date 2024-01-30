function CamelCaseToWords(text: string) {
	return text
		.replace(/([A-Z])/g, " $1")
		.trim()
		.toLowerCase()
		.replace(/^\w/, (c) => c.toUpperCase())
}

export default CamelCaseToWords
