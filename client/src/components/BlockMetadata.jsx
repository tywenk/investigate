import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { ethers } from "ethers"

dayjs.extend(utc)

const BlockMetadata = ({
	blockNumber,
	timestamp,
	gasUsed,
	gasLimit,
	baseFeePerGas,
	minedBy,
	txLength,
	extraData,
}) => {
	return (
		<div>
			<div>Number: {blockNumber}</div>
			<div>
				Timestamp:
				{dayjs.unix(timestamp).utc().format("YYYY-MM-DDTHH:mm:ss:SSS[+UTC]")}
				{dayjs.unix(timestamp).format("MMM D, YYYY h:mm:ss a")}
			</div>
			<div>
				Gas Used: {gasUsed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} gas
			</div>
			<div>
				Gas Limit: {gasLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
				gas
			</div>
			<div>
				Base Fee Per Gas: {ethers.utils.formatUnits(baseFeePerGas, "gwei")} gwei
			</div>
			<div>Mined By: {minedBy}</div>
			<div>Extra Data: {extraData}</div>
			<div>Transactions: {txLength}</div>
		</div>
	)
}

export default BlockMetadata
