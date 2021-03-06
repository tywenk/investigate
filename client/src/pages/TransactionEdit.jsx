import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAlchemy } from "../context/AlchemyContext"
import { useUser, useUserUpdate } from "../context/UserContext"
import { useTransactionNotesData, usePostTransactionNotesData } from "../hooks/useTransactionNotesData"
import _ from "lodash"
import Button from "../components/Button"
import TransactionDetail from "../components/TransactionDetail"
import { FiArrowLeft, FiTrash, FiCornerUpLeft } from "react-icons/fi"
import CopyClipboardButton from "../components/CopyClipboardButton"
import { useDeleteUserNarrative } from "../hooks/useUserNarrativesData"
import TextareaAutosize from "react-textarea-autosize"

const TransactionEdit = ({ isShow = false }) => {
	const [txData, setTxData] = useState({})
	const [txNotes, setTxNotes] = useState({})
	const [titleLabel, setTitleLabel] = useState("")
	const [isInvalidTx, setIsInvalidTx] = useState(false)
	const [canEdit, setCanEdit] = useState(false)
	const [confirmDelete, setConfirmDelete] = useState(false)
	const { txHash: currentTxHash, narrId: currentTxNarrativeId } = useParams()
	const alcProvider = useAlchemy()
	const navigate = useNavigate()
	const currentUser = useUser()
	const updateCurrentUser = useUserUpdate()
	const { mutate: deleteData, isLoading: isDeleting } = useDeleteUserNarrative()
	const { data } = useTransactionNotesData(currentTxNarrativeId, setTxNotes, setTitleLabel)
	const { mutate: postNotesData, isLoading: isPosting, isSuccess } = usePostTransactionNotesData()

	const handleDelete = (endpoint, id) => {
		deleteData({ endpoint, id })
	}

	useEffect(() => {
		const data = async () => {
			try {
				const tx = await alcProvider.getTransactionReceipt(currentTxHash.toString())
				const tx2 = await alcProvider.getTransaction(currentTxHash.toString())

				if (tx) {
					tx.value = tx2.value
					setTxData(tx)
				} else {
					handleDelete("transaction_narratives", currentTxNarrativeId)
					setIsInvalidTx(true)
				}
			} catch {
				handleDelete("transaction_narratives", currentTxNarrativeId)
				setIsInvalidTx(true)
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
		postNotesData({ txNotes, titleLabel })
	}

	if (!currentTxNarrativeId) {
		return <div>This narrative does not exist</div>
	}

	if (isInvalidTx) {
		return (
			<div className='h-screen bg-fixed grid place-content-center bg-gradient-to-r from-primary to-primaryHover'>
				<div className='bg-stone-100 rounded-xl p-4 shadow-md shadow-stone-300'>
					<div className='text-red-500 font-semibold mb-5'>Invalid transaction input</div>

					<div className='hover:underline'>
						<Link to='/transaction'>
							<div className='flex items-center'>
								<FiArrowLeft />
								New Transaction
							</div>
						</Link>
					</div>
				</div>
			</div>
		)
	}

	if (Object.keys(txData).length === 0) {
		return (
			<div className='h-screen bg-gradient-to-r from-primary to-primaryHover pt-16 grid place-content-center'>
				Loading transaction data...
			</div>
		)
	}

	return (
		<div className='h-screen pt-20 pl-10 pr-10'>
			<div className='w-36 sm:w-60 fixed flex flex-col bg-stone-100 p-2 rounded-lg border border-stone-400 h-auto'>
				<div>
					<div className='text-xs font-mono text-stone-500'>Title</div>
					<div className='w-full'>
						<TextareaAutosize
							className='w-full text-lg resize-none rounded-md bg-stone-50 border border-stone-300 p-2'
							minRows={1}
							maxRows={3}
							value={titleLabel}
							onChange={(e) => setTitleLabel(e.target.value)}
						/>
					</div>
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

				<div className='relative flex py-1 items-center'>
					<div className='flex-grow border-t border-gray-400'></div>
				</div>

				{canEdit && (
					<>
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

						<div className='relative flex py-1 items-center'>
							<div className='flex-grow border-t border-gray-400'></div>
						</div>

						<div>
							{!confirmDelete ? (
								<button className='hover:underline hover:text-red-500' onClick={() => setConfirmDelete((s) => !s)}>
									<div className='flex items-center gap-1'>
										<FiTrash />
										Delete
									</div>
								</button>
							) : (
								<>
									<button
										className='hover:underline hover:text-red-500'
										onClick={() => {
											handleDelete("transaction_narratives", currentTxNarrativeId)
											navigate(`/narratives/${currentUser.address}`)
										}}
									>
										<div className='flex items-center gap-1'>
											<FiTrash />
											Confirm
										</div>
									</button>
									<button
										className='hover:underline hover:text-green-500 ml-2'
										onClick={() => setConfirmDelete((s) => !s)}
									>
										<div className='flex items-center gap-1'>
											<FiCornerUpLeft />
											Cancel
										</div>
									</button>
								</>
							)}
						</div>

						<div className='relative flex py-1 items-center'>
							<div className='flex-grow border-t border-gray-400'></div>
						</div>
					</>
				)}

				<div className='hover:underline'>
					<Link to='/transaction'>
						<div className='flex items-center'>
							<FiArrowLeft />
							New Transaction
						</div>
					</Link>
				</div>
			</div>

			<div className='pl-36 sm:pl-64 '>
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
