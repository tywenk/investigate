import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAlchemy } from "../context/AlchemyContext"
import { useBlockNotesData, usePostBlockNotesData } from "../hooks/useBlockNotesData"
import BlockMetadata from "../components/BlockMetadata"
import BlockTx from "../components/BlockTx"
import Button from "../components/Button"

const BlockEdit = ({ isShow = false }) => {
	const [blockData, setBlockData] = useState({})
	const [blockNotes, setBlockNotes] = useState({})
	const [isInvalidBlock, setIsInvalidBlock] = useState(false)
	const { blockNum: currentBlockNum, narrId: currentBlockNarrativeId } = useParams()
	const alcProvider = useAlchemy()

	const { data } = useBlockNotesData(currentBlockNarrativeId, setBlockNotes)
	const { mutate: postNotesData, isLoading: isPosting } = usePostBlockNotesData()

	useEffect(() => {
		let isMounted = true

		const data = async () => {
			const block = await alcProvider.getBlockWithTransactions(parseInt(currentBlockNum))

			if (block) {
				setBlockData(block)
			} else {
				setIsInvalidBlock(true)
			}
		}

		if (isMounted) {
			if (currentBlockNum !== undefined) {
				data()
			}
		}

		return () => {
			isMounted = false
		}
	}, [currentBlockNum, alcProvider])

	const handlePostNotes = async () => {
		postNotesData(blockNotes)
	}

	if (!currentBlockNarrativeId) {
		return <div>This narrative does not exist</div>
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
		return <div>Loading block data...</div>
	}

	return (
		<div>
			<Button>
				<Link to='/block'>New Block</Link>
			</Button>

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

			<Button customOnClick={handlePostNotes}>Save</Button>

			{blockData.transactions.map((tx) => {
				return (
					<BlockTx
						tx={tx}
						key={tx?.hash}
						blockNotes={blockNotes}
						setBlockNotes={setBlockNotes}
						currentBlockNarrativeId={currentBlockNarrativeId}
						isShow={isShow}
					/>
				)
			})}
		</div>
	)
}

export default BlockEdit
