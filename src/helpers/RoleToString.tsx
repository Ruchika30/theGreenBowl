interface Props {
	role: string
}

export default function RoleToString({ role }: Props) {
	if (role === "SUPER_ADMIN") {
		return {
			text: "Super Admin",
			color: "#774CC2",
			textColor: "white"
		}
	} else if (role === "SUB_ADMIN") {
		return {
			text: "Sub Admin",
			color: "#774CC2",
			textColor: "white"
		}
	} else if (role === "MERCHANT") {
		return {
			text: "Merchant",
			color: "#3A72B4",
			textColor: "white"
		}
	} else if (role === "TEAM_MEMBER") {
		return {
			text: "Team Member",
			color: "#3A72B4",
			textColor: "white"
		}
	}

	return {
		text: "",
		color: "#774CC2",
		textColor: "white"
	}
}
