import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { ethers } from "ethers"

dayjs.extend(utc)

const BlockMetadata = ({ blockNumber, timestamp, gasUsed, gasLimit, baseFeePerGas, minedBy, txLength, extraData }) => {
	return (
		<div>
			<div>Number: {blockNumber}</div>
			<div>
				Timestamp:
				{dayjs.unix(timestamp).utc().format("YYYY-MM-DDTHH:mm:ss:SSS[+UTC]")}
				<span> ({dayjs.unix(timestamp).format("MMM D, YYYY h:mm:ss a")})</span>
			</div>
			<div>Gas Used: {ethers.utils.commify(gasUsed)} gas</div>
			<div>Gas Limit: {ethers.utils.commify(gasLimit)} gas</div>
			<div>Base Fee Per Gas: {ethers.utils.formatUnits(baseFeePerGas, "gwei")} gwei</div>
			<div>Mined By: {minedBy}</div>
			{/* <div>Extra Data: {extraData}</div> */}
			<div>Transactions: {txLength}</div>
		</div>
	)
}

export default BlockMetadata
