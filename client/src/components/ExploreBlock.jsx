import dayjs from "dayjs"
import Tiptap from "../components/Tiptap"
import { FiArrowRight } from "react-icons/fi"
import { Link } from "react-router-dom"

const ExploreBlock = ({ block, index, handleOnClick, currentUser }) => {
	return (
		<div className='h-full bg-stone-200 border border-stone-400 m-1 p-2 rounded-lg snap-center sm:w-32 md:w-64 lg:w-96 flex flex-col space-between'>
			{/* Header */}
			<div className='mb-3 flex flex-col sm:w-32 md:w-64 lg:w-96'>
				<div className='grid grid-cols-3 divide-x divide-dotted divide-stone-500 w-full'>
					<div className='col-span-1'>
						<div className='text-xs font-mono text-stone-500'>Block</div>
						<div className='font-bold text-lg p-0.5 truncate'>{block.block.block_num}</div>
					</div>
					<div className='col-span-2'>
						<div className=''>
							<div className='p-0.5 ml-3'>
								<div className='text-xs font-mono text-stone-500'>User</div>
								<Link to={`/explore/${block.user.address}`}>
									<div className='truncate text-sm hover:underline hover:decoration-blue-400 decoration-2 decoration-secondary rounded-lg'>
										{block.user.ens || block.user.address}
									</div>
								</Link>
							</div>
							<div className='p-0.5 ml-3'>
								<div className='text-xs font-mono text-stone-500'>Created</div>
								<div className='truncate text-sm text-stone-700'>
									{dayjs(block.created_at).format("MMM DD, YYYY h:mma")}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Tx Notes */}
			<div className='max-h-52 overflow-y-auto rounded-lg w-full'>
				{block.block_notes.map((note, index) => {
					return (
						<>
							{note?.note && (
								<div key={note?.tx_hash + index} className='bg-stone-100 rounded-md p-1 m-0.5'>
									<div className='truncate px-2 font-mono text-xs text-stone-500 mt-1 mb-1'>
										Transaction: {note?.tx_hash}
									</div>
									<Tiptap canEdit={false} content={note?.note} />
								</div>
							)}
						</>
					)
				})}
				{block.block_notes.length <= 0 && (
					<div className='bg-stone-100 rounded-md p-1 m-0.5 w-100'>
						<div>
							<div className='truncate px-2 font-mono text-xs text-stone-500 mt-1 mb-1'>No notes</div>
						</div>
					</div>
				)}
			</div>

			{/* CTA buttons */}
			<div className='flex justify-end'>
				{currentUser.address === block.user.address && (
					<button
						className='rounded-full border bg-secondary border-blue-400 hover:bg-secondaryHover hover:border-blue-300 px-2 m-1 transition ease-in-out'
						onClick={() => handleOnClick("block", block.id, block.block.block_num, true)}
					>
						<div className='flex items-center'>Edit</div>
					</button>
				)}
				<button
					className='rounded-full border bg-secondary border-blue-400 hover:bg-secondaryHover hover:border-blue-300 px-2 m-1 transition ease-in-out'
					onClick={() => handleOnClick("block", block.id, block.block.block_num)}
				>
					<div className='flex items-center'>
						Open
						<FiArrowRight />
					</div>
				</button>
			</div>
		</div>
	)
}

export default ExploreBlock
