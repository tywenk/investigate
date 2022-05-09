import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAlchemy } from "../context/AlchemyContext"
import { useUser, useUserUpdate } from "../context/UserContext"
import { useTransactionNotesData, usePostTransactionNotesData } from "../hooks/useTransactionNotesData"
import _ from "lodash"
import Button from "../components/Button"
import TransactionDetail from "../components/TransactionDetail"

const TransactionEdit = ({ isShow = false }) => {
	const [txData, setTxData] = useState({})
	const [txNotes, setTxNotes] = useState({})
	const [isInvalidBlock, setIsInvalidBlock] = useState(false)
	const [canEdit, setCanEdit] = useState(false)
	const { txHash: currentTxHash, narrId: currentTxNarrativeId } = useParams()
	const alcProvider = useAlchemy()
	const currentUser = useUser()
	const updateCurrentUser = useUserUpdate()

	const { data } = useTransactionNotesData(currentTxNarrativeId, setTxNotes)
	console.log(data)
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

	useEffect(() => {
		if (currentUser?.transaction_narratives?.some((tx) => tx.id === parseInt(currentTxNarrativeId)) && !isShow) {
			setCanEdit(true)
		} else {
			!canEdit && setCanEdit(false)
		}
	}, [currentUser, currentTxNarrativeId])

	useEffect(() => {
		if (Object.keys(currentUser).length > 0 && data) {
			updateCurrentUser((currUserData) => ({
				...currUserData,
				transaction_narratives: [...currUserData?.transaction_narratives, data],
			}))
		}
	}, [data])

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
				<Link to='/transaction'>Try again</Link> p
			</div>
		)
	}

	if (Object.keys(txData).length === 0) {
		return <div>Loading block data...</div>
	}

	return (
		<div>
			{canEdit && (
				<>
					{" "}
					<Button>
						<Link to='/transaction'>New Transaction</Link>
					</Button>
					<div>
						<Button customOnClick={handlePostNotes}>Save</Button>
						{isPosting ? <span>Posting...</span> : <></>}
						{_.isEqual(data, txNotes) ? <span></span> : <span>Unsaved changes</span>}
					</div>
				</>
			)}
			<TransactionDetail
				canEdit={canEdit}
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
