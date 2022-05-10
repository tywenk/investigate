import StartInputForm from "../components/StartInputForm"
import InstallMetaMaskButton from "../components/InstallMetaMaskButton"
import { useUser } from "../context/UserContext"

const Transaction = () => {
	const currentUser = useUser()

	if (!currentUser?.address) {
		return (
			<div>
				Please Install metamsk to proceed
				<InstallMetaMaskButton></InstallMetaMaskButton>
			</div>
		)
	}

	return (
		<div className='h-screen grid place-content-center bg-gradient-to-r from-primary to-primaryHover'>
			<StartInputForm endpoint={"txns"} route='transaction' />
		</div>
	)
}

export default Transaction
