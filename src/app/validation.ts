import * as yup from "yup"

export const LogInSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid Email")
		.required("Please enter your email"),
	password: yup.string().required("Please enter your password"),
})

export const CurrencyExchangeSchema = yup.object().shape({
	fees: yup
		.number()
		.typeError('Please enter a valid number')
		.required('Number is required')
		.integer('Number must be an integer'),

	selectBusiness: yup
		.string()
		.typeError('Please enter a valid business value')
		.required('Number is required')
		.matches(/^[a-zA-Z\s]*$/, 'Only letters and spaces are allowed'),

})
