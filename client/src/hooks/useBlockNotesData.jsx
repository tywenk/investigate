import { useQuery, useMutation, useQueryClient } from "react-query"

const onGetSuccess = (data, setBlockNotes) => {
	setBlockNotes(data)
	console.log("success fetching block notes: ", data)
}
const onError = (error) => {
	console.log("error fetching block data", error)
}

const getBlockNotes = async ({ queryKey }) => {
	const [, currentBlockNarrativeId] = queryKey
	const res = await fetch(`/block_notes/${currentBlockNarrativeId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
	return res.json()
}

const postBlockNotes = async (blockNotes) => {
	const notes = { notes: Object.values(blockNotes) }

	const res = await fetch("/block_notes", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(notes),
	})
	return res.json()
}

export const useBlockNotesData = (currentBlockNarrativeId, setBlockNotes) => {
	return useQuery(["getBlockNotes", currentBlockNarrativeId], getBlockNotes, {
		onSuccess: (data) => onGetSuccess(data, setBlockNotes),
		onError,
		refetchOnWindowFocus: false,
		select: (data) => {
			const notesObj = {}
			if (data.length > 0) {
				data?.map((note) => {
					return (notesObj[note.tx_hash] = note)
				})
			}
			return notesObj
		},
	})
}

export const usePostBlockNotesData = () => {
	const queryClient = useQueryClient()
	return useMutation((blockNotes) => postBlockNotes(blockNotes), {
		onSuccess: (data) => {
			queryClient.invalidateQueries("getBlockNotes")
			// queryClient.setQueryData("getBlockNotes", (oldQueryData) => {
			// 	return { ...oldQueryData, [data.tx_hash]: { ...data } }
			// })
		},
	})
}
