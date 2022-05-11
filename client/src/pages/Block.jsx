import StartInputForm from "../components/StartInputForm"
import InstallMetaMaskButton from "../components/InstallMetaMaskButton"
import { useUser } from "../context/UserContext"

const Block = () => {
	const currentUser = useUser()

	if (!currentUser?.address) {
		return (
			<div className='h-screen grid place-content-center'>
				Please install Metamask to proceed
				<InstallMetaMaskButton />
			</div>
		)
	}

	return (
		<div className='h-screen grid place-content-center'>
			<StartInputForm endpoint={"blocks"} route='block' />
		</div>
	)
}

export default Block
