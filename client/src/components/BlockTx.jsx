import { ethers } from "ethers"
import { useState, useRef, useEffect } from "react"
import { useUser } from "../context/UserContext"
import Tiptap from "../components/Tiptap"
import Button from "../components/Button"
import BlockTxMore from "../components/BlockTxMore"

const BlockTx = ({ tx, blockNotes, setBlockNotes, currentBlockNarrativeId, isShow }) => {
	const [showNote, setShowNote] = useState(false)
	const [isShowMore, setIsShowMore] = useState(false)
	const [noteContent, setNoteContent] = useState("")
	const [canEdit, setCanEdit] = useState(false)
	const noteInputRef = useRef()
	const currentUser = useUser()

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
						label: [tx?.hash]?.label,
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

		if (currentUser?.block_narratives?.some((bn) => parseInt(bn.id) === parseInt(currentBlockNarrativeId)) && !isShow) {
			setCanEdit(true)
		} else {
			!canEdit && setCanEdit(false)
		}
	}, [blockNotes, currentUser, currentBlockNarrativeId, isShow, showNote, canEdit, tx?.hash])

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
		<div className='grid grid-cols-2 w-1/2'>
			<div className='bg-slate-100 m-2 p-2 rounded-lg'>
				<div>{tx?.transactionIndex}</div>
				<div className=' truncate'>{tx?.hash}</div>
				<div className=''>Value: {ethers.utils.formatEther(tx?.value)} ETH</div>
				<div className=''>Gas Limit: {ethers.utils.formatUnits(tx?.gasLimit, "wei")} gas</div>
				<div className=''>Gas Price: {ethers.utils.formatUnits(tx?.gasPrice, "gwei")} gwei</div>
				<div className=' truncate'>From: {tx?.from}</div>
				<div className=' truncate'>To: {tx?.to}</div>
				{!isShowMore ? (
					<button onClick={() => setIsShowMore(!isShowMore)}>Show more</button>
				) : (
					<>
						<BlockTxMore tx={tx} />
						<button onClick={() => setIsShowMore(!isShowMore)}>Show less</button>
					</>
				)}
			</div>
			{!showNote && canEdit ? (
				<button onClick={handleShowNote} className='border m-2 p-2 rounded-xl'>
					Add note
				</button>
			) : (
				<div className={showNote ? "bg-slate-100 m-2 p-2 rounded-lg" : "hidden"}>
					<Tiptap canEdit={canEdit} onNoteChange={handleOnNoteChange} content={blockNotes?.[tx?.hash]?.note} />

					{canEdit && <Button customOnClick={handleDiscardNote}>Discard</Button>}
				</div>
			)}
		</div>
	)
}

export default BlockTx
