import { useQuery } from "react-query"
import { useUser } from "../context/UserContext"

const getAllNarratives = async ({ queryKey }) => {
	const [, currentUser] = queryKey

	const res = await fetch(`/investigations/${currentUser.id}`)

	return res.json()
}

export const useUserNarrativesData = () => {
	const currentUser = useUser()

	return useQuery(["allNarratives", currentUser], getAllNarratives, {
		onSuccess: () => console.log("Sucessfull retrieved data for user narratives"),
	})
}
