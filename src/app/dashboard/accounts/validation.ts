import * as yup from "yup"

export const AddAccountSchema = yup.object().shape({
	accountName: yup.string().required("Please enter account name"),
	accountNickname: yup.string().required("Please enter account nickname"),
	accountNumber: yup.string().required("Please enter account number"),
	currency: yup.string().required("Please select currency"),
	accountAddress: yup.string().required("Please enter account address"),
	bankCharges: yup
		.number()
		.typeError("Bank charge must be a number")
		.required("Please enter the bank charge")
		.min(0, "Can't be negative"),
})
