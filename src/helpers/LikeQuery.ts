export function LikeQuery(inputString: string) {
	const words = inputString
		.split(/\s+/)
		.map((word) => `.*${word}.*`)
		.join("|")

	return `(?i)(${words})`
}
