import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAlchemy } from "../context/AlchemyContext"
import { useUser } from "../context/UserContext"
import BlockMetadata from "../components/BlockMetadata"
import BlockTx from "../components/BlockTx"
import Button from "../components/Button"

const BlockEdit = ({ isShow }) => {
	const [blockData, setBlockData] = useState({})
	const [isInvalidBlock, setIsInvalidBlock] = useState(false)
	const [selectedTxs, setSelectedTxs] = useState({})
	const { block: currentBlock, id: currentBlockNarrativeId } = useParams()
	const alcProvider = useAlchemy()
	const currentUser = useUser()

	//format fetched narrative data from array to an object
	const fmtFetchedNotes = async (res) => {
		const blockNarrative = await res.json()
		const notesObj = {}
		blockNarrative.block_notes.map((note) => {
			return (notesObj[note.tx_hash] = note)
		})
		console.log(notesObj)
		setSelectedTxs(notesObj)
	}

	//format notes to send to backend from object to array
	const fmtSendingNotes = (txs) => {
		console.log({ notes: Object.values(txs) })
		return { notes: Object.values(txs) }
	}

	useEffect(() => {
		const data = async () => {
			if (currentBlock === undefined || currentBlockNarrativeId === undefined) {
				return
			} else {
				const res = await fetch(
					`/block_narratives/${currentBlockNarrativeId}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				fmtFetchedNotes(res)

				const block = await alcProvider.getBlockWithTransactions(
					parseInt(currentBlock)
				)

				if (block) {
					setBlockData(block)
				} else {
					setIsInvalidBlock(true)
				}
			}
		}

		data()
	}, [currentBlock, currentBlockNarrativeId, alcProvider])

	const handleSaveNarrative = async () => {
		const notes = fmtSendingNotes(selectedTxs)

		const res = await fetch("/block_notes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(notes),
		})

		const data = await res.json()
		console.log(data)
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
				extraData={blockData?.extraData?.toString()}
			/>

			<Button customOnClick={handleSaveNarrative}>Save</Button>

			{blockData.transactions.map((tx) => {
				return (
					<BlockTx
						tx={tx}
						key={tx?.hash}
						selectedTxs={selectedTxs}
						setSelectedTxs={setSelectedTxs}
						currentBlockNarrativeId={currentBlockNarrativeId}
						isShow={isShow}
					/>
				)
			})}
		</div>
	)
}

export default BlockEdit
