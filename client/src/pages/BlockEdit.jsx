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
import { FiArrowLeft } from "react-icons/fi"
import { useDeleteUserNarrative } from "../hooks/useUserNarrativesData"

const BlockEdit = ({ isShow = false }) => {
	const [blockData, setBlockData] = useState({})
	const [blockNotes, setBlockNotes] = useState({})
	const [titleLabel, setTitleLabel] = useState("")
	const [isInvalidBlock, setIsInvalidBlock] = useState(false)
	const [canEdit, setCanEdit] = useState(false)
	const { blockNum: currentBlockNum, narrId: currentBlockNarrativeId } = useParams()
	const alcProvider = useAlchemy()
	const currentUser = useUser()
	const updateCurrentUser = useUserUpdate()
	const { mutate: deleteData, isLoading: isDeleting } = useDeleteUserNarrative()
	const { data } = useBlockNotesData(currentBlockNarrativeId, setBlockNotes, setTitleLabel)
	const { mutate: postNotesData, isLoading: isPosting, isSuccess } = usePostBlockNotesData()

	const handleDelete = (endpoint, id) => {
		deleteData({ endpoint, id })
	}

	useEffect(() => {
		const data = async () => {
			try {
				const block = await alcProvider.getBlockWithTransactions(parseInt(currentBlockNum))
				if (block) {
					setBlockData(block)
				} else {
					handleDelete("block_narratives", currentBlockNarrativeId)
					setIsInvalidBlock(true)
				}
			} catch {
				handleDelete("block_narratives", currentBlockNarrativeId)
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
		postNotesData({ blockNotes, titleLabel, currentBlockNarrativeId })
	}

	if (!currentBlockNarrativeId) {
		return (
			<div className='h-screen grid place-content-center bg-gradient-to-r from-primary to-primaryHover'>
				This narrative does not exist
			</div>
		)
	}

	if (isInvalidBlock) {
		return (
			<div className='h-screen grid place-content-center'>
				<div className='bg-stone-100 rounded-xl p-4 shadow-md shadow-stone-300'>
					<div className='text-red-500 font-semibold mb-5'>Invalid block input</div>

					<div className='hover:underline'>
						<Link to='/block'>
							<div className='flex items-center'>
								<FiArrowLeft />
								New Block
							</div>
						</Link>
					</div>
				</div>
			</div>
		)
	}

	if (Object.keys(blockData).length === 0) {
		return (
			<div className='h-screen grid place-content-center bg-gradient-to-r from-primary to-primaryHover'>
				Loading block data...
			</div>
		)
	}

	return (
		<div className='h-screen bg-gradient-to-r from-primary to-primaryHover pt-20 pl-10 pr-10'>
			<BlockMetadata
				blockNumber={blockData?.number}
				timestamp={blockData?.timestamp}
				gasUsed={blockData?.gasUsed?.toString()}
				gasLimit={blockData?.gasLimit?.toString()}
				baseFeePerGas={blockData?.baseFeePerGas?.toString()}
				minedBy={blockData?.miner}
				txLength={blockData?.transactions?.length}
				extraData={blockData?.extraData?.toString()}
				isPosting={isPosting}
				canEdit={canEdit}
				data={data}
				blockNotes={blockNotes}
				handlePostNotes={handlePostNotes}
				isSuccess={isSuccess}
				handleDelete={handleDelete}
				currentBlockNarrativeId={currentBlockNarrativeId}
				currentUser={currentUser}
				titleLabel={titleLabel}
				setTitleLabel={setTitleLabel}
			/>

			<div className='pl-36 sm:pl-64 '>
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
		</div>
	)
}

export default BlockEdit
