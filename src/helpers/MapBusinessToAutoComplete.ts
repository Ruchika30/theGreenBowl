export const MapBusinessToAutoComplete = (
	business: any
): {
	id: string
	label: string
	name: string
	wallets: any
	merchant: any
	nickname: any
} => {
	const { id, name, merchant, businessWallets, nickname } = business
	return {
		id: id,
		name: `${name} (${merchant?.name})`,
		label: `${name} (${merchant?.name})`,
		nickname: nickname,
		wallets: businessWallets,
		merchant: merchant
	}
}
