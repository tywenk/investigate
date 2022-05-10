import { useState, useEffect } from "react"
import { ethers } from "ethers"
import TextareaAutosize from "react-textarea-autosize"
import TransactionDetailItem from "../components/TransactionDetailItem"
import Button from "../components/Button"
import CopyClipboardButton from "../components/CopyClipboardButton"
import { useEtherscanContractData } from "../hooks/useEtherscanContractData"

const TransactionDetail = ({ tx, canEdit, alcProvider, txNotes, setTxNotes, currentTxNarrativeId, isShow }) => {
	const [contractData, setContractData] = useState(null)
	const [iface, setIface] = useState(null)

	const { data, isSuccess, isLoading } = useEtherscanContractData(tx?.to || tx?.contractAddress, setContractData)

	useEffect(() => {
		if (contractData?.result?.[0]?.ABI && contractData?.result?.[0]?.ABI !== "Contract source code not verified") {
			try {
				let i = new ethers.utils.Interface(contractData?.result?.[0]?.ABI)
				setIface(i)
			} catch {
				console.log("no interface for logs available")
			}
		}
	}, [contractData])

	const dataToShowArr = [
		{ label: "From", data: tx?.from, noteObjKey: "note_from" },
		{ label: "To", data: tx?.to, noteObjKey: "note_to" },
		{ label: "Value", data: ethers.utils.formatUnits(tx?.value, "ether") + " eth", noteObjKey: "note_value" },
		{
			label: "Gas Used",
			data: ethers.utils.commify(ethers.utils.formatUnits(tx?.gasUsed, "wei")),
			noteObjKey: "note_gas_used",
		},
		{
			label: "Effective Gas Price",
			data: ethers.utils.formatUnits(tx?.effectiveGasPrice, "gwei") + " gwei",
			noteObjKey: "note_effective_gas_price",
		},
	]

	// console.log("Contract:", contractData)
	// console.log("Transaction:", tx)

	return (
		<div>
			<div>
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

				{isSuccess &&
					contractData?.result?.map((r, index) => {
						return (
							<div key={r.ContractName + index} className='w-full'>
								{r.ABI !== "Contract source code not verified" ? (
									<TransactionDetailItem
										noteObjKey='note_contract_address'
										canEdit={canEdit}
										txNotes={txNotes}
										setTxNotes={setTxNotes}
									>
										<div className='w-full mr-5'>
											{tx?.contractAddress && <div>Contract Address: {tx?.contractAddress}</div>}
											<div className='w-full'>
												<div className='text-xs font-mono text-stone-500'>Contract Name</div>
												<div>{r.ContractName}</div>
												<div className='text-xs font-mono text-stone-500 mt-2'>Compiler Version</div>
												<div className='font-mono mb-2'>{r.CompilerVersion}</div>
												<TextareaAutosize
													defaultValue={r.SourceCode}
													className='w-full font-mono text-xs bg-white rounded-md p-3'
													minRows={3}
													maxRows={10}
													disabled
												/>
											</div>
										</div>
									</TransactionDetailItem>
								) : (
									<></>
								)}
							</div>
						)
					})}

				{isSuccess && iface && (
					<TransactionDetailItem noteObjKey='note_logs' canEdit={canEdit} txNotes={txNotes} setTxNotes={setTxNotes}>
						<div className='text-xs font-mono text-stone-500'>Logs</div>
						{tx?.logs.map((log, index) => {
							try {
								let event = iface.parseLog(log)
								console.log("Event:", event)

								return (
									<div key={log.logIndex + index} className='bg-primary rounded-md p-2 mt-2 mb-2 grid grid-cols-9'>
										<div className='col-span-1 flex align-items-center'>
											<div className='text-xs font-mono text-stone-50 bg-primaryHover w-fit h-fit rounded-lg p-1'>
												{log?.logIndex}
											</div>
										</div>
										<div className='col-span-8'>
											<div className='text-xs font-mono text-stone-500'>Address</div>
											<div className='flex items-center  mb-2'>
												<div className='truncate'>{log?.address}</div> <CopyClipboardButton toCopy={data} />
											</div>

											<div className='text-xs font-mono text-stone-500'>Topic</div>
											<div className='flex items-center  mb-2'>
												<div className='truncate'>{event?.topic}</div> <CopyClipboardButton toCopy={data} />
											</div>
											<div className='text-xs font-mono text-stone-500'>Log Data</div>
											<div className='truncate mb-2'>{log.data}</div>
										</div>
									</div>
								)
							} catch {
								console.log(log)
								return (
									<div key={log.logIndex + index} className='bg-primary rounded-md p-2 mt-2 mb-2 grid grid-cols-9'>
										<div className='col-span-1 flex align-items-center'>
											<div className='text-xs font-mono text-stone-50 bg-primaryHover w-fit h-fit rounded-lg p-1'>
												{log?.logIndex}
											</div>
										</div>
										<div className='col-span-8'>
											<div className='text-xs font-mono text-stone-500'>Address</div>
											<div className='flex items-center  mb-2'>
												<div className='truncate'>{log?.address}</div> <CopyClipboardButton toCopy={log?.address} />
											</div>
											<div className='text-xs font-mono text-stone-500'>Log Data</div>{" "}
											<div className='flex items-center mb-2'>
												<div className='truncate'>{log?.data}</div>
												<CopyClipboardButton toCopy={log?.data} />
											</div>
											<div className='text-xs font-mono text-stone-500'>Topics</div>
											{log.topics.map((topic, index) => {
												return (
													<div key={topic + index} className='flex items-center mb-2'>
														<div className='truncate'>
															<span className='text-stone-500 font-mono'>{index}: </span> {topic}
														</div>
														<CopyClipboardButton toCopy={topic} />
													</div>
												)
											})}
										</div>
									</div>
								)
							}
						})}
					</TransactionDetailItem>
				)}
			</div>
		</div>
	)
}

export default TransactionDetail
