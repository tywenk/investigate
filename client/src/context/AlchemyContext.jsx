import React, { useContext } from "react"
import { ethers } from "ethers"

export const AlchemyContext = React.createContext()

//custom hooks
export const useAlchemy = () => {
	return useContext(AlchemyContext)
}
//provider
export const AlchemyProvider = ({ children }) => {
	const alcProvider = new ethers.providers.JsonRpcProvider(
		`https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API}`
	)

	return (
		<AlchemyContext.Provider value={alcProvider}>
			{children}
		</AlchemyContext.Provider>
	)
}
