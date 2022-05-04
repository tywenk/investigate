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

	console.log(contractData)

	console.log(tx)

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
				<TransactionDetailItem
					label={"From: "}
					data={tx?.from}
					noteObjKey={"note_from"}
					canEdit={canEdit}
					txNotes={txNotes}
					setTxNotes={setTxNotes}
				/>

				<div>Status: {tx?.status === "1" ? "Successful" : "Reverted"}</div>
				<div>To: {tx?.to}</div>
				{tx?.contractAddress && <div>Contract Address: {tx?.contractAddress}</div>}
				{tx?.gasUsed && <div>Gas Used: {ethers.utils.commify(ethers.utils.formatUnits(tx?.gasUsed, "wei"))}</div>}
				{tx?.effectiveGasPrice && (
					<div>Effective Gas Price: {ethers.utils.formatUnits(tx?.effectiveGasPrice, "gwei")} gwei</div>
				)}

				{isSuccess &&
					contractData?.result?.map((r, index) => {
						return (
							<div key={r.ContractName + index}>
								{r.ABI === "Contract source code not verified" ? (
									<></>
								) : (
									<>
										<div>{r.ContractName}</div>
										<div>{r.CompilerVersion}</div>
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
