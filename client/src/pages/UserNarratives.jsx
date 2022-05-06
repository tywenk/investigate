import { useNavigate } from "react-router-dom"
import Tiptap from "../components/Tiptap"
import dayjs from "dayjs"
import { useUserNarrativesData, useDeleteUserNarrative } from "../hooks/useUserNarrativesData"

const UserNarratives = () => {
	const { data, isLoading } = useUserNarrativesData()
	const { mutate: deleteData, isLoading: isDeleting } = useDeleteUserNarrative()
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
		navigate(`/${base}/${narritiveId}/${hashOrNum}/edit`)
	}

	const handleDelete = (endpoint, id) => {
		deleteData({ endpoint, id })
	}

	if (isLoading) {
		return <div className=''>Loading you narratives...</div>
	}

	return (
		<div>
			<div>
				<h1>Blocks</h1>
				<div className='flex flex-row overflow-x-auto'>
					{data?.block_narrs &&
						data?.block_narrs.map((block, index) => {
							return (
								<div key={block.block.block_num + index} className='bg-slate-100 m-1 p-2 rounded-lg w-1/5'>
									<div>Block: {block.block.block_num}</div>
									<div className='text-sm'>{dayjs(block.created_at).format("MMM DD, YYYY h:mma")}</div>
									<div>
										{block.block_notes.map((note, index) => {
											return (
												<div key={note?.tx_hash + index} className='bg-orange-200'>
													<div className='truncate'>{note?.tx_hash}</div>
													{note?.note && <Tiptap canEdit={false} content={note?.note} />}
												</div>
											)
										})}
									</div>
									<button onClick={() => handleOnClick("block", block.id, block.block.block_num)}>Open</button>
									<button onClick={() => handleDelete("block_narratives", block.id)}>Delete</button>
								</div>
							)
						})}
				</div>
			</div>
			<div>
				{data?.txn_narrs &&
					data?.txn_narrs.map((txn, index) => {
						return (
							<div key={txn.txn.txn_hash + index} className='bg-green-100 m-1 p-2 rounded-lg'>
								<div>Hash: {txn.txn.txn_hash}</div>
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
								<button onClick={() => handleDelete("transaction_narratives", txn.id)}>Delete</button>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default UserNarratives
