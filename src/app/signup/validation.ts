import * as yup from "yup"

export const SignUpSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid Email")
		.required("Please enter your email"),
	password: yup.string().required("Please enter your password"),
	role: yup.string().required("Please select your role"),
	industry: yup.string().required("Please select your industry"),
	legalCompanyName: yup.string().required("Please enter your company name"),
	companyRegistrationNumber: yup
		.string()
		.required("Please enter your company registration number"),
	companyAddress: yup.string().required("Please enter your company address"),
	companyWebsite: yup.string().required("Please enter your company website"),
	primaryContactName: yup
		.string()
		.required("Please enter your primary contact name"),
	companyNickname: yup.string().required("Please enter your company nickname"),
	referralPartner: yup.string().required("Please enter your referral partner"),
	regionsTargeted: yup.array().min(1, "At least one value is required"),
	currenciesRequired: yup.array().min(1, "At least one value is required"),
})
