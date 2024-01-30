import { Constants } from "@spp/constants/constants"

const SubStringer = (data: any) => {
	if (typeof data === "string")
		return data?.substring(0, Constants.MAX_FILTER_SHOW_STRING_LENGTH)
	else if (typeof data === "number")
		return data.toString().substring(0, Constants.MAX_FILTER_SHOW_STRING_LENGTH)
	else if (typeof data === "boolean") return data?.toString()
	return ""
}

export default SubStringer
