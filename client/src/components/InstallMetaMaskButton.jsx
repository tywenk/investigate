const InstallMetaMaskButton = () => {
	let buttonClass =
		"bg-stone-500 text-white hover:bg-stone-100 hover:text-black hover:shadow-lg hover:shadow-stone-300 border border-stone-400 hover:border-stone-200 rounded-xl px-2 py-1 mx-1 transition ease-in-out"

	return (
		<div>
			<a href='https://metamask.io/download/' target='_blank' rel='noreferrer noopener' className={buttonClass}>
				Install Metamask
			</a>
		</div>
	)
}

export default InstallMetaMaskButton
