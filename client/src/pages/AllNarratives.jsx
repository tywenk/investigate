import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { useAllNarrativesData } from "../hooks/useAllNarrativesData"
import Tiptap from "../components/Tiptap"
import { FiArrowRight } from "react-icons/fi"
import { Link } from "react-router-dom"
import Button from "../components/Button"

const AllNarratives = () => {
	const { data } = useAllNarrativesData()
	const navigate = useNavigate()

	console.log(data)

	const txnNoteAttributes = [
		"note_contract_address",
		"note_effective_gas_price",
		"note_from",
		"note_to",
		"note_logs",
		"note_gas_used",
	]

	const handleOnClick = (base, narritiveId, hashOrNum) => {
		console.log("click")
		navigate(`/${base}/${narritiveId}/${hashOrNum}`)
	}

	return (
		<div className='grow bg-gradient-to-r from-primary to-primaryHover'>
			<h1>Blocks</h1>
			<button />
			<div className='flex flex-row snap-x overflow-x-auto mb-3 pb-3 scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-transparent'>
				{data?.[0] &&
					data?.[0].map((block, index) => {
						return (
							<div
								key={block.block.block_num + index}
								className='h-full bg-stone-200 border border-stone-400 m-1 p-2 rounded-lg snap-center sm:w-32 md:w-64 lg:w-96 flex flex-col space-between'
							>
								<div>
									<div className='grid grid-cols-2 divide-x divide-dotted divide-stone-500 w-full'>
										<div className='font-bold p-0.5 truncate'>Block {block.block.block_num}</div>
										<Link to={`/explore/${block.user.address}`}>
											<div className='truncate hover:underline hover:decoration-blue-400 rounded-lg p-0.5 ml-3'>
												By: {block.user.ens || block.user.address}
											</div>
										</Link>
									</div>
									<div className='truncate text-sm text-stone-700'>
										Created: {dayjs(block.created_at).format("MMM DD, YYYY h:mma")}
									</div>
								</div>

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

								<div className='grid justify-items-end'>
									<button
										className='rounded-full border bg-secondary border-blue-400 hover:bg-secondaryHover hover:border-blue-300 px-2 m-1'
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
			<h1>Transactions</h1>
			<div className='flex flex-row snap-x overflow-x-auto mb-3 pb-3 scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-transparent'>
				{data?.[1] &&
					data?.[1].map((txn, index) => {
						return (
							<div
								key={txn.txn.txn_hash + index}
								className='h-full bg-stone-200 border border-stone-400 m-1 p-2 rounded-lg snap-center sm:w-32 md:w-64 lg:w-96 flex flex-col space-between'
							>
								<div>
									<div className='grid grid-cols-2 divide-x divide-dotted divide-stone-500 w-full'>
										<div className='font-bold p-0.5 truncate'>Hash: {txn.txn.txn_hash}</div>
										<Link to={`/explore/${txn.user.address}`}>
											<div className='truncate hover:underline hover:decoration-blue-400 rounded-lg p-0.5 ml-3'>
												By: {txn.user.ens || txn.user.address}
											</div>
										</Link>
									</div>
									<div className='truncate text-sm text-stone-700'>
										Created: {dayjs(txn.created_at).format("MMM DD, YYYY h:mma")}
									</div>
								</div>

								<div className='max-h-52 overflow-y-auto rounded-lg w-full'>
									{txnNoteAttributes.map((attr, index) => {
										return (
											<div key={attr + index}>
												{txn?.[attr] && (
													<div className='bg-stone-100 rounded-md p-1 m-0.5'>
														<div className='truncate px-2 font-mono text-xs text-stone-500 mt-1 mb-1'>
															Attribute: {attr}
														</div>
														{<Tiptap canEdit={false} content={txn?.[attr]} />}
													</div>
												)}
											</div>
										)
									})}
								</div>

								<div className='grid justify-items-end'>
									<button
										className='rounded-full border bg-secondary border-blue-400 hover:bg-secondaryHover hover:border-blue-300 px-2 m-1'
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
				{/* {data?.[1] &&
					data?.[1].map((txn, index) => {
						return (
							<div key={txn.txn.txn_hash + index} className='bg-green-100 m-1 p-2 rounded-lg w-1/5'>
								<Link to={`/transaction/${txn.investigation.id}/${txn.txn.txn_hash}`}>
									<div className='truncate'>Hash: {txn.txn.txn_hash}</div>
								</Link>
								<Link to={`/explore/${txn.user.address}`}>
									<div className='truncate'>By: {txn.user.ens || txn.user.address}</div>
								</Link>
								<div>
									{txnNoteAttributes.map((attr, index) => {
										return (
											<div key={attr + index}>
												{txn?.[attr] && <div>{attr}</div>}
												{txn?.[attr] && <Tiptap canEdit={false} content={txn?.[attr]} />}
											</div>
										)
									})}
								</div>
								<button onClick={() => handleOnClick("transaction", txn.id, txn.txn.txn_hash)}>Open</button>
							</div>
						)
					})} */}
			</div>
		</div>
	)
}

export default AllNarratives
