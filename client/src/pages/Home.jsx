import React from "react"
import { ethers } from "ethers"
import { SiweMessage } from "siwe"

const domain = window.location.host
const origin = window.location.origin
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

export const Home = () => {
	function createSiweMessage(address, statement) {
		const message = new SiweMessage({
			domain,
			address,
			statement,
			uri: origin,
			version: "1",
			chainId: "1",
		})
		return message.prepareMessage()
	}

	function connectWallet() {
		provider
			.send("eth_requestAccounts", [])
			.catch(() => console.log("user rejected request"))
	}

	async function signInWithEthereum() {
		const message = createSiweMessage(
			await signer.getAddress(),
			"Sign in with Ethereum to the app."
		)
		console.log(await signer.signMessage(message))
	}

	return (
		<div>
			<button onClick={connectWallet}>Connect</button>
			<button onClick={signInWithEthereum}>Sign</button>
		</div>
	)
}

export default Home
