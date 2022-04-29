import { useState } from "react"
import { useQuery } from "react-query"
import StartInputForm from "../components/StartInputForm"
import { useAlchemy } from "../context/AlchemyContext"

const BlockEdit = () => {
	const [currentBlock, setCurrentBlock] = useState("")

	const alcProvider = useAlchemy()

	const getBlock = async (currentBlock, alcProvider) => {
		if (currentBlock) {
			let block = await alcProvider.getBlock(currentBlock)
		}
	}

	const { data, isLoading } = useQuery(
		"block",
		getBlock(currentBlock, alcProvider)
	)

	if (!currentBlock) {
		return <StartInputForm setVal={setCurrentBlock} endpoint={"blocks"} />
	}

	return <div>BlockEdit</div>
}

export default BlockEdit
