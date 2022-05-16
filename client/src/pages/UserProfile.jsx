import { useState } from "react"

const UserProfile = () => {
	const [userInfo, setUserInfo] = useState({})

	const getInformation = async () => {
		const res = await fetch("/profile") //change to /user-profile in users controller later
	}
	return (
		<div>
			<button onClick={getInformation}>Info</button>
			<div>{userInfo && userInfo?.address}</div>
		</div>
	)
}

export default UserProfile
