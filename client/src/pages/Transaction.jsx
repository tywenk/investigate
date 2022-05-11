import StartInputForm from "../components/StartInputForm"
import InstallMetaMaskButton from "../components/InstallMetaMaskButton"
import { useUser } from "../context/UserContext"

const Transaction = () => {
	const currentUser = useUser()

	if (!currentUser?.address) {
		return (
			<div className='h-screen grid place-content-center '>
				<div className='bg-stone-50 p-4 rounded-2xl'>No wallet connected</div>
			</div>
		)
	}

	return (
		<div className='h-screen grid place-content-center'>
			<StartInputForm endpoint={"txns"} route='transaction' />
		</div>
	)
}

export default Transaction
