import { useQuery } from "react-query"

const getContractSourceCode = async ({ queryKey }) => {
	const [_, contractAddr] = queryKey

	let res

	if (contractAddr) {
		res = await fetch(
			`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddr.toString()}&apikey=${
				process.env.REACT_APP_ETHERSCAN_API
			}`
		)
	}
	return res?.json()
}

export const useEtherscanContractData = (contractAddr) => {
	return useQuery(["etherscanContract", contractAddr], getContractSourceCode, {
		// onSuccess: () => console.log("Sucessfull retrieved data from Etherscan"),
		retry: 2,
		refetchOnWindowFocus: false,
	})
}
