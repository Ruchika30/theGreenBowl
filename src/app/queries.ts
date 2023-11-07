import { gql } from "@apollo/client"

export const FETCH_APP_ENUMS = gql`
	{
		currencies {
			code
			flagUrl
			name
			symbol
		}
	}
`
