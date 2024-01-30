import React from "react"

import { User } from "firebase/auth"
import { AuthUserData } from "types/typings"

interface AuthContextType {
	user: User | null
	isLoading: boolean
	authUserData: AuthUserData | null
	setAuthUserData: React.Dispatch<React.SetStateAction<AuthUserData | null>>
}

const AuthContext = React.createContext<AuthContextType>({
	user: null,
	isLoading: true,
	authUserData: null,
	setAuthUserData: () => {}
})

export default AuthContext
