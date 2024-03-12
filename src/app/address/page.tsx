"use client"

import React, { useEffect, useState } from "react"
import { TextField, Toolbar, Box, Grid, Typography } from "@mui/material"
import Navbar from "../../fragments/NavBar"
import { isNumber, isString, isValidAddress } from "./utils"
import { useCart } from "@spp/context/cart-context"
import WhatsappConfirmComponent from "../cart/whatsapp-confirm-btn"

function Address() {
	const { setUserAddress } = useCart()
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		addressLine1: "",
		addressLine2: ""
	})

	const [errors, setErrors] = useState({})

	useEffect(() => {
		setUserAddress(formData)
	}, [formData])

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData({
			...formData,
			[name]: value
		})
	}

	const validateField = (fieldName, value) => {
		switch (fieldName) {
			case "name":
				return !isString(value) ? "Name is invalid" : ""
			case "phone":
				return !isNumber(value) ? "Phone must be a number" : ""
			case "addressLine1":
				return !isValidAddress(value) ? "Address is invalid" : ""

			case "addressLine2":
				return !isValidAddress(value) ? "Address is invalid" : ""
			default:
				return ""
		}
	}

	const validateForm = () => {
		let valid = true
		const newErrors = {}

		for (const fieldName in formData) {
			const errorMessage = validateField(fieldName, formData[fieldName])

			if (errorMessage) {
				newErrors[fieldName] = errorMessage
				valid = false
			}
		}

		setErrors(newErrors)
		return valid
	}

	const handleBlur = (fieldName) => {
		const errorMessage = validateField(fieldName, formData[fieldName])
		setErrors((prevErrors) => ({
			...prevErrors,
			[fieldName]: errorMessage
		}))
	}

	const handleProceed = () => {
		if (validateForm()) {
			// Proceed with form submission
			console.log("Form submitted successfully")
		}
	}

	const checkValidity = () => {
		const hasErrors = Object.keys(errors).some((item) => {
			return !!errors[item]
		})

		const isEmpty = Object.keys(formData).some((item) => {
			return !formData[item]
		})

		return hasErrors || isEmpty
	}

	return (
		<Box
			sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
			p={2}
		>
			<Navbar />

			<Box component="main" sx={{ flex: 1 }}>
				<Toolbar />
				<form style={{ flex: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Name"
								variant="outlined"
								name="name"
								value={formData.name}
								onChange={handleChange}
								onBlur={() => handleBlur("name")}
								error={errors.name}
								helperText={errors.name}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label="Phone"
								variant="outlined"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								onBlur={() => handleBlur("phone")}
								error={errors.phone}
								helperText={errors.phone}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label="Flat, Building"
								variant="outlined"
								name="addressLine1"
								value={formData.addressLine1}
								onChange={handleChange}
								onBlur={() => handleBlur("addressLine1")}
								error={errors.addressLine1}
								helperText={errors.addressLine1}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Street name, Area, City, Pincode"
								variant="outlined"
								name="addressLine2"
								value={formData.addressLine2}
								onChange={handleChange}
								onBlur={() => handleBlur("addressLine2")}
								error={errors.addressLine2}
								helperText={errors.addressLine2}
							/>
						</Grid>
					</Grid>
				</form>
			</Box>

			<Typography
				variant="SPP_Body_2"
				color="secondary"
				fontWeight="bold"
				mb={1}
			>
				Payment details will be shared over WhatsApp
			</Typography>

			<Box sx={{ width: "100%" }}>
				<WhatsappConfirmComponent checkDisabled={checkValidity()} />
			</Box>
		</Box>
	)
}

export default Address
