import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAlchemy } from "../context/AlchemyContext"
import Button from "../components/Button"
import TransactionDetail from "../components/TransactionDetail"
import { useTransactionNotesData, usePostTransactionNotesData } from "../hooks/useTransactionNotesData"
import _ from "lodash"

const TransactionEdit = ({ isShow }) => {
	const [txData, setTxData] = useState({})
	const [txNotes, setTxNotes] = useState({})
	const [isInvalidBlock, setIsInvalidBlock] = useState(false)
	const { txHash: currentTxHash, narrId: currentTxNarrativeId } = useParams()
	const alcProvider = useAlchemy()

	const { data } = useTransactionNotesData(currentTxNarrativeId, setTxNotes)
	const { mutate: postNotesData, isLoading: isPosting } = usePostTransactionNotesData()

	useEffect(() => {
		const data = async () => {
			const tx = await alcProvider.getTransactionReceipt(currentTxHash.toString())
			const tx2 = await alcProvider.getTransaction(currentTxHash.toString())

			if (tx) {
				tx.value = tx2.value
				setTxData(tx)
			} else {
				setIsInvalidBlock(true)
			}
		}

		if (currentTxHash !== undefined) {
			data()
		}
	}, [currentTxHash, alcProvider])

	const handlePostNotes = async () => {
		postNotesData(txNotes)
	}

	if (!currentTxNarrativeId) {
		return <div>This narrative does not exist</div>
	}

	if (isInvalidBlock) {
		return (
			<div>
				<div>Invalid Transaction Input</div>
				<Link to='/transaction'>Try again</Link>
			</div>
		)
	}

	if (Object.keys(txData).length === 0) {
		return <div>Loading block data...</div>
	}

	return (
		<div>
			<Button>
				<Link to='/transaction'>New Transaction</Link>
			</Button>
			<div>
				<Button customOnClick={handlePostNotes}>Save</Button>
				{isPosting ? <span>Posting...</span> : <></>}
				{_.isEqual(data, txNotes) ? <span></span> : <span>Unsaved changes</span>}
			</div>
			<TransactionDetail
				tx={txData}
				alcProvider={alcProvider}
				currentTxNarrativeId={currentTxNarrativeId}
				txNotes={txNotes}
				setTxNotes={setTxNotes}
				isShow={isShow}
			/>
		</div>
	)
}

export default TransactionEdit
