import { ethers } from "ethers"
import { SiweMessage } from "siwe"
import { useUserUpdate } from "../context/UserContext"

const ConnectWallet = () => {
	const handleSetUser = useUserUpdate()
	const domain = window.location.host
	const origin = window.location.origin
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const signer = provider.getSigner()

	let buttonClass =
		"bg-stone-500 text-white hover:bg-stone-100 hover:text-black hover:shadow-lg hover:shadow-stone-300 border border-stone-400 hover:border-stone-200 rounded-xl px-2 py-1 mx-1 transition ease-in-out"

	const connectWallet = async () => {
		const connect = await provider.send("eth_requestAccounts", []).catch(() => console.log("user rejected request"))

		if (connect) {
			signInWithEthereum()
		}
	}

	const createSiweMessage = async (address, statement) => {
		const res = await fetch("/message", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ address, chainId: "1" }),
		})
		const response = await res.json()
		const message = new SiweMessage({
			domain,
			address,
			statement,
			uri: origin,
			version: "1.0.0",
			chainId: "1",
			nonce: response.nonce,
		})
		return message.prepareMessage()
	}

	const signInWithEthereum = async () => {
		const address = await signer.getAddress()
		const message = await createSiweMessage(address, "🌟 Sign into 0xInvestigate. 🌟")
		const signature = await signer.signMessage(message)

		let ens
		try {
			ens = await provider.lookupAddress(address)
		} catch (error) {
			console.error(error)
		}

		const res = await fetch("/sign-in", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message, signature, ens }),
		})

		if (res.ok) {
			const user = await res.json()
			console.log("user:", user)
			handleSetUser(user)
		} else {
			console.log(Promise.reject(res))
		}
	}

	return (
		<div>
			<button onClick={connectWallet} className={buttonClass}>
				Connect
			</button>
		</div>
	)
}

export default ConnectWallet
