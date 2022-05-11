import { useEffect, useState } from "react"
import { useAlchemy } from "../context/AlchemyContext"
import { ethers } from "ethers"
import CopyableItem from "../components/CopyableItem"

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
		<div className='grid grid-cols-3 gap-x-4 mt-2'>
			<div>
				<div className='truncate text-xs font-mono text-stone-500 mt-2'>Cumulative Gas Used</div>
				<CopyableItem
					data={ethers.utils.commify(ethers.utils.formatUnits(txInfo?.cumulativeGasUsed, "0").toString())}
				/>
			</div>
			<div>
				<div className='truncate text-xs font-mono text-stone-500 mt-2'>Effective Gas Price</div>
				<CopyableItem data={ethers.utils.formatUnits(txInfo?.effectiveGasPrice, "gwei").toString()} unit='gwei' />
			</div>
			<div>
				<div className='truncate text-xs font-mono text-stone-500 mt-2'>Gas Used</div>
				<CopyableItem data={ethers.utils.formatUnits(txInfo?.gasUsed, "gwei").toString()} unit='gwei' />
			</div>
		</div>
	)
}

export default BlockTxMore
