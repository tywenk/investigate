import CopyClipboardButton from "./CopyClipboardButton"

const CopyableItem = ({ data, unit = "" }) => {
	return (
		<div className='flex items-center'>
			<div className='truncate'>
				{data} {unit}
			</div>
			<CopyClipboardButton toCopy={data} />
		</div>
	)
}

export default CopyableItem
