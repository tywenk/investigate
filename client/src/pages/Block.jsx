import StartInputForm from "../components/StartInputForm"
import InstallMetaMaskButton from "../components/InstallMetaMaskButton"
import { useUser } from "../context/UserContext"

const Block = () => {
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
			<StartInputForm endpoint={"blocks"} route='block' />
		</div>
	)
}

export default Block
