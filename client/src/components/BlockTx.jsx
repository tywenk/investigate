import { ethers } from "ethers"
import { useState, useRef, useEffect } from "react"
import TextareaAutosize from "react-textarea-autosize"
import Button from "../components/Button"

const BlockTx = ({
	tx,
	selectedTxs,
	setSelectedTxs,
	currentBlockNarrativeId,
	isShow,
}) => {
	const [showNote, setShowNote] = useState(false)
	const [noteContent, setNoteContent] = useState("")
	const [isShowMore, setIsShowMore] = useState(false)
	const noteInputRef = useRef()

	useEffect(() => {
		if (showNote === true) {
			noteInputRef.current.focus()
		}
	}, [showNote])

	useEffect(() => {
		setNoteContent(selectedTxs?.[tx?.hash]?.note)
		if (selectedTxs?.[tx?.hash]?.note) {
			setShowNote(true)
		}
	}, [])

	const handleOnNoteChange = (e) => {
		setNoteContent(e.target.value)
		const note = {
			tx_hash: tx?.hash,
			label: "",
			note: noteContent,
			block_narrative_id: parseInt(currentBlockNarrativeId),
		}
		const newTxs = { ...selectedTxs, [tx?.hash]: note }
		setSelectedTxs(newTxs)
		// setSelectedTxs((currTxs) => {
		// 	return { ...currTxs, [tx?.hash]: note }
		// })
	}

	const handleShowNote = () => {
		setShowNote(true)
	}

	const handleDiscardNote = () => {
		setShowNote(false)
		setNoteContent("")
	}

	return (
		<div className='grid grid-cols-2 w-1/2'>
			<div className='bg-slate-100 m-2 p-2 rounded-lg'>
				<div>{tx?.transactionIndex}</div>
				<div className=' truncate'>{tx?.hash}</div>
				<div className=''>Value: {ethers.utils.formatEther(tx?.value)} ETH</div>
				<div className=''>
					Gas Limit: {ethers.utils.formatUnits(tx?.gasLimit, "wei")} gas
				</div>
				<div className=''>
					Gas Price: {ethers.utils.formatUnits(tx?.gasPrice, "gwei")} gwei
				</div>
				{!isShowMore ? (
					<button onClick={() => setIsShowMore(!isShowMore)}>Show more</button>
				) : (
					<>
						<div className=' truncate'>From: {tx?.from}</div>
						<div className=' truncate'>To: {tx?.to}</div>
						<button onClick={() => setIsShowMore(!isShowMore)}>
							Show less
						</button>
					</>
				)}
			</div>
			{!showNote ? (
				<button onClick={handleShowNote} className='border m-2 p-2 rounded-xl'>
					Add note
				</button>
			) : (
				<div className='bg-slate-100 m-2 p-2 rounded-lg'>
					<form>
						<TextareaAutosize
							ref={noteInputRef}
							minRows={2}
							maxRows={6}
							className='w-full rounded-md resize-none p-2'
							placeholder='Add a note...'
							value={noteContent}
							onChange={handleOnNoteChange}
							readOnly={isShow ? true : false}
						/>
					</form>
					<Button customOnClick={handleDiscardNote}>Discard</Button>
				</div>
			)}
		</div>
	)
}

export default BlockTx
