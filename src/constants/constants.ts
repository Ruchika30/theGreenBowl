export const Constants = {
	SOLUTIONS_NEEDED_LOWER_LIMIT: 20000,
	SOLUTIONS_NEEDED_UPPER_LIMIT: 100000,
	SOLUTIONS_NEEDED_STEP: 1000,
	SOLUTIONS_NEEDED_DEFAULT: 20000,
	MENU_DRAWER_WIDTH: 180,

	DRAWER_WIDTH: 320,
	DRAWER_MD_WIDTH: 240,
	DEBOUNCE_TIME: 100,
	CONTAINER_PADDING: { md: 2, lg: 4, xl: 10 },
	PER_PAGE_OPTIONS: [10, 20, 50, 100],
	SORTING_ORDERS: ["desc", "asc"],
	FEATURE_TYPES: ["DEPOSIT", "WITHDRAWAL"],
	MAX_FILTER_INPUT_STRING_LENGTH: 20,
	MAX_FILTER_SHOW_STRING_LENGTH: 10,
	ROLES: {
		SUPER_ADMIN: "SUPER_ADMIN",
		MERCHANT: "MERCHANT",
		SUB_ADMIN: "SUB_ADMIN"
	},

	DOC_TYPE: {
		PERSONAL: "personal",
		BUSINESS: "business"
	},
	DEFAULT_CURRENCIES: [
		{
			code: "USD",
			symbol: "$",
			name: "US Dollar"
		},
		{
			code: "EUR",
			symbol: "€",
			name: "Euro"
		},
		{
			code: "SGD",
			symbol: "S$",
			name: "Singapore Dollar"
		}
	],

	PERSONAL_DOCUMENT_TYPES: [
		{
			name: "Passport Back",
			enum: "PASSPORT_BACK"
		},
		{
			name: "Passport Front",
			enum: "PASSPORT_FRONT"
		},
		{
			name: "Bank Statement",
			enum: "BANK_STATEMENT"
		},
		{
			name: "Utility Bill",
			enum: "UTILITY_BILL"
		},
		{
			name: "Photo ID",
			enum: "PHOTO_ID"
		},
		{
			name: "Other",
			enum: "OTHER"
		}
	],
	BUSINESS_DOCUMENT_TYPES: [
		{
			name: "Incorporation Certificate",
			enum: "INCORPORATION_CERTIFICATE"
		},
		{
			name: "Share Holder Certificate",
			enum: "SHARE_HOLDER_CERTIFICATE"
		},
		{
			name: "Business Address Proof",
			enum: "BUSINESS_ADDRESS_PROOF"
		},
		{
			name: "Power of Attorney",
			enum: "POWER_OF_ATTORNEY"
		},
		{
			name: "Bank Statement",
			enum: "BANK_STATEMENT"
		},
		{
			name: "Memorandum Article of Association",
			enum: "MEMORANDUM_ARTICLE_OF_ASSOCIATION"
		},
		{
			name: "Other",
			enum: "OTHER"
		}
	],
	STATUS_LIST: [
		{
			id: "0",
			name: "PENDING"
		},
		{
			id: "1",
			name: "NEW"
		},
		{
			id: "2",
			name: "RECEIVED"
		},
		{
			id: "3",
			name: "REFUNDED"
		},
		{
			id: "4",
			name: "CANCELLED"
		}
	],
	WITHDRAWAL_STATUS_LIST: [
		{
			id: "NEW",
			name: "NEW"
		},
		{
			id: "PROCESSING",
			name: "PROCESSING"
		},
		{
			id: "PAID",
			name: "PAID"
		},
		{
			id: "CANCELLED",
			name: "CANCELLED"
		},
		{
			id: "RETURNED",
			name: "RETURNED"
		}
	],
	CUSTOMER_STATUS_LIST: [
		{
			id: "1",
			name: "UNVERIFIED"
		},
		{
			id: "0",
			name: "VERIFIED"
		}
	],
	TASK_STATUS_LIST: [
		{
			id: "1",
			name: "PENDING"
		},
		{
			id: "2",
			name: "COMPLETED"
		},
		{
			id: "3",
			name: "ASSIGNED"
		}
	],
	ACTIVITY_LOGS_TYPE: [
		{
			id: "3",
			name: "DEPOSIT"
		},
		{
			id: "4",
			name: "TASK"
		},
		{
			id: "5",
			name: "WITHDRAWAL"
		}
	],
	DEPOSITS_SPECIAL_FILTERS: [
		{
			id: "0",
			name: "B2B"
		},
		{
			id: "1",
			name: "C2B"
		},
		{
			id: "2",
			name: "ASSIGNED TO ME"
		}
	],
	TASKS_PRIORITY_LIST: [
		{
			id: "LOW",
			name: "LOW"
		},
		{
			id: "MEDIUM",
			name: "MEDIUM"
		},
		{
			id: "HIGH",
			name: "HIGH"
		}
	],
	TASKS_SPECIAL_FILTERS: [
		{
			id: "ASSIGNED TO ME",
			name: "ASSIGNED TO ME"
		}
	]
}
