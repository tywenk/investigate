import React, { useContext, useState, useEffect } from "react"

export const UserContext = React.createContext()
export const UserUpdateContext = React.createContext()

//custom hooks
export const useUser = () => {
	return useContext(UserContext)
}

export const useUserUpdate = () => {
	return useContext(UserUpdateContext)
}

//provider
export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({})

	// auto login if session cookie is present
	useEffect(() => {
		fetch("/autologin").then((r) => {
			if (r.ok) {
				r.json().then((user) => {
					setCurrentUser(user)
					console.log("auto logged in user:", user)
				})
			} else {
				console.log(r)
			}
		})
	}, [])

	const handleSetUser = (user) => {
		setCurrentUser(user)
	}

	return (
		<UserContext.Provider value={currentUser}>
			<UserUpdateContext.Provider value={handleSetUser}>{children}</UserUpdateContext.Provider>
		</UserContext.Provider>
	)
}
