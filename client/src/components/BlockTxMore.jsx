import { useEffect, useState } from "react"
import { useAlchemy } from "../context/AlchemyContext"
import { ethers } from "ethers"

const BlockTxMore = ({ tx }) => {
	const [txInfo, setTxInfo] = useState({})
	const alcProvider = useAlchemy()

	useEffect(() => {
		const data = async () => {
			const txReceipt = await alcProvider.getTransactionReceipt(tx?.hash)
			console.log(txReceipt)
			setTxInfo(txReceipt)
		}
		data()
	}, [tx, alcProvider])

	if (Object.keys(txInfo).length === 0) return <div>Loading...</div>

	return (
		<div>
			<div>Cumulative Gas Used: {ethers.utils.formatUnits(txInfo?.cumulativeGasUsed, "0").toString()}</div>
			<div className=''>
				Effective Gas Price: {ethers.utils.formatUnits(txInfo?.effectiveGasPrice, "gwei").toString()} gwei
			</div>
			<div>Gas Used: {ethers.utils.formatUnits(txInfo?.gasUsed, "gwei").toString()} gwei</div>
		</div>
	)
}

export default BlockTxMore
