import * as yup from "yup"

export const AddDepositSchema = yup.object().shape({
	// For search and other stuffs
	business: yup
		.object({
			id: yup.string(),
			name: yup.string(),
			search: yup.string(),
		})
		.required("Please select business"),
	account: yup.object().required("Please select account"),
	customer: yup.object().required("Please select customer"),

	// For the form data
	productName: yup.object().required("Please enter product name"),
	productPrice: yup
		.number()
		.typeError("Product price must be number")
		.required("Please enter the product price")
		.moreThan(0, "Please enter a number greater than zero"),
	brand: yup.object().required("Please select brand"),
	amountReceivedDate: yup.date().nullable(),
	amountReceived: yup
		.number()
		.typeError("Amount received must be number")
		.nullable()
		.moreThan(0, "Please enter a number greater than zero")
		.transform((_, val) => (val ? Number(val) : null)),
	referenceId: yup.string(),
	remarks: yup.string(),
	status: yup.string().required("Please enter status"),
	type: yup.string().required("Please enter type"),
	invoiceUrl: yup.string(),
	tags: yup.array().optional(),
	numberOfCopies: yup.number().optional(),
})
