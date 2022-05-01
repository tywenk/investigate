import React from "react"
import { ethers } from "ethers"
import { SiweMessage } from "siwe"
import { useUser, useUserUpdate } from "../context/UserContext"
import { Link } from "react-router-dom"

const NavBar = () => {
	const currentUser = useUser()
	const handleSetUser = useUserUpdate()

	const domain = window.location.host
	const origin = window.location.origin
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const signer = provider.getSigner()

	const connectWallet = async () => {
		const connect = await provider
			.send("eth_requestAccounts", [])
			.catch(() => console.log("user rejected request"))

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
			version: "1",
			chainId: "1",
			nonce: response.nonce,
		})
		return message.prepareMessage()
	}

	const signInWithEthereum = async () => {
		const address = await signer.getAddress()
		const message = await createSiweMessage(
			address,
			"🌟 Sign into 0xInvestigate. 🌟"
		)
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

	const signOut = async () => {
		const res = await fetch("/sign-out", {
			method: "POST",
		})

		if (res.ok) {
			handleSetUser({})
		} else {
			console.log(Promise.reject(res))
		}
	}

	return (
		<div className='flex flex-row gap-x-2 bg-yellow-200'>
			<div>
				{!currentUser?.address ? (
					<>
						<button onClick={connectWallet}>Connect</button>
					</>
				) : (
					<div>
						<button onClick={signOut}>Sign Out</button>
						<Link to='profile' className='truncate w-20'>
							{currentUser.ens || currentUser.address}
						</Link>
						<Link to={`/investigations/${currentUser.address}`}>
							My Investigations
						</Link>
					</div>
				)}
			</div>

			<Link to='/'>Home</Link>
			<Link to='/block'>Block</Link>
			<Link to='/'>Transaction</Link>
			<Link to='/'>Address</Link>
			<Link to='/investigations'>Explore</Link>
		</div>
	)
}

export default NavBar
