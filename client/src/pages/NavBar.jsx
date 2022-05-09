import React from "react"
import { ethers } from "ethers"
import { SiweMessage } from "siwe"
import { useUser, useUserUpdate } from "../context/UserContext"
import { Link, NavLink } from "react-router-dom"
import Button from "../components/Button"

const NavBar = () => {
	const currentUser = useUser()
	const handleSetUser = useUserUpdate()

	const domain = window.location.host
	const origin = window.location.origin
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const signer = provider.getSigner()

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
			version: "1",
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

	let activeClass =
		" m-2 px-2 py-1/2 transition ease-in-out underline decoration-2 underline-offset-2 decoration-secondary"
	let inactiveClass =
		"hover:underline decoration-2 underline-offset-2 decoration-secondary m-2 px-2 py-1/2 transition ease-in-out"

	return (
		<div className='sticky top-0 flex flex-row justify-between bg-yellow-100'>
			<div>
				<NavLink className={({ isActive }) => (isActive ? activeClass : inactiveClass)} to='/'>
					Home
				</NavLink>
			</div>

			<div>
				<NavLink className={({ isActive }) => (isActive ? activeClass : inactiveClass)} to='/explore'>
					Explore
				</NavLink>
				<NavLink className={({ isActive }) => (isActive ? activeClass : inactiveClass)} to='/block'>
					Block
				</NavLink>
				<NavLink className={({ isActive }) => (isActive ? activeClass : inactiveClass)} to='/transaction'>
					Transaction
				</NavLink>
			</div>

			<div>
				{!currentUser?.address ? (
					<div>
						<button onClick={connectWallet}>Connect</button>
					</div>
				) : (
					<div className='flex flex-row'>
						<NavLink
							className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
							to={`/narratives/${currentUser.address}`}
						>
							My Narratives
						</NavLink>

						<NavLink className={({ isActive }) => (isActive ? activeClass : inactiveClass)} to='/profile'>
							<div className='w-20 truncate'> {currentUser.ens || currentUser.address}</div>
						</NavLink>

						<button
							onClick={signOut}
							className='hover:underline decoration-2 underline-offset-2 decoration-secondary m-2 px-2 py-1/2 transition ease-in-out'
						>
							Sign Out
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default NavBar
