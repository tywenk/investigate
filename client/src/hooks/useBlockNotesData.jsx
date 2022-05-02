import { useQuery } from "react-query"

const onSuccess = (data) => {
	console.log("success fetching data", data)
}
const onError = (error) => {
	console.log("error fetching getBlockNotes", error)
}

const getBlockNotes = async ({ queryKey }) => {
	const [_, currentBlockNarrativeId] = queryKey
	const res = await fetch(`/block_narratives/${currentBlockNarrativeId}`)
	return res.json()
}

const useBlockNotesData = (currentBlockNarrativeId) => {
	return useQuery(["getBlockNotes", currentBlockNarrativeId], getBlockNotes, {
		onSuccess,
		onError,
		select: (data) => {
			const notesObj = {}
			data?.block_notes?.map((note) => {
				return (notesObj[note.tx_hash] = note)
			})
			return notesObj
		},
	})
}

export default useBlockNotesData
