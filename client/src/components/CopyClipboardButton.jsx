import { FiCopy } from "react-icons/fi"
const CopyClipboardButton = ({ toCopy }) => {
	return (
		<button
			className='mx-3 p-1 border border-stone-300 rounded-lg hover:bg-secondaryHover hover:border-blue-400 transition ease-in-out'
			onClick={() => {
				navigator.clipboard.writeText(toCopy.toString())
			}}
		>
			<FiCopy />
		</button>
	)
}

export default CopyClipboardButton
