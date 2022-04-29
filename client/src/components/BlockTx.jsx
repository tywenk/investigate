import { ethers } from "ethers"
import { useState, useRef } from "react"

const BlockTx = ({ tx }) => {
	const [showNote, setShowNote] = useState(false)
	const [noteContent, setNoteContent] = useState("")
	const noteInputRef = useRef(null)

	const handleShowNote = () => {
		setShowNote(true)
		noteInputRef.current.focus()
	}

	const handleDiscardNote = () => {}

	return (
		<div className='grid grid-cols-2'>
			<div className='bg-slate-100 m-2 p-2 rounded-lg'>
				<div>{tx?.transactionIndex}</div>
				<div className=' truncate'>{tx?.hash}</div>
				<div className=''>Value: {ethers.utils.formatEther(tx?.value)} ETH</div>
				<div className=''>
					Gas Limit: {ethers.utils.formatUnits(tx?.gasLimit, "wei")} wei
				</div>
				<div className=''>
					Gas Price: {ethers.utils.formatUnits(tx?.gasPrice, "gwei")} gwei
				</div>
			</div>
			{!showNote ? (
				<button onClick={handleShowNote}>Add note</button>
			) : (
				<div className='bg-slate-100 m-2 p-2 rounded-lg'>
					<form>
						<input
							ref={noteInputRef}
							type='text'
							className=''
							placeholder='Add a note...'
							value={noteContent}
							onChange={(e) => setNoteContent(e.target.value)}
						></input>
					</form>
					<button onClick={handleDiscardNote}>Discard</button>
				</div>
			)}
		</div>
	)
}

export default BlockTx
