import { getClient } from "@spp/lib/client"
import { FETCH_ALL_BANK_ACCOUNT_DETAILS } from "./queries"

import AccountsList from "./accounts-list"

export default async function Accounts() {
	const { data } = await getClient().query({
		query: FETCH_ALL_BANK_ACCOUNT_DETAILS,
	})
	const accounts: any = []

	if (data?.accounts?.length > 0) {
		data?.accounts.forEach(
			({
				id,
				name,
				bank,
				currency,
				nickname,
				bankCharges,
				accountNumber,
			}: any) => {
				accounts.push({
					id,
					accountNumber: accountNumber,
					name: name,
					nickname: nickname,
					currency: currency,
					swiftCode: bank.swiftCode,
					bankCharges: bankCharges,
					bankId: bank.id,
					bankName: bank.name,
				})
			}
		)
	}

	return <AccountsList accounts={accounts} />
}
