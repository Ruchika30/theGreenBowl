import { gql } from "@apollo/client"

export const FETCH_ALL_BUSINESSES = gql`
	query ($name: String) {
		businesses(
			options: { limit: 5 }
			where: { AND: [{ name_MATCHES: $name }, { status: VERIFIED }] }
		) {
			id
			name
			businessWallets {
				id
				balance
				currency
			}
		}
	}
`
