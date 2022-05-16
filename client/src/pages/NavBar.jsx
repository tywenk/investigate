import { useUser, useUserUpdate } from "../context/UserContext"
import { NavLink } from "react-router-dom"
import ConnectWallet from "../components/ConnectWallet"

const NavBar = () => {
	const currentUser = useUser()
	const handleSetUser = useUserUpdate()

	let activeClass =
		"bg-stone-100 text-black hover:shadow-lg hover:shadow-stone-300 border border-stone-200 rounded-xl px-2 py-1 mx-1 transition ease-in-out"
	let inactiveClass =
		"bg-stone-500 text-white hover:bg-stone-100 hover:text-black hover:shadow-lg hover:shadow-stone-300 border border-stone-400 hover:border-stone-200 rounded-xl px-2 py-1 mx-1 transition ease-in-out"

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
		<div className='fixed top-0 w-full flex flex-row justify-between bg-gradient-to-r from-primaryHover to-primary rounded-xl border border-primary p-2 shadow-md shadow-stone-400'>
			<div className='flex flex-row'>
				<NavLink className={({ isActive }) => (isActive ? activeClass : inactiveClass)} to='/'>
					Home
				</NavLink>
			</div>

			<div className='flex flex-row'>
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
				<div>
					<ConnectWallet />
				</div>
			) : (
				<div className='flex flex-row'>
					<div>
						<NavLink
							className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
							to={`/narratives/${currentUser.address}`}
						>
							<span className='w-10 truncate'> {currentUser.ens || currentUser.address}</span>
						</NavLink>

						<button onClick={signOut} className={inactiveClass}>
							Sign Out
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default NavBar
