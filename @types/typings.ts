import { ChipDataItem } from "@spp/components/elements/ChipSelector"

export type ActivityLogFilter = {
	logType: ChipDataItem
	createdAtFrom?: Date
	createdAtTo?: Date
}

export type AccountFilter = {
	name: string
	accountNumber: string
	swiftCode: string
	currencies: any
}
export type DepositFilter = {
	startDate: Date
	endDate: Date
	minAmount: number
	maxAmount: number
	status: {
		id: string
		name: string
	}
	currencies: any
	otherFilters: any
	business: any
}

export type MerchantFilter = {
	name?: string
	email?: string
}

export type CustomerFilter = {
	status: string
	name: string
	username: string
}

export type TaskFilter = {
	startDate?: Date
	endDate?: Date
	title?: string
	status?: ChipDataItem
	priority?: ChipDataItem
	type?: any
}

export type AuthUserData = {
	name: null
	email: string
	userId: string
	userType: string
	dashboardView: boolean
	depositView: boolean
	depositCreate: boolean
	withdrawalView: boolean
	withdrawalCreate: boolean
	taskView: boolean
	taskCreate: boolean
	customerView: boolean
	customerCreate: boolean
	userView: boolean
	userCreate: boolean
	mailboxView: boolean
	mailboxCreate: boolean
	merchantView: boolean
	merchantCreate: boolean
	accountView: boolean
	accountCreate: boolean
	activityLogView: boolean
	activityLogCreate: boolean
	settingsView: boolean
	settingsCreate: boolean
	NO_CHECK: undefined
}

export type BaseCommission = DefaultBaseCommission & {
	usesDefault: boolean
	defaultBaseCommission: DefaultBaseCommission
}

export type MaintenanceFee = DefaultMaintenanceFee & {
	usesDefault: boolean
	defaultMaintenanceFee: DefaultMaintenanceFee
}
export type PayoutFee = DefaultPayoutFee & {
	usesDefault: boolean
	defaultPayoutFee: DefaultPayoutFee
}
export type OverDraftLimit = DefaultOverDraftLimit & {
	usesDefault: boolean
	defaultOverDraftLimit: DefaultOverDraftLimit
}
export type JoiningFee = DefaultJoiningFee & {
	usesDefault: boolean
	defaultJoiningFee: DefaultJoiningFee
}

export type RollingReserveFee = DefaultRollingReserveFee & {
	usesDefault: boolean
	defaultRollingReserveFee: DefaultRollingReserveFee
}

export type CurrencyConversionMarkup = {
	id: string
	forConversion: string
	adjustedRate: number
	autoAdjustMarkupToBaseRate: boolean
	usesDefault: boolean
	fee: number
	markup: number
	isFlatFee: boolean
	baseCurrencyConversionRate: BaseCurrencyConversionRate
	defaultCurrencyConversionMarkup: DefaultCurrencyConversionMarkup
}

export type DefaultBaseCommission = {
	id: string | undefined
	b2bFee: number
	c2bFee: number
}

export type DefaultMaintenanceFee = {
	id: string | undefined
	checkType: "ONLY_DEPOSIT" | "ONLY_DEPOSIT" | "DEPOSIT_OR_WITHDRAWAL" | "TOTAL"
	fee: number
	depositVolume: number
	withdrawalVolume: number
	totalVolume: number
}

export type DefaultOverDraftLimit = {
	id: string | undefined
	overDraftLimit: number
}

export type DefaultJoiningFee = {
	id: string | undefined
	fee: number
}

export type DefaultRollingReserveFee = {
	id: string | undefined
	percentage: number
	releaseDays: number
}

export type DefaultPayoutFee = {
	id: string | undefined
	//fee: number
	//isFlatFee: boolean
	feeFlat: number
	feePercentage: number
	currency: string
}

export type DefaultBusinessCurrencyConversionMarkup = {
	adjustedRate: number
	autoAdjustMarkupToBaseRate: boolean
	forConversion: string
	fee: number
	id: string
	isFlatFee: boolean
	markup: number
	baseCurrencyConversionRate: BaseCurrencyConversionRate
}

export type Aggregate = {
	aggregate: {
		sum: {
			amount: number
		}
	}
}

export type Currency = {
	code: string
	name: string
	symbol: string
	flagUrl: string
	createdAt: Date
	updatedAt: Date
}

export type MarketRegions = {
	name: string
	enumValue: string
}

export type BusinessType = {
	name: string
	enumValue: string
}

export type PersonalDocuments = {
	id: string
	name: string
	url: string
	type: string
}

export type BusinessWallet = {
	id: string
	nickname: string
	currency: string
	accounts: Account[]
	balance: number
	withdrawableRRBalance: number
	accountsAggregate: {
		count: number
	}
}

export type Beneficiary = {
	id: string
	beneficiaryName: string
	accountNumber: string
	currency: string
	accountType: string
	bankName: string
	swiftCode: string
	customer?: Customer
	merchant?: Merchant
	bankAddress: string
	beneficiaryAddress: string
	bankCountry: string
	beneficiaryCountry: string
	remarks?: string
	intermediaryBankName?: string
	intermediaryBankSwift?: string
	intermediaryBankAddress?: string
	intermediaryBankRemarks?: string
}

export type Merchant = {
	id: string
	name: string
	email: string
	firstName: string
	lastName: string
	country: string
	apiKey: string
	isApiKeyRequired: boolean
	isWhiteLabelRequired: boolean
	kycStatus: boolean

	personalDocuments: PersonalDocuments[]

	beneficiaries: Beneficiary[]

	businesses: Business[]

	createdAt: Date
	updatedAt: Date

	businessesAggregate: {
		count: number
	}
}

export type Bank = {
	id: string
	name: string
	nickname: string
	swiftCode: string
	address: string
	remarks: string
	createdAt: Date
	updatedAt: Date
}

export type IntermediaryAccount = {
	id: string
	bankName: string
	swiftCode: string
	currency: string
}

export type Account = {
	id: string
	name: string
	accountNumber: string
	nickname: string
	balance: number
	currency: string
	bankCharges: number
	swiftCode: string
	bankAddress: string
	beneficiaryAddress: string
	isDedicatedAccount: boolean
	isInternalAccount: boolean
	intermediaryAccounts: IntermediaryAccount[]
	bank: Bank
	createdAt: Date
	updatedAt: Date
}

export type Business = {
	id?: string
	name?: string
	nickname?: string
	registrationNumber?: string
	websiteBrand?: string
	contactNumber?: string
	phoneContact?: string
	businessTypes?: string
	status?: string
	primaryContactPersonPhone?: string
	primaryContactPersonName?: string
	primaryContactPersonEmail?: string
	primaryContactPerson?: string
	referralPartner?: string
	address?: string
	brands?: Brand[]
	teams?: Team[]
	businessWallets?: BusinessWallet[]
	businessCurrencyConversionMarkups: BusinessCurrencyConversionMarkup[]
	businessCurrencyConversionFees?: BusinessCurrencyConversionFees
}

export type BusinessCurrencyConversionMarkup = {
	id: string
	forConversion: string
	usesDefault: boolean
	adjustedRate: number
	markup: number
	autoAdjustMarkupToBaseRate: boolean
	fee: number
	isFlatFee: boolean

	baseCurrencyConversionRate: BaseCurrencyConversionRate
	defaultCurrencyConversionMarkup: DefaultCurrencyConversionMarkup
}

export type BaseCurrencyConversionRate = {
	id: string
	fromCurrency: string
	toCurrency: string
	baseRate: number
	autoUpdateBaseRate: boolean
}

export type DefaultCurrencyConversionMarkup = {
	id: string
	forConversion: string
	baseCurrencyConversionRate: BaseCurrencyConversionRate

	adjustedRate: number
	markup: number
	autoAdjustMarkupToBaseRate: boolean
	fee: number
	isFlatFee: boolean
}

export type Customer = {
	id: string
	firstName?: string
	lastName?: string
	email?: string
	username?: string
	phone?: string
	dateOfBirth?: Date
	address?: string
	idNumber?: string
	kycStatus?: string
	parentBrand?: Brand
	beneficiaries?: Beneficiary[]
	//country?: Country;
	personalDocuments?: PersonalDocuments[]
	createdAt: Date
	updatedAt: Date
}

export type Brand = {
	id?: string
	name?: string
	business?: Business
	teams?: Team[]
	featurePermissions?: FeaturePermission[]
	customers?: Customer[]
	createdBy?: User
	createdAt?: Date
	updatedAt?: Date
}

export type TeamMember = {
	id?: string
}

export type FeaturePermission = {
	id?: string
	featureType?: "DEPOSIT" | "WITHDRAWAL"
	brand?: Brand
	teams?: Team[]
	teamMembers?: TeamMember[]
	createdAt?: Date
	updatedAt?: Date
}

export type User = {
	id?: string
	firebaseId?: string
	name?: string
	email?: string
	userType?:
		| "SUPER_ADMIN"
		| "SUB_ADMIN"
		| "SUPER_MERCHANT"
		| "MERCHANT"
		| "PARTNER"
		| "TEAM_MEMBER"
	createdBy?: User

	usersCreated?: User[]
	teamsCreated?: Team[]
	businessesCreated?: Business[]
	brandsCreated?: Brand[]
	customersCreated?: Customer[]
}

export type Team = {
	id?: string
	name?: string
	teamMembers?: TeamMember[]
	featurePermissions?: FeaturePermission[]
	brands?: Brand[]
	customers?: Customer[]
	createdBy?: User
	createdAt?: Date
	updatedAt?: Date
	//data on edge
	featurePermissionsConnection?: TeamFeaturePermissionsConnection
}

export type TeamFeaturePermissionsConnection = {
	edges: TeamFeaturePermissionsRelationship[]
}

export type TeamFeaturePermissionsRelationship = {
	create?: boolean
	read?: boolean
	update?: boolean
	delete?: boolean
	node?: FeaturePermission
}

export type Country = {
	code?: string
	name?: string
}

export type CurrencyExchange = {
	id?: string
	conversionRate?: number
	fees?: number
	fromAmount?: number
	toAmount?: number
	parentBusiness?: Business
	fromBusinessWallet?: BusinessWallet
	toBusinessWallet?: BusinessWallet
	createdAt?: Date
	updatedAt?: Date
}

export type Adjustment = {
	id?: string

	amount?: number
	remarks?: string
	createdAt?: Date
	type?: string
	isCredit?: boolean
	otherType?: string
	businessWallet?: BusinessWallet
	parentBusiness?: Business
}

export type Deposit = {
	id?: string
	internalId?: string
	parentBusiness?: Business[]
	businessWallet?: BusinessWallet[]
	fromCustomer?: Customer[]
	productPrice?: number
	amountReceived?: number
	status?: string
	tasks?: Task[]
}

export type Task = {
	id?: string
	description?: string
	startDate?: Date
	tags?: string[]
	title?: string
	priority?: string
	endDate?: Date
	status?: string
}

export type Withdrawal = {
	id?: string
	internalId?: string
	parentBusiness?: Business[]
	businessWallet?: BusinessWallet[]
	toBeneficiary?: Beneficiary[]
	amount?: number
	currency?: string
	status?: string
	tasks?: Task[]
	fromAccount?: Account[]
}

export type DefaultCurrencyConversionFees = {
	id?: string
	flatFee?: number
	percentageFee?: number
	markupPercentage?: number
}

export type BusinessCurrencyConversionFees = {
	id?: string
	flatFee?: number
	percentageFee?: number
	markupPercentage?: number
	usesDefault?: boolean
	defaultCurrencyConversionFees?: DefaultCurrencyConversionFees
	business?: Business
}
