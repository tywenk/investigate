import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAlchemy } from "../context/AlchemyContext"
import { useUser } from "../context/UserContext"
import BlockMetadata from "../components/BlockMetadata"
import BlockTx from "../components/BlockTx"

const BlockEdit = () => {
	const [blockData, setBlockData] = useState({})
	const [isInvalidBlock, setIsInvalidBlock] = useState(false)
	const [selectedTxs, setSelectedTxs] = useState({})
	const [currentBlockNarrativeId, setCurrentBlockNarrativeId] = useState(null)
	const alcProvider = useAlchemy()
	const currentUser = useUser()
	const { id: currentBlock } = useParams()

	useEffect(() => {
		const data = async () => {
			if (currentBlock === undefined) {
				return
			} else {
				const block = await alcProvider.getBlockWithTransactions(
					parseInt(currentBlock)
				)

				if (block) {
					setBlockData(block)
				} else {
					setIsInvalidBlock(true)
				}

				const res = await fetch("/block_narratives", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ block_num: currentBlock }),
				})

				const blockNarrObj = await res.json()
				setCurrentBlockNarrativeId(blockNarrObj.id)
			}
		}

		data()
	}, [currentBlock, alcProvider])

	const handleSubmitBlockNarrative = async () => {
		const res = await fetch("/block_notes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(selectedTxs),
		})
	}

	if (!currentUser?.address) {
		return <div>Please connect metamask</div>
	}

	if (isInvalidBlock) {
		return (
			<div>
				<div>Invalid Block Input</div>
				<Link to='/block'>Try again</Link>
			</div>
		)
	}

	if (Object.keys(blockData).length === 0) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<Link to='/block'>New Block</Link>

			<BlockMetadata
				blockNumber={blockData?.number}
				timestamp={blockData?.timestamp}
				gasUsed={blockData?.gasUsed?.toString()}
				gasLimit={blockData?.gasLimit?.toString()}
				baseFeePerGas={blockData?.baseFeePerGas?.toString()}
				minedBy={blockData?.miner}
				txLength={blockData?.transactions?.length}
			/>

			<button onClick={handleSubmitBlockNarrative}>Save</button>

			{blockData.transactions.map((tx) => {
				return (
					<BlockTx
						tx={tx}
						key={tx?.hash}
						setSelectedTxs={setSelectedTxs}
						currentBlockNarrativeId={currentBlockNarrativeId}
					/>
				)
			})}
		</div>
	)
}

export default BlockEdit
