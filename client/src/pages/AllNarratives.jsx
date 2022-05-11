import { useNavigate } from "react-router-dom"
import { useAllNarrativesData } from "../hooks/useAllNarrativesData"
import { useUser } from "../context/UserContext"
import ExploreBlock from "../components/ExploreBlock"
import ExploreTransaction from "../components/ExploreTransaction"

const AllNarratives = () => {
	const { data, isLoading } = useAllNarrativesData()
	const navigate = useNavigate()
	const currentUser = useUser()

	console.log(data)

	const handleOnClick = (base, narritiveId, hashOrNum, edit = false) => {
		console.log("click")
		edit ? navigate(`/${base}/${narritiveId}/${hashOrNum}/edit`) : navigate(`/${base}/${narritiveId}/${hashOrNum}`)
	}

	if (isLoading) {
		return <div className='h-screen pt-16 grid place-content-center'>Loading narratives...</div>
	}

	return (
		<div className='h-screen pt-16'>
			<div className='bg-stone-100 rounded-xl shadow-md shadow-stone-300 border border-stone-100 m-10 p-3 overflow-auto'>
				<h1 className='border-b-2 border-stone-300 border-dotted text-xl font-semibold text-stone-700 pt-3 pl-5 pb-5 mb-5'>
					All Block Narratives
				</h1>
				<div className='flex flex-row snap-x overflow-x-auto mb-3 pb-3 scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-transparent'>
					{data?.[0] &&
						data?.[0].map((block, index) => {
							return (
								<ExploreBlock
									key={block.block.block_num + index}
									block={block}
									handleOnClick={handleOnClick}
									currentUser={currentUser}
									canEdit={false}
								/>
							)
						})}
				</div>
			</div>
			<div className='bg-stone-100 rounded-xl shadow-md shadow-stone-300 border border-stone-100 m-10 p-3 overflow-auto'>
				<h1 className='border-b-2 border-stone-300 border-dotted text-xl font-semibold text-stone-700 pt-3 pl-5 pb-5 mb-5'>
					All Transaction Narratives
				</h1>
				<div className='flex flex-row snap-x overflow-x-auto mb-3 pb-3 scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-transparent'>
					{data?.[1] &&
						data?.[1].map((txn, index) => {
							return (
								<ExploreTransaction
									key={txn.txn.txn_hash + index}
									txn={txn}
									handleOnClick={handleOnClick}
									currentUser={currentUser}
									canEdit={false}
								/>
							)
						})}
				</div>
			</div>
		</div>
	)
}

export default AllNarratives
