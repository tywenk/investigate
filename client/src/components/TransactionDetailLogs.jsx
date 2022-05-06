import { useEffect, useState } from "react"
import { ethers } from "ethers"

const TransactionDetailLogs = ({ tx, contractData }) => {
	const [iface, setIface] = useState(null)

	console.log(contractData)
	console.log(tx)

	useEffect(() => {
		if (contractData?.result?.[0]?.ABI) {
			let i = new ethers.utils.Interface(contractData?.result?.[0]?.ABI)
			setIface(i)
		}
	}, [contractData])

	if (!iface) {
		return <div></div>
	}

	return (
		<div>
			Logs:
			{tx?.logs.map((log, index) => {
				let event = iface.parseLog(log)
				console.log("Event:", event)

				return (
					<div key={log.index + index}>
						<div className='truncate'>Log Data: {log.data}</div>
						<div className='truncate'>Log Index: {log.logIndex}</div>
						{log.topics.map((topic, index) => {
							return (
								<div key={topic + index} className='truncate'>
									Topic: {topic}
								</div>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}

export default TransactionDetailLogs
