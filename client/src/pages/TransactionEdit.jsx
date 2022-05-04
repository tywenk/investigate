import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAlchemy } from "../context/AlchemyContext"
import Button from "../components/Button"
import TransactionDetail from "../components/TransactionDetail"

const TransactionEdit = ({ isShow }) => {
	const [txData, setTxData] = useState({})
	const [txNotes, setTxNotes] = useState({})
	const [isInvalidBlock, setIsInvalidBlock] = useState(false)
	const { txHash: currentTxHash, narrId: currentTxNarrativeId } = useParams()
	const alcProvider = useAlchemy()

	useEffect(() => {
		const data = async () => {
			const tx = await alcProvider.getTransactionReceipt(currentTxHash.toString())

			if (tx) {
				setTxData(tx)
			} else {
				setIsInvalidBlock(true)
			}
		}

		if (currentTxHash !== undefined) {
			data()
		}
	}, [currentTxHash, alcProvider])

	if (!currentTxNarrativeId) {
		return <div>This narrative does not exist</div>
	}

	if (isInvalidBlock) {
		return (
			<div>
				<div>Invalid Block Input</div>
				<Link to='/block'>Try again</Link>
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
