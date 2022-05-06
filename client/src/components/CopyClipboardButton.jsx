import { FiCopy } from "react-icons/fi"
const CopyClipboardButton = ({ toCopy }) => {
	return (
		<button
			className='mx-3 p-1 border rounded-lg hover:bg-secondaryHover'
			onClick={() => {
				navigator.clipboard.writeText(toCopy.toString())
			}}
		>
			<FiCopy />
		</button>
	)
}

export default CopyClipboardButton
