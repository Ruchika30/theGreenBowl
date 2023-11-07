import { signInWithEmailAndPassword, updateProfile } from "firebase/auth"

import { auth } from "./firebase"

interface Props {
	email: string
	password: string
}

const login = async ({ email, password }: Props) => {
	try {
		const response = await signInWithEmailAndPassword(auth, email, password)

		return response
	} catch (error) {
		throw error // throw error to catch in the component
	}
}

// firebase logout
const logout = async () => {
	await auth.signOut()
}

export { login, logout }
