import { useState, useEffect } from "react"
import { ethers } from "ethers"
import TextareaAutosize from "react-textarea-autosize"
import { useUser } from "../context/UserContext"
import TransactionDetailItem from "../components/TransactionDetailItem"
import Button from "../components/Button"
import { useEtherscanContractData } from "../hooks/useEtherscanContractData"

const TransactionDetail = ({ tx, alcProvider, txNotes, setTxNotes, currentTxNarrativeId, isShow }) => {
	const [canEdit, setCanEdit] = useState(false)
	const currentUser = useUser()
	const { data: contractData, isSuccess, isLoading } = useEtherscanContractData(tx?.to || tx?.contractAddress)

	const dataToShowArr = [
		{ label: "From:", data: tx?.from, noteObjKey: "note_from" },
		{ label: "To:", data: tx?.to, noteObjKey: "note_to" },
		{ label: "Value:", data: ethers.utils.formatUnits(tx?.value, "ether") + " eth", noteObjKey: "note_value" },
		{
			label: "Gas Used:",
			data: ethers.utils.commify(ethers.utils.formatUnits(tx?.gasUsed, "wei")),
			noteObjKey: "note_gas_used",
		},
		{
			label: "Effective Gas Price:",
			data: ethers.utils.formatUnits(tx?.effectiveGasPrice, "gwei") + " gwei",
			noteObjKey: "note_effective_gas_price",
		},
	]

	// console.log("Contract:", contractData)
	// console.log("Transaction:", tx)

	useEffect(() => {
		if (currentUser?.transaction_narratives?.some((tx) => tx.id === parseInt(currentTxNarrativeId)) && !isShow) {
			setCanEdit(true)
		} else {
			!canEdit && setCanEdit(false)
		}
	}, [tx, currentUser, currentTxNarrativeId, isShow])

	return (
		<div>
			<div>
				<div>{tx?.transactionHash}</div>
				<div>Block Number: {tx?.blockNumber}</div>
				<div>Status: {tx?.status === "1" ? "Successful" : "Reverted"}</div>
				{dataToShowArr.map((attr, index) => {
					if (attr?.data) {
						return (
							<TransactionDetailItem
								key={attr.label + index}
								label={attr.label}
								data={attr.data}
								noteObjKey={attr.noteObjKey}
								canEdit={canEdit}
								txNotes={txNotes}
								setTxNotes={setTxNotes}
							/>
						)
					} else {
						return <></>
					}
				})}

				{tx?.contractAddress && <div>Contract Address: {tx?.contractAddress}</div>}

				{isSuccess &&
					contractData?.result?.map((r, index) => {
						return (
							<div key={r.ContractName + index}>
								{r.ABI === "Contract source code not verified" ? (
									<></>
								) : (
									<>
										<div>Contract Name: {r.ContractName}</div>
										<div>Compiler Version: {r.CompilerVersion}</div>
										<TextareaAutosize
											defaultValue={r.SourceCode}
											className='w-full font-mono text-sm'
											minRows={3}
											maxRows={10}
											disabled
										/>
									</>
								)}
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default TransactionDetail
