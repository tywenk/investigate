import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAlchemy } from "../context/AlchemyContext"
import { useBlockNotesData, usePostBlockNotesData } from "../hooks/useBlockNotesData"
import BlockMetadata from "../components/BlockMetadata"
import BlockTx from "../components/BlockTx"
import Button from "../components/Button"
import _ from "lodash"
import { useUser, useUserUpdate } from "../context/UserContext"
import dayjs from "dayjs"

const BlockEdit = ({ isShow = false }) => {
	const [blockData, setBlockData] = useState({})
	const [blockNotes, setBlockNotes] = useState({})
	const [isInvalidBlock, setIsInvalidBlock] = useState(false)
	const [canEdit, setCanEdit] = useState(false)
	const { blockNum: currentBlockNum, narrId: currentBlockNarrativeId } = useParams()
	const alcProvider = useAlchemy()
	const currentUser = useUser()
	const updateCurrentUser = useUserUpdate()

	const { data } = useBlockNotesData(currentBlockNarrativeId, setBlockNotes)
	const { mutate: postNotesData, isLoading: isPosting } = usePostBlockNotesData()

	console.log(_.isEqual(data, blockNotes))

	useEffect(() => {
		const data = async () => {
			const block = await alcProvider.getBlockWithTransactions(parseInt(currentBlockNum))

			if (block) {
				setBlockData(block)
			} else {
				setIsInvalidBlock(true)
			}
		}

		if (currentBlockNum !== undefined) {
			data()
		}
	}, [currentBlockNum, alcProvider])

	useEffect(() => {
		if (currentUser?.block_narratives?.some((bn) => parseInt(bn.id) === parseInt(currentBlockNarrativeId)) && !isShow) {
			setCanEdit(true)
		} else {
			!canEdit && setCanEdit(false)
		}
	}, [currentUser, currentBlockNarrativeId])

	useEffect(() => {
		if (Object.keys(currentUser).length > 0 && data) {
			console.log(data)
			updateCurrentUser((currUserData) => ({
				...currUserData,
				block_narratives: [
					...currUserData?.block_narratives,
					{ id: currentBlockNarrativeId, created_at: dayjs().format(), updated_at: dayjs().format() },
				],
			}))
		}
	}, [data])

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
			{!isShow && (
				<Button>
					<Link to='/block'>New Block</Link>
				</Button>
			)}

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

			{!isShow && (
				<div>
					<Button customOnClick={handlePostNotes}>Save</Button>
					{isPosting ? (
						<span>Saving...</span>
					) : (
						<>{_.isEqual(data, blockNotes) ? <span></span> : <span>Unsaved changes</span>}</>
					)}
				</div>
			)}

			{blockData.transactions.map((tx) => {
				return (
					<BlockTx
						tx={tx}
						key={tx?.hash}
						blockNotes={blockNotes}
						setBlockNotes={setBlockNotes}
						currentBlockNarrativeId={currentBlockNarrativeId}
						isShow={isShow}
						canEdit={canEdit}
					/>
				)
			})}
		</div>
	)
}

export default BlockEdit
