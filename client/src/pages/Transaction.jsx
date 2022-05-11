import StartInputForm from "../components/StartInputForm"
import InstallMetaMaskButton from "../components/InstallMetaMaskButton"
import { useUser } from "../context/UserContext"
import ConnectWallet from "../components/ConnectWallet"
import { useNavigate } from "react-router-dom"

const Transaction = () => {
	const currentUser = useUser()
	const navigate = useNavigate()

	let btnClass =
		"bg-stone-500 text-white hover:bg-stone-100 hover:text-black hover:shadow-lg hover:shadow-stone-300 border border-stone-400 hover:border-stone-200 rounded-xl px-2 py-1 mx-1 transition ease-in-out"

	if (!currentUser?.address) {
		return (
			<div className='h-screen grid place-content-center '>
				{currentUser?.address ? (
					<button onClick={() => navigate("./explore")} className={btnClass}>
						Explore
					</button>
				) : (
					<>
						{window.ethereum ? (
							<div className='h-screen grid place-content-center '>
								<div className='bg-stone-50 p-4 rounded-2xl grid grid-rows-2'>
									<div>No wallet connected</div>
									<div>
										<ConnectWallet />
									</div>
								</div>
							</div>
						) : (
							<InstallMetaMaskButton />
						)}
					</>
				)}
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
