export default function TextToSlug(text: string) {
	let value = text

	value = value.replaceAll(" ", "_")

	return value
}
