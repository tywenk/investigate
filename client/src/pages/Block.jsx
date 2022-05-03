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
		<div>
			<StartInputForm endpoint={"blocks"} route='block' />
		</div>
	)
}

export default Block
