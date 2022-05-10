import { useState, useEffect } from "react"
import Tiptap from "../components/Tiptap"
import Button from "../components/Button"
import AddNoteButton from "../components/AddNoteButton"
import CopyClipboardButton from "../components/CopyClipboardButton"

const TransactionDetailItem = ({ label = "", data = "", noteObjKey, canEdit, txNotes, setTxNotes, children }) => {
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
		<div className='grid grid-cols-2 w-full bg-stone-200 m-1 p-2 rounded-lg border border-stone-400'>
			<div className=''>
				<div className='truncate text-xs font-mono text-stone-500'>{label}</div>
				<div className='flex items-center'>
					<div className='truncate'>{data}</div>
					{!children && <CopyClipboardButton toCopy={data} />}
				</div>
				<div>{children}</div>
			</div>

			{canEdit && !showNote ? (
				<AddNoteButton onCustomClick={handleShowNote}>Add note</AddNoteButton>
			) : (
				<div
					className={showNote ? "bg-slate-100 ml-2 mr-2 mt-2 p-2 rounded-lg flex flex-col justify-between" : "hidden"}
				>
					<Tiptap canEdit={canEdit} onNoteChange={handleOnNoteChange} content={txNotes?.[noteObjKey]} />
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

export default TransactionDetailItem
