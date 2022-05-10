import dayjs from "dayjs"
import Tiptap from "../components/Tiptap"
import { FiArrowRight } from "react-icons/fi"
import { Link } from "react-router-dom"

const ExploreTransaction = ({ txn, handleOnClick, currentUser }) => {
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

	const txnNoteAttributes = [
		"note_contract_address",
		"note_effective_gas_price",
		"note_from",
		"note_to",
		"note_logs",
		"note_gas_used",
	]

	return (
		<div className='h-full bg-stone-200 border border-stone-400 m-1 p-2 rounded-lg snap-center sm:w-32 md:w-64 lg:w-96 flex flex-col space-between'>
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
}

export default ExploreTransaction
