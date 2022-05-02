import React, { useContext } from "react"
import { ethers } from "ethers"
// import { createAlchemyWeb3 } from "@alch/alchemy-web3"

export const AlchemyContext = React.createContext()
// export const AlchemyWeb3Context = React.createContext()

//custom hooks
export const useAlchemy = () => {
	return useContext(AlchemyContext)
}

// export const useWeb3Alchemy = () => {
// 	return useContext(AlchemyWeb3Context)
// }

//provider
export const AlchemyProvider = ({ children }) => {
	const alcProvider = new ethers.providers.JsonRpcProvider(
		`https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API}`
	)

	// const web3 = createAlchemyWeb3(
	// 	`https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API}`
	// )

	return (
		<AlchemyContext.Provider value={alcProvider}>
			{/* <AlchemyWeb3Context.Provider value={web3}> */}
			{children}
			{/* </AlchemyWeb3Context.Provider> */}
		</AlchemyContext.Provider>
	)
}
