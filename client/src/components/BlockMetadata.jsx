import { useState } from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { ethers } from "ethers"
import CopyClipboardButton from "../components/CopyClipboardButton"
import _ from "lodash"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom"
import { FiArrowLeft, FiTrash, FiCornerUpLeft } from "react-icons/fi"
import TextareaAutosize from "react-textarea-autosize"

dayjs.extend(utc)

const BlockMetadata = ({
	blockNumber,
	timestamp,
	gasUsed,
	gasLimit,
	baseFeePerGas,
	minedBy,
	txLength,
	extraData,
	canEdit,
	data,
	isPosting,
	blockNotes,
	handlePostNotes,
	isSuccess,
	handleDelete,
	currentBlockNarrativeId,
	currentUser,
	titleLabel,
	setTitleLabel,
}) => {
	const [confirmDelete, setConfirmDelete] = useState(false)
	const navigate = useNavigate()

	return (
		<div className='w-36 sm:w-60 fixed flex flex-col bg-stone-100 p-2 rounded-lg border border-stone-400 h-auto'>
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
			<div>
				<div className='text-xs font-mono text-stone-500'>Block Number</div>
				<div className='flex items-center'>
					<div className='truncate font-semibold '>{blockNumber}</div>
					<CopyClipboardButton toCopy={blockNumber} />
				</div>

				<div className='text-xs font-mono text-stone-500 mt-2 '>Transactions</div>
				<div>{txLength}</div>

				<div className='text-xs font-mono text-stone-500 mt-2'>Timestamp </div>
				<div>
					<span>{dayjs.unix(timestamp).utc().format("YYYY-MM-DDTHH:mm:ss:SSS[+UTC]")} </span>
					<span className='italic'> {dayjs.unix(timestamp).format("MMM D, YYYY,  h:mm:ss a")}</span>
				</div>
				<div className='text-xs font-mono text-stone-500 mt-2'>Gas Used </div>

				<div className='flex items-center'>
					<div className='truncate '>{ethers.utils.commify(gasUsed)} gas</div>
					<CopyClipboardButton toCopy={ethers.utils.commify(gasUsed)} />
				</div>
				<div className='text-xs font-mono text-stone-500 mt-2'>Gas Limit</div>

				<div className='flex items-center'>
					<div className='truncate '>{ethers.utils.commify(gasLimit)} gas</div>
					<CopyClipboardButton toCopy={ethers.utils.commify(gasLimit)} />
				</div>

				<div className='text-xs font-mono text-stone-500 mt-2'>Base Fee Per Gas</div>

				<div className='flex items-center'>
					<div className='truncate '>{ethers.utils.formatUnits(baseFeePerGas, "gwei")} gwei</div>
					<CopyClipboardButton toCopy={ethers.utils.formatUnits(baseFeePerGas, "gwei")} />
				</div>

				<div className='text-xs font-mono text-stone-500 mt-2 '>Mined By</div>
				<div className='flex items-center'>
					<div className='truncate '>{minedBy}</div>
					<CopyClipboardButton toCopy={minedBy} />
				</div>

				<div className='relative flex py-1 items-center'>
					<div className='flex-grow border-t border-gray-400'></div>
				</div>

				{canEdit && (
					<>
						<div className='flex flex-row space-between'>
							<div>
								<Button customOnClick={handlePostNotes}>{isPosting ? <div>Saving...</div> : <div>Save</div>}</Button>
								{_.isEqual(data, blockNotes) ? (
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
											handleDelete("block_narratives", currentBlockNarrativeId)
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
					<Link to='/block'>
						<div className='flex items-center gap-1'>
							<FiArrowLeft />
							New Block
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default BlockMetadata
