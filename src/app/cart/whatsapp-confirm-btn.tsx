import { isSafeArray } from "@spp/helpers/Utils"
import useCart from "@spp/context/cart-context/useCart"
import { Button } from "@mui/material"

function WhatsappConfirmComponent({ checkDisabled = false }) {
	const { products, userAddress, userOptions } = useCart()

	const { name, phone, addressLine1, addressLine2 } = userAddress
	const { dontSendCutlery, dontSendNapkins, useOldAddress } = userOptions

	const handleConfirm = () => {
		let message = "******** New Order ********" + "\n"
		isSafeArray(products) &&
			products.forEach((item) => {
				const { itemName, quantity, variant } = item
				message =
					message +
					`${itemName} - (${variant.name}) - ${variant.value} X ${quantity}` +
					"\n"
			})

		// Add address
		if (name || addressLine1 || addressLine2 || phone)
			message =
				message +
				"\n" +
				`${name}` +
				"\n" +
				`${addressLine1}, ${addressLine2}` +
				"\n" +
				`${phone}` +
				"\n"

		if (dontSendCutlery || dontSendNapkins || useOldAddress) {
			message =
				message +
				"\n" +
				`*** Note ***` +
				"\n" +
				(dontSendCutlery ? `Do not send cutlery` + "\n" : "") +
				(dontSendNapkins ? `Do not send napkins` + "\n" : "") +
				(useOldAddress ? `Use previously used address` + "\n" : "")
		}

		const encodedMessage = encodeURIComponent(message)
		const whatsappUrl = `https://wa.me/9757024944?text=${encodedMessage}`
		window.open(whatsappUrl, "_blank")
	}

	return (
		<Button
			style={{ width: "100%" }}
			onClick={handleConfirm}
			variant="contained"
			color="primary"
			type="submit"
			disabled={checkDisabled}
		>
			Confirm over whatsapp
		</Button>
	)
}

export default WhatsappConfirmComponent
