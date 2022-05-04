import { useState, useEffect } from "react"
import Tiptap from "../components/Tiptap"
import Button from "../components/Button"

const TransactionDetailItem = ({ label, data, noteObjKey, canEdit, txNotes, setTxNotes }) => {
	const [showNote, setShowNote] = useState(false)

	useEffect(() => {
		//if tx has notes, set show true
		// if (blockNotes?.[tx?.hash]?.note && showNote !== true) {
		// 	setShowNote(true)
		// }
	}, [])

	const handleOnNoteChange = (noteContent) => {
		setTxNotes((prevTxNotes) => {
			return {
				...prevTxNotes,
				[noteObjKey]: noteContent,
			}
		})
	}

	const handleShowNote = () => {
		setShowNote(true)
	}

	const handleDiscardNote = (noteContent) => {
		setTxNotes((prevTxNotes) => {
			return {
				...prevTxNotes,
				[noteObjKey]: noteContent,
			}
		})
	}

	return (
		<div className='grid grid-cols-2'>
			<div>
				{label} {data}
			</div>

			{!showNote && canEdit ? (
				<button onClick={handleShowNote} className='border m-2 p-2 rounded-xl'>
					Add note
				</button>
			) : (
				<div className={showNote ? "bg-slate-100 m-2 p-2 rounded-lg" : "hidden"}>
					<Tiptap canEdit={canEdit} onNoteChange={handleOnNoteChange} content={txNotes?.[noteObjKey]} />
					<Button customOnClick={handleDiscardNote}>Discard</Button>
				</div>
			)}
		</div>
	)
}

export default TransactionDetailItem
