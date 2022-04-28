import React from "react"
import { ethers } from "ethers"
import { SiweMessage } from "siwe"

const domain = window.location.host
const origin = window.location.origin
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

export const Home = () => {
	function connectWallet() {
		console.log("connecting...  ")
		provider
			.send("eth_requestAccounts", [])
			.catch(() => console.log("user rejected request"))
	}

	async function createSiweMessage(address, statement) {
		const res = await fetch("/message")
		const message = new SiweMessage({
			domain,
			address,
			statement,
			uri: origin,
			version: "1",
			chainId: "1",
			nonce: await res.text(),
		})
		return message.prepareMessage()
	}

	async function signInWithEthereum() {
		const message = await createSiweMessage(
			await signer.getAddress(),
			"Sign in with Ethereum to the app."
		)
		const signature = await signer.signMessage(message)

		const res = await fetch("/sign-in", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message, signature }),
		})
		console.log(await res.text())
	}

	async function getInformation() {
		const res = await fetch("/profile")
		console.log(await res.text())
	}

	return (
		<div>
			<button onClick={connectWallet}>Connect</button>
			<button onClick={signInWithEthereum}>Sign</button>
			<button onClick={getInformation}>Info</button>
		</div>
	)
}

export default Home
