"use client"

import React from "react"

import { Box, Button, Divider, IconButton, Typography } from "@mui/material"

import TextBox from "@spp/components/elements/TextBox"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LogInSchema } from "@spp/app/validation"

import NextLink from "next/link"
import { useRouter } from "next/navigation"

import { enqueueSnackbar } from "notistack"

// import { login } from "@spp/lib/firebaseScript"

import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

interface LogInProps {
	email: string
	password: string
}

export default function LogIn() {
	const navigation = useRouter()

	const {
		formState: { errors },
		handleSubmit,
		register
	} = useForm({
		mode: "onSubmit",
		resolver: yupResolver(LogInSchema)
	})

	const [isSubmitting, setSubmitting] = React.useState(false)
	const [isVisible, setIsVisible] = React.useState(false)

	const onHandlePasswordToggle = () => setIsVisible((v) => !v)

	const handleLogIn = async (data: LogInProps) => {
		try {
			setSubmitting(true)

			const user = "h"

			if (true) {
				navigation.replace("/dashboard")
			}
		} catch (err: any) {
			let message = ""

			if (err.code === "auth/user-not-found") {
				message = "Email or password is wrong!"
			} else if (err.code === "auth/wrong-password") {
				message = "Email or password is wrong!"
			} else if (err.code === "auth/too-many-requests	") {
				message = "Try again later!"
			} else {
				message = err.message
			}

			enqueueSnackbar(message, {
				variant: "error"
			})
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Box component="form" mb={2} onSubmit={handleSubmit(handleLogIn)}>
			<Box mb={2}>
				<TextBox
					name="email"
					register={register}
					placeholder="Enter email"
					helperText={errors?.email?.message}
					error={!!errors?.email?.message}
				/>
			</Box>

			<Box mb={2}>
				<TextBox
					name="password"
					register={register}
					placeholder="Enter password"
					type={isVisible ? "text" : "password"}
					helperText={errors?.password?.message}
					error={!!errors?.password?.message}
					endIcon={
						<IconButton onClick={onHandlePasswordToggle}>
							{!isVisible ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					}
				/>
			</Box>

			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Button variant="contained" type="submit" disabled={isSubmitting}>
					Sign in
				</Button>

				<Typography variant="SPP_Body_1" color="secondary">
					Forgot Password?
				</Typography>
			</Box>

			<Divider sx={{ mt: 6, mb: 6 }} />

			<Box textAlign="center">
				<Typography
					href="/signup"
					variant="SPP_H6"
					component={NextLink}
					sx={{ textDecoration: "none", textTransform: "uppercase" }}
				>
					Register a new account
				</Typography>
			</Box>
		</Box>
	)
}
