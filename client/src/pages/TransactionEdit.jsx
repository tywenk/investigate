import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAlchemy } from "../context/AlchemyContext"
import { useUser, useUserUpdate } from "../context/UserContext"
import { useTransactionNotesData, usePostTransactionNotesData } from "../hooks/useTransactionNotesData"
import _ from "lodash"
import Button from "../components/Button"
import TransactionDetail from "../components/TransactionDetail"
import { FiArrowLeft } from "react-icons/fi"
import CopyClipboardButton from "../components/CopyClipboardButton"

const TransactionEdit = ({ isShow = false }) => {
	const [txData, setTxData] = useState({})
	const [txNotes, setTxNotes] = useState({})
	const [isInvalidBlock, setIsInvalidBlock] = useState(false)
	const [canEdit, setCanEdit] = useState(false)
	const { txHash: currentTxHash, narrId: currentTxNarrativeId } = useParams()
	const alcProvider = useAlchemy()
	const currentUser = useUser()
	const updateCurrentUser = useUserUpdate()

	const { data } = useTransactionNotesData(currentTxNarrativeId, setTxNotes)
	console.log(txData)
	const { mutate: postNotesData, isLoading: isPosting, isSuccess } = usePostTransactionNotesData()

	useEffect(() => {
		const data = async () => {
			const tx = await alcProvider.getTransactionReceipt(currentTxHash.toString())
			const tx2 = await alcProvider.getTransaction(currentTxHash.toString())

			if (tx) {
				tx.value = tx2.value
				setTxData(tx)
			} else {
				setIsInvalidBlock(true)
			}
		}

		if (currentTxHash !== undefined) {
			data()
		}
	}, [currentTxHash, alcProvider])

	useEffect(() => {
		if (currentUser?.transaction_narratives?.some((tx) => tx.id === parseInt(currentTxNarrativeId)) && !isShow) {
			setCanEdit(true)
		} else {
			!canEdit && setCanEdit(false)
		}
	}, [currentUser, currentTxNarrativeId])

	useEffect(() => {
		if (Object.keys(currentUser).length > 0 && data) {
			updateCurrentUser((currUserData) => ({
				...currUserData,
				transaction_narratives: [...currUserData?.transaction_narratives, data],
			}))
		}
	}, [data])

	const handlePostNotes = async () => {
		postNotesData(txNotes)
	}

	if (!currentTxNarrativeId) {
		return <div>This narrative does not exist</div>
	}

	if (isInvalidBlock) {
		return (
			<div>
				<div>Invalid Transaction Input</div>
				<Link to='/transaction'>Try again</Link> p
			</div>
		)
	}

	if (Object.keys(txData).length === 0) {
		return <div>Loading block data...</div>
	}

	return (
		<div className='h-screen bg-scroll bg-gradient-to-r from-primary to-primaryHover pt-20 pl-10 pr-10'>
			<div className='w-36 sm:w-60 fixed flex flex-col bg-stone-200 p-2 rounded-lg border border-stone-400 h-auto'>
				<div>
					<div className='text-xs font-mono text-stone-500'>Transaction Hash</div>
					<div className='flex items-center'>
						<div className='truncate font-semibold '>{txData?.transactionHash}</div>
						<CopyClipboardButton toCopy={txData?.transactionHash} />
					</div>
					<div className='grid grid-cols-2'>
						<div>
							<div className='text-xs font-mono text-stone-500 mt-2'>Block Number</div>
							<div className='truncate'>{txData?.blockNumber}</div>
						</div>
						<div>
							<div className='text-xs font-mono text-stone-500 mt-2'>Index</div>
							<div className='truncate'>{txData?.transactionIndex}</div>
						</div>
					</div>
					<div className='text-xs font-mono text-stone-500 mt-2'>Status</div>
					<div>
						{txData?.status === 1 ? (
							<span className='text-green-600'>Successful</span>
						) : (
							<span className='text-red-500'>Reverted</span>
						)}
					</div>
				</div>

				<div class='relative flex py-1 items-center'>
					<div class='flex-grow border-t border-gray-400'></div>
					<span class='flex-shrink mx-2 text-gray-400'>Content</span>
					<div class='flex-grow border-t border-gray-400'></div>
				</div>

				{canEdit && (
					<div className='flex flex-row space-between'>
						<div>
							<Button customOnClick={handlePostNotes}>{isPosting ? <div>Saving...</div> : <div>Save</div>}</Button>
							{_.isEqual(data, txNotes) ? (
								isSuccess && (
									<span className='rounded-md border bg-stone-300 border-stone-400 px-2 py-0.5 m-1 transition-opacity'>
										Saved
									</span>
								)
							) : (
								<span className='rounded-md border bg-yellow-300 border-yellow-400 px-2 py-0.5 m-1'>
									Unsaved changes
								</span>
							)}
						</div>
					</div>
				)}
				<div className='hover:underline pt-2'>
					<Link to='/transaction'>
						<div className='flex items-center'>
							<FiArrowLeft />
							New Transaction
						</div>
					</Link>
				</div>
			</div>

			<div className='pl-36 sm:pl-64 self-end'>
				<TransactionDetail
					canEdit={canEdit}
					tx={txData}
					alcProvider={alcProvider}
					currentTxNarrativeId={currentTxNarrativeId}
					txNotes={txNotes}
					setTxNotes={setTxNotes}
					isShow={isShow}
				/>
			</div>
		</div>
	)
}

export default TransactionEdit
