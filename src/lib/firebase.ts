import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyDOs_g5yY67N9BTuClIiwr7hMTgR64JlNY",
	authDomain: "spp-dev-23262.firebaseapp.com",
	projectId: "spp-dev-23262",
	storageBucket: "spp-dev-23262.appspot.com",
	messagingSenderId: "1041331342333",
	appId: "1:1041331342333:web:bf52be841b08729a1e6794",
	measurementId: "G-6C1QP5G6KP",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage()

export { auth, storage }
