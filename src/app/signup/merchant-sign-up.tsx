"use client"

import { Container, Divider } from "@mui/material"

import NewMerchant from "./merchant-sign-up/NewMerchant"
import BusinessDetails from "./merchant-sign-up/BusinessDetails"
import FooterSignup from "./merchant-sign-up/FooterSignup"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { SignUpSchema } from "./validation"

export default function MerchantSignup() {
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm({
		mode: "onSubmit",
		resolver: yupResolver(SignUpSchema),
	})

	const merchantSignup = (data: any) => {
		// Mutation here to create merchant
	}

	return (
		<Container component="form" onSubmit={handleSubmit(merchantSignup)}>
			<NewMerchant register={register} errors={errors} />

			<Divider />

			<BusinessDetails register={register} errors={errors} />

			<Divider />

			<FooterSignup />
		</Container>
	)
}
