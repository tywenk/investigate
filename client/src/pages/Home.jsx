import ConnectWallet from "../components/ConnectWallet"
import InstallMetaMaskButton from "../components/InstallMetaMaskButton"
import { useUser } from "../context/UserContext"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

export const Home = () => {
	const currentUser = useUser()
	const navigate = useNavigate()

	let btnClass =
		"bg-stone-500 text-white hover:bg-stone-100 hover:text-black hover:shadow-lg hover:shadow-stone-300 border border-stone-400 hover:border-stone-200 rounded-xl px-2 py-1 mx-1 transition ease-in-out"

	return (
		<div className='h-screen grid place-content-center'>
			<div className='grid grid-rows-3 gap-4 divide-y bg-primary p-12 rounded-2xl border border-stone-400 shadow-md shadow-stone-400'>
				<div className='flex items-baseline'>
					<h1 className='text-2xl font-bold'>Investigate</h1>
				</div>
				<div className='flex items-center pt-3'>
					<div>Create and share notes on Ethereum mainnet blocks and transactions</div>
				</div>
				<div className='flex items-center pt-4'>
					{currentUser?.address ? (
						<button onClick={() => navigate("./explore")} className={btnClass}>
							Explore
						</button>
					) : (
						<>{window.ethereum ? <ConnectWallet /> : <InstallMetaMaskButton />}</>
					)}
				</div>
			</div>
		</div>
	)
}

export default Home
