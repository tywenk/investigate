import { useState, useEffect } from "react"
import Tiptap from "../components/Tiptap"
import Button from "../components/Button"
import AddNoteButton from "../components/AddNoteButton"
import CopyClipboardButton from "../components/CopyClipboardButton"

const TransactionDetailItem = ({ label, data, noteObjKey, canEdit, txNotes, setTxNotes }) => {
	const [showNote, setShowNote] = useState(false)

	useEffect(() => {
		//if tx has notes, set show true
		if (txNotes?.[noteObjKey] && txNotes !== true) {
			setShowNote(true)
		}
	}, [txNotes, setShowNote])

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
				[noteObjKey]: null,
			}
		})
		setShowNote(false)
	}

	return (
		<div className='grid grid-cols-2 w-1/2 bg-primary m-1 p-2 rounded-lg'>
			<div className='flex items-center truncate'>
				<div className='truncate'>
					{label} {data}
				</div>
				<CopyClipboardButton toCopy={data} />
			</div>

			{canEdit && !showNote ? (
				<AddNoteButton onCustomClick={handleShowNote}>Add note</AddNoteButton>
			) : (
				<div className={showNote ? "bg-slate-100 m-2 p-2 rounded-lg" : "hidden"}>
					<Tiptap canEdit={canEdit} onNoteChange={handleOnNoteChange} content={txNotes?.[noteObjKey]} />
					{canEdit && <Button customOnClick={handleDiscardNote}>Discard</Button>}
				</div>
			)}
		</div>
	)
}

export default TransactionDetailItem
