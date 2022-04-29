import { useState } from "react"
import { useQuery } from "react-query"
import ethers from "ethers"
import StartInputForm from "../components/StartInputForm"

const fetchBlock = (blockNum) => {}

const BlockEdit = () => {
	const [currentBlock, setCurrentBlock] = useState("")
	const { data, isLoading } = useQuery("block", fetchBlock)

	const setSubmittedBlock = (block) => {
		console.log(block)
		setCurrentBlock(block)
	}

	if (!currentBlock) {
		return <StartInputForm setVal={setSubmittedBlock} endpoint={"blocks"} />
	}

	return <div>BlockEdit</div>
}

export default BlockEdit
