import { useQuery, useMutation, useQueryClient } from "react-query"
import { useUser } from "../context/UserContext"

const getUserNarratives = async ({ queryKey }) => {
	const [, currentUser] = queryKey

	const res = await fetch(`/investigations/${currentUser}`)

	return res.json()
}

const deleteNarrative = async ({ endpoint, id }) => {
	const res = await fetch(`/${endpoint.toString()}/${parseInt(id)}`, {
		method: "DELETE",
	})

	return res
}

export const useUserNarrativesData = (userToQuery) => {
	const currentUser = userToQuery

	return useQuery(["userNarratives", currentUser], getUserNarratives, {
		onSuccess: () => 
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
