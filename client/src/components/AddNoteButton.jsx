const AddNoteButton = ({ children, onCustomClick }) => {
	return (
		<button
			className='hover:bg-secondaryHover hover:border-blue-400 border border-stone-300 m-0.5 p-2 rounded-md transition ease-in-out'
			onClick={onCustomClick}
		>
			{children}
		</button>
	)
}

export default AddNoteButton
