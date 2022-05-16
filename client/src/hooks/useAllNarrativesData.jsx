import { useQuery } from "react-query"

const getAllNarratives = async () => {
	const fetchNarratives = (url) => fetch(url).then((r) => r.json()) //

	const [blocks, txns] = await Promise.all([
		fetchNarratives("/block_narratives"),
		fetchNarratives("/transaction_narratives"),
	])

	return [blocks, txns]
}

export const useAllNarrativesData = () => {
	return useQuery(["allNarratives"], getAllNarratives, {
		onSuccess: () => console.log("success"),
	})
}
