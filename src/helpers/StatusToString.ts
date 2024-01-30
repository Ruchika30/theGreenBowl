interface Props {
	status: string
}

export default function StatusToString({ status }: Props) {
	if (status === "NEW") {
		return {
			text: "New",
			color: "#0288d1"
		}
	} else if (status === "PAID") {
		return {
			text: "Paid",
			color: "#008000"
		}
	} else if (status === "RECEIVED") {
		return {
			text: "Received",
			color: "#764CC3"
		}
	} else if (status === "CANCELLED") {
		return {
			text: "Cancelled",
			color: "#d32f2f"
		}
	} else if (status === "REFUNDED") {
		return {
			text: "Refunded",
			color: "#ed6c02"
		}
	} else if (status === "RETURNED") {
		return {
			text: "Returned",
			color: "#ed6c02"
		}
	} else if (status === "ASSIGNED") {
		return {
			text: "Assigned",
			color: "#0288d1"
		}
	} else if (status === "PROCESSING") {
		return {
			text: "Processing",
			color: "#ed6c02"
		}
	} else if (status === "FAILED") {
		return {
			text: "Failed",
			color: "#d32f2f"
		}
	} else if (status === "VERIFIED") {
		return {
			text: "Verified",
			color: "#8bc34a"
		}
	} else if (status === "UNVERIFIED") {
		return {
			text: "Unverified",
			color: "#ef5350"
		}
	} else if (status === "ACTIVATED") {
		return {
			text: "Active",
			color: "#8bc34a"
		}
	} else if (status === "INACTIVATED") {
		return {
			text: "Inactive",
			color: "#ef5350"
		}
	} else if (status === "COMPLETED") {
		return {
			text: "Completed",
			color: "default"
		}
	}
	return {
		text: "",
		color: "default"
	}
}
