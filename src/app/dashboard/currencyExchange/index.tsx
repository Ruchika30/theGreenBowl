import { Box } from "@mui/material"
import TextBox from "@spp/components/elements/TextBox"
import DropdownSelect from "../../../components/elements/DropdownSelect"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { CurrencyExchangeSchema } from "@spp/app/validation"
// import Image from "next/image"
import styles from "./style"
import ExchangeHistoryContainer from "./exchangeHistory"
import CurrencyExchangeContainer from "./currencyExchange"

function ExchangeNodal() {
	const { wrapperContainer } = styles

	const {
		formState: { errors },
		handleSubmit,
		register,
		control,
	} = useForm({
		mode: "onSubmit",
		resolver: yupResolver(CurrencyExchangeSchema),
	})

	const list = [
		{
			title: "Rudra Cybersecurity",
			date: "22nd October 2023",
			value: "USD 100 to EUR 97",
			rate: "1.06%",
			fees: "5 USD",
		},
		{
			title: "Rudra Cybersecurity",
			date: "22nd October 2023",
			value: "USD 100 to EUR 97",
			rate: "1.06%",
			fees: "5 USD",
		},
		{
			title: "Rudra Cybersecurity",
			date: "22nd October 2023",
			value: "USD 100 to EUR 97",
			rate: "1.06%",
			fees: "5 USD",
		},
		{
			title: "Rudra Cybersecurity",
			date: "22nd October 2023",
			value: "USD 100 to EUR 97",
			rate: "1.06%",
			fees: "5 USD",
		},
		{
			title: "Rudra Cybersecurity",
			date: "22nd October 2023",
			value: "USD 100 to EUR 97",
			rate: "1.06%",
			fees: "5 USD",
		},
		{
			title: "Rudra Cybersecurity",
			date: "22nd October 2023",
			value: "USD 100 to EUR 97",
			rate: "1.06%",
			fees: "5 USD",
		},
		{
			title: "Rudra Cybersecurity",
			date: "22nd October 2023",
			value: "USD 100 to EUR 97",
			rate: "1.06%",
			fees: "5 USD",
		},
	]

	const onConfirm = () => {}

	return (
		<Box
			sx={wrapperContainer}
			component="form"
			onSubmit={handleSubmit(onConfirm)}
		>
			<CurrencyExchangeContainer control={control} register={register} />
			<ExchangeHistoryContainer list={list} />
		</Box>
	)
}

export default ExchangeNodal
