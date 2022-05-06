import { useQuery, useMutation, useQueryClient } from "react-query"
import { useUser } from "../context/UserContext"

const getUserNarratives = async ({ queryKey }) => {
	const [, currentUser] = queryKey

	const res = await fetch(`/investigations/${currentUser.id}`)

	return res.json()
}

const deleteNarrative = async ({ endpoint, id }) => {
	console.log(id)
	const res = await fetch(`/${endpoint.toString()}/${parseInt(id)}`, {
		method: "DELETE",
	})

	return res
}

export const useUserNarrativesData = () => {
	const currentUser = useUser()

	return useQuery(["userNarratives", currentUser], getUserNarratives, {
		onSuccess: () => console.log("Sucessfull retrieved data for user narratives"),
	})
}

export const useDeleteUserNarrative = () => {
	const queryClient = useQueryClient()
	return useMutation(({ endpoint, id }) => deleteNarrative({ endpoint, id }), {
		onSuccess: () => {
			queryClient.invalidateQueries("userNarratives")
		},
	})
}
