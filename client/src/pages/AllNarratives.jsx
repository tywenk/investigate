import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { useAllNarrativesData } from "../hooks/useAllNarrativesData"
import Tiptap from "../components/Tiptap"
import { FiArrowRight } from "react-icons/fi"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import { useUser } from "../context/UserContext"

const AllNarratives = () => {
	const { data } = useAllNarrativesData()
	const navigate = useNavigate()
	const currentUser = useUser()

	console.log(data)

	const txnNoteAttributes = [
		"note_contract_address",
		"note_effective_gas_price",
		"note_from",
		"note_to",
		"note_logs",
		"note_gas_used",
	]

	const handleOnClick = (base, narritiveId, hashOrNum, edit = false) => {
		console.log("click")
		edit ? navigate(`/${base}/${narritiveId}/${hashOrNum}/edit`) : navigate(`/${base}/${narritiveId}/${hashOrNum}`)
	}

	const parseTxNoteAttr = (attr) => {
		switch (attr) {
			case "note_to":
				return "To"
			case "note_from":
				return "From"
			case "note_logs":
				return "Logs"
			case "note_contract_address":
				return "Contract"
			case "note_effective_gas_price":
				return "Effective Gas Price"
			case "note_value":
				return "Value"
			case "note_gas_used":
				return "Gas Used"
			default:
				return attr
		}
	}

	return (
		<div className='h-screen bg-gradient-to-r from-primary to-primaryHover pt-10'>
			<h1 className='text-xl font-bold pt-5 pl-5'>All Block Narratives</h1>
			<button />
			<div className='flex flex-row snap-x overflow-x-auto mb-3 pb-3 scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-transparent'>
				{data?.[0] &&
					data?.[0].map((block, index) => {
						return (
							<div
								key={block.block.block_num + index}
								className='h-full bg-stone-200 border border-stone-400 m-1 p-2 rounded-lg snap-center sm:w-32 md:w-64 lg:w-96 flex flex-col space-between'
							>
								{/* Header */}
								<div className='mb-3 flex flex-col sm:w-32 md:w-64 lg:w-96'>
									<div className='grid grid-cols-3 divide-x divide-dotted divide-stone-500 w-full'>
										<div className='col-span-1'>
											<div className='text-xs font-mono text-stone-500'>Block</div>
											<div className='font-bold text-lg p-0.5 truncate'>{block.block.block_num}</div>
										</div>
										<div className='col-span-2'>
											<div className=''>
												<div className='p-0.5 ml-3'>
													<div className='text-xs font-mono text-stone-500'>User</div>
													<Link to={`/explore/${block.user.address}`}>
														<div className='truncate text-sm hover:underline hover:decoration-blue-400 decoration-2 decoration-secondary rounded-lg'>
															{block.user.ens || block.user.address}
														</div>
													</Link>
												</div>
												<div className='p-0.5 ml-3'>
													<div className='text-xs font-mono text-stone-500'>Created</div>
													<div className='truncate text-sm text-stone-700'>
														{dayjs(block.created_at).format("MMM DD, YYYY h:mma")}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Tx Notes */}
								<div className='max-h-52 overflow-y-auto rounded-lg w-full'>
									{block.block_notes.map((note, index) => {
										return (
											<>
												{note?.note && (
													<div key={note?.tx_hash + index} className='bg-stone-100 rounded-md p-1 m-0.5'>
														<div className='truncate px-2 font-mono text-xs text-stone-500 mt-1 mb-1'>
															Transaction: {note?.tx_hash}
														</div>
														<Tiptap canEdit={false} content={note?.note} />
													</div>
												)}
											</>
										)
									})}
									{block.block_notes.length <= 0 && (
										<div className='bg-stone-100 rounded-md p-1 m-0.5 w-100'>
											<div>
												<div className='truncate px-2 font-mono text-xs text-stone-500 mt-1 mb-1'>No notes</div>
											</div>
										</div>
									)}
								</div>

								{/* CTA buttons */}
								<div className='flex justify-end'>
									{currentUser.address === block.user.address && (
										<button
											className='rounded-full border bg-secondary border-blue-400 hover:bg-secondaryHover hover:border-blue-300 px-2 m-1 transition ease-in-out'
											onClick={() => handleOnClick("block", block.id, block.block.block_num, true)}
										>
											<div className='flex items-center'>Edit</div>
										</button>
									)}
									<button
										className='rounded-full border bg-secondary border-blue-400 hover:bg-secondaryHover hover:border-blue-300 px-2 m-1 transition ease-in-out'
										onClick={() => handleOnClick("block", block.id, block.block.block_num)}
									>
										<div className='flex items-center'>
											Open
											<FiArrowRight />
										</div>
									</button>
								</div>
							</div>
						)
					})}
			</div>
			<h1 className='text-xl font-bold pt-5 pl-5 pb-5'>All Transaction Narratives</h1>
			<div className='flex flex-row snap-x overflow-x-auto mb-3 pb-3 scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-transparent'>
				{data?.[1] &&
					data?.[1].map((txn, index) => {
						return (
							<div
								key={txn.txn.txn_hash + index}
								className='h-full bg-stone-200 border border-stone-400 m-1 p-2 rounded-lg snap-center sm:w-32 md:w-64 lg:w-96 flex flex-col space-between'
							>
								<div className='mb-3 flex flex-col sm:w-32 md:w-64 lg:w-96'>
									<div className='grid grid-cols-3 divide-x divide-dotted divide-stone-500 w-full'>
										<div className='col-span-1'>
											<div className='text-xs font-mono text-stone-500'>Transaction</div>
											<div className='font-bold text-lg p-0.5 truncate'>{txn.txn.txn_hash}</div>
										</div>
										<div className='col-span-2'>
											<div className=''>
												<div className='p-0.5 ml-3'>
													<div className='text-xs font-mono text-stone-500'>User</div>
													<Link to={`/explore/${txn.user.address}`}>
														<div className='truncate text-sm hover:underline hover:decoration-blue-400 decoration-2 decoration-secondary rounded-lg'>
															{txn.user.ens || txn.user.address}
														</div>
													</Link>
												</div>
												<div className='p-0.5 ml-3'>
													<div className='text-xs font-mono text-stone-500'>Created</div>
													<div className='truncate text-sm text-stone-700'>
														{dayjs(txn.created_at).format("MMM DD, YYYY h:mma")}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className='max-h-52 overflow-y-auto rounded-lg w-full'>
									{txnNoteAttributes.map((attr, index) => {
										return (
											<div key={attr + index}>
												{txn?.[attr] && (
													<div className='bg-stone-100 rounded-md p-1 m-0.5'>
														<div className='truncate px-2 font-mono text-xs text-stone-500 mt-1 mb-1'>
															{parseTxNoteAttr(attr)}
														</div>
														{<Tiptap canEdit={false} content={txn?.[attr]} />}
													</div>
												)}
											</div>
										)
									})}
								</div>

								<div className='flex justify-end'>
									{currentUser.address === txn.user.address && (
										<button
											className='rounded-full border bg-secondary border-blue-400 hover:bg-secondaryHover hover:border-blue-300 px-2 m-1 transition ease-in-out'
											onClick={() => handleOnClick("transaction", txn.id, txn.txn.txn_hash, true)}
										>
											<div className='flex items-center'>Edit</div>
										</button>
									)}
									<button
										className='rounded-full border bg-secondary border-blue-400 hover:bg-secondaryHover hover:border-blue-300 px-2 m-1 transition ease-in-out'
										onClick={() => handleOnClick("transaction", txn.id, txn.txn.txn_hash)}
									>
										<div className='flex items-center'>
											Open
											<FiArrowRight />
										</div>
									</button>
								</div>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default AllNarratives
