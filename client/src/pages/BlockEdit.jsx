import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAlchemy } from "../context/AlchemyContext"
import { useUser } from "../context/UserContext"
import BlockMetadata from "../components/BlockMetadata"
import BlockTx from "../components/BlockTx"

const BlockEdit = () => {
	const [blockData, setBlockData] = useState({})
	const [isInvalidBlock, setIsInvalidBlock] = useState(false)
	const [selectedTxs, setSelectedTxs] = useState([])
	const alcProvider = useAlchemy()
	const currentUser = useUser()
	const { id: currentBlock } = useParams()

	console.log(blockData)

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
			}
		}

		data()
	}, [currentBlock, alcProvider])

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

			{blockData.transactions.map((tx) => {
				return <BlockTx tx={tx} key={tx?.hash} />
			})}
		</div>
	)
}

export default BlockEdit
