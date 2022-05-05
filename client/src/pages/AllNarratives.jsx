import { useNavigate } from "react-router-dom"
import Tiptap from "../components/Tiptap"
import { useAllNarrativesData } from "../hooks/useAllNarrativesData"

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
		<div>
			{data?.[0].map((block, index) => {
				return (
					<div key={block.block.block_num + index} className='bg-slate-100 m-1 p-2 rounded-lg'>
						<div>Block: {block.block.block_num}</div>
						<div>Creator: {block.user.ens || block.user.address}</div>
						<div>
							{block.block_notes.map((note, index) => {
								return (
									<div key={note?.tx_hash + index}>
										<div>{note?.tx_hash}</div>
										{note?.note && <Tiptap canEdit={false} content={note?.note} />}
									</div>
								)
							})}
						</div>
						<button onClick={() => handleOnClick("block", block.id, block.block.block_num)}>Open</button>
					</div>
				)
			})}
			{data?.[1].map((txn, index) => {
				return (
					<div key={txn.txn.txn_hash + index} className='bg-green-100 m-1 p-2 rounded-lg'>
						<div>Hash: {txn.txn.txn_hash}</div>
						<div>Creator: {txn.user.ens || txn.user.address}</div>
						<div>
							{txnNoteAttributes.map((attr, index) => {
								return (
									<div key={attr + index}>
										<div>{attr}</div>
										{txn?.[attr] && <Tiptap canEdit={false} content={txn?.[attr]} />}
									</div>
								)
							})}
						</div>
						<button onClick={() => handleOnClick("transaction", txn.id, txn.txn.txn_hash)}>Open</button>
					</div>
				)
			})}
		</div>
	)
}

export default AllNarratives
