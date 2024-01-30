import * as yup from "yup"

export const LogInSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid Email")
		.required("Please enter your email"),
	password: yup.string().required("Please enter your password")
})
