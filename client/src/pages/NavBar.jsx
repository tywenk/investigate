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

	let activeClass = "bg-stone-300 hover:bg-stone-100 rounded-xl border border-primary p-2 mx-1 transition ease-in-out"
	let inactiveClass = "hover:bg-stone-100 border border-primary rounded-xl p-2 mx-1 transition ease-in-out"

	return (
		<div className='fixed top-0 w-full flex flex-row justify-between bg-gradient-to-r from-primaryHover to-primary rounded-xl border border-primary p-2'>
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

			{!currentUser?.address ? (
				<div className='hover:bg-stone-100 border border-primary rounded-xl p-2 mx-1 transition ease-in-out'>
					<button onClick={connectWallet}>Connect</button>
				</div>
			) : (
				<div className='flex flex-row'>
					<div>
						<NavLink
							className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
							to={`/narratives/${currentUser.address}`}
						>
							My Narratives
						</NavLink>
					</div>

					<div>
						<NavLink className={({ isActive }) => (isActive ? activeClass : inactiveClass)} to='/profile'>
							<div className='w-20 truncate'> {currentUser.ens || currentUser.address}</div>
						</NavLink>
					</div>

					<div>
						<button
							onClick={signOut}
							className='hover:bg-stone-100 border border-primary rounded-xl p-2 mx-1 transition ease-in-out'
						>
							Sign Out
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default NavBar
