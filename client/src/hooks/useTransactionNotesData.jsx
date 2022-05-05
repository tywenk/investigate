import { useQuery, useMutation, useQueryClient } from "react-query"

const getTxNotes = async ({ queryKey }) => {
	const [_, currentTxNarrativeId] = queryKey
	const res = await fetch(`/transaction_narratives/${currentTxNarrativeId}`)
	return res.json()
}

const postTxNotes = async (txNotes) => {
	txNotes.investigation_id = parseInt(txNotes.investigation.id)
	txNotes.txn_id = parseInt(txNotes.txn.id)

	delete txNotes["investigation"]
	delete txNotes["txn"]

	console.log(txNotes)
	const res = await fetch("/transaction_narratives/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(txNotes),
	})

	return res.json()
}

export const useTransactionNotesData = (currentTxNarrativeId, setTxNotes) => {
	return useQuery(["getTxNotes", currentTxNarrativeId], getTxNotes, {
		onSuccess: (data) => setTxNotes(data),
		refetchOnWindowFocus: false,
	})
}

export const usePostTransactionNotesData = () => {
	const queryClient = useQueryClient()
	return useMutation((txNotes) => postTxNotes(txNotes), {
		onSuccess: () => {
			queryClient.invalidateQueries("getTxNotes")
		},
	})
}
