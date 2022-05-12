import { useQuery, useMutation, useQueryClient } from "react-query"

const getTxNotes = async ({ queryKey }) => {
	const [, currentTxNarrativeId] = queryKey
	const res = await fetch(`/transaction_narratives/${currentTxNarrativeId}`)
	return res.json()
}

const postTxNotes = async ({ txNotes, titleLabel }) => {
	txNotes.investigation_id = parseInt(txNotes.investigation.id)
	txNotes.txn_id = parseInt(txNotes.txn.id)
	txNotes.label = titleLabel

	delete txNotes["investigation"]
	delete txNotes["txn"]

	// console.log(txNotes)
	const res = await fetch("/transaction_narratives/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(txNotes),
	})

	return res.json()
}

export const useTransactionNotesData = (currentTxNarrativeId, setTxNotes, setTitleLabel) => {
	return useQuery(["getTxNotes", currentTxNarrativeId], getTxNotes, {
		onSuccess: (data) => {
			// console.log(data?.label)
			setTitleLabel(data?.label ?? "Untitled")
			setTxNotes(data)
		},
		refetchOnWindowFocus: false,
	})
}

export const usePostTransactionNotesData = () => {
	const queryClient = useQueryClient()
	return useMutation((data) => postTxNotes(data), {
		onSuccess: () => {
			queryClient.invalidateQueries("getTxNotes")
		},
	})
}
