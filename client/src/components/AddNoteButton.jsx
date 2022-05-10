const AddNoteButton = ({ children, onCustomClick }) => {
	return (
		<div className='grid place-items-center w-full'>
			<button
				className='hover:bg-secondaryHover hover:border-blue-400 border border-stone-300 m-0.5 p-2 rounded-md transition ease-in-out text-stone-500 hover:text-black max-h-10 w-1/2'
				onClick={onCustomClick}
			>
				{children}
			</button>
		</div>
	)
}

export default AddNoteButton
