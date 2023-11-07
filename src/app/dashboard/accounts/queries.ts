import { gql } from "@apollo/client"

export const FETCH_ALL_BANK_ACCOUNT_DETAILS = gql`
	query (
		$limit: Int! = 10
		$offset: Int! = 0
		$order_by: [AccountSort!]
		$where: AccountWhere
	) {
		accounts(
			options: { sort: $order_by, limit: $limit, offset: $offset }
			where: $where
		) {
			id
			name
			accountNumber
			bankCharges
			currency
			bank {
				id
				name
				nickname
				swiftCode
			}
			nickname
		}
		accountsAggregate {
			count
		}
	}
`
