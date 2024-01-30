export const MapUserToAutoComplete = (
	user: any,
	withdrawalType: string
): { id: string; label: string; name: string } => {
	const { id, username, firstName, lastName, name } = user

	return withdrawalType === "PAYOUT"
		? {
				id: id,
				name: `${firstName} ${lastName} (${username})`,
				label: `${firstName} ${lastName} (${username})`
			}
		: {
				id: id,
				name: `${name}`,
				label: `${name}`
			}
}
