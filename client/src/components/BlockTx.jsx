import { ethers } from "ethers"
import { useState, useRef, useEffect } from "react"
import Tiptap from "../components/Tiptap"
import Button from "../components/Button"
import BlockTxMore from "../components/BlockTxMore"
import CopyableItem from "../components/CopyableItem"
import AddNoteButton from "../components/AddNoteButton"

const BlockTx = ({ tx, blockNotes, setBlockNotes, currentBlockNarrativeId, isShow, canEdit }) => {
	const [showNote, setShowNote] = useState(false)
	const [isShowMore, setIsShowMore] = useState(false)
	const [noteContent, setNoteContent] = useState("")
	// const noteInputRef = useRef()

	// useEffect(() => {
	// 	if (showNote === true) {
	// 		noteInputRef.current.focus()
	// 	}
	// }, [showNote])

	useEffect(() => {
		if (noteContent) {
			setBlockNotes((prevBlockNotes) => {
				return {
					...prevBlockNotes,
					[tx?.hash]: {
						id: [tx?.hash]?.id,
						tx_hash: tx?.hash,
						block_narrative_id: parseInt(currentBlockNarrativeId),
						note: noteContent,
					},
				}
			})
		}
	}, [noteContent])

	useEffect(() => {
		if (showNote !== true && blockNotes?.[tx?.hash]?.note) {
			setShowNote(true)
		}
	}, [blockNotes, showNote, tx])

	const handleOnNoteChange = (noteStr) => {
		setNoteContent(noteStr)
	}

	const handleShowNote = () => {
		setShowNote(true)
	}

	const handleDiscardNote = () => {
		setBlockNotes((prevBlockNotes) => {
			return {
				...prevBlockNotes,
				[tx?.hash]: {
					...prevBlockNotes?.[tx?.hash],
					tx_hash: tx?.hash,
					block_narrative_id: currentBlockNarrativeId,
					note: "",
				},
			}
		})
		setShowNote(false)
	}

	return (
		<div className='grid grid-cols-2 w-full bg-stone-100 mx-1 mb-1 p-2 rounded-lg border border-stone-400'>
			<div>
				<div className='text-xs font-mono text-stone-50 bg-primaryHover w-fit h-fit rounded-lg p-1 mb-2'>
					Index {tx?.transactionIndex}
				</div>
				<div>
					<div className='truncate text-xs font-mono text-stone-500'>Hash</div>
					<CopyableItem data={tx?.hash} />
				</div>

				<div className='grid grid-cols-3 gap-x-4'>
					<div>
						<div className='truncate text-xs font-mono text-stone-500 mt-2'>Value</div>
						<CopyableItem data={ethers.utils.formatEther(tx?.value)} unit={"eth"} />
					</div>
					<div>
						<div className='truncate text-xs font-mono text-stone-500 mt-2'>Gas Limit</div>
						<CopyableItem data={ethers.utils.commify(ethers.utils.formatUnits(tx?.gasLimit, "wei"))} unit={"gas"} />
					</div>
					<div>
						<div className='truncate text-xs font-mono text-stone-500 mt-2'>Gas Price</div>
						<CopyableItem data={ethers.utils.formatUnits(tx?.gasPrice, "gwei")} unit={"gwei"} />
					</div>
				</div>

				<div className='grid grid-cols-2 gap-x-4'>
					<div>
						<div className='truncate text-xs font-mono text-stone-500 mt-2'>From</div>
						<CopyableItem data={tx?.from} />
					</div>
					<div>
						<div className='truncate text-xs font-mono text-stone-500 mt-2'>To</div>
						<CopyableItem data={tx?.to} />
					</div>
				</div>

				{!isShowMore ? (
					<button className='hover:underline text-stone-600 mt-4' onClick={() => setIsShowMore(!isShowMore)}>
						Show more
					</button>
				) : (
					<>
						<BlockTxMore tx={tx} />

						<button className='hover:underline text-stone-600 mt-4' onClick={() => setIsShowMore(!isShowMore)}>
							Show less
						</button>
					</>
				)}
			</div>

			{!showNote && canEdit ? (
				<AddNoteButton onCustomClick={handleShowNote}>Add note</AddNoteButton>
			) : (
				<div className={showNote ? "bg-stone-50 border border-stone-300 m-2 p-2 rounded-lg" : "hidden"}>
					<Tiptap canEdit={canEdit} onNoteChange={handleOnNoteChange} content={blockNotes?.[tx?.hash]?.note} />

					{canEdit && (
						<div className='flex justify-end'>
							<button className='hover:underline text-sm ml-2 mr-2 hover:text-red-500' onClick={handleDiscardNote}>
								Discard
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default BlockTx
