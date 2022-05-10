import { useNavigate } from "react-router-dom"

import { useAllNarrativesData } from "../hooks/useAllNarrativesData"

import { useUser } from "../context/UserContext"
import ExploreBlock from "../components/ExploreBlock"
import ExploreTransaction from "../components/ExploreTransaction"

const AllNarratives = () => {
	const { data } = useAllNarrativesData()
	const navigate = useNavigate()
	const currentUser = useUser()

	const handleOnClick = (base, narritiveId, hashOrNum, edit = false) => {
		console.log("click")
		edit ? navigate(`/${base}/${narritiveId}/${hashOrNum}/edit`) : navigate(`/${base}/${narritiveId}/${hashOrNum}`)
	}

	return (
		<div className='h-screen bg-gradient-to-r from-primary to-primaryHover pt-16'>
			<h1 className='text-xl font-bold pt-5 pl-5'>All Block Narratives</h1>
			<button />
			<div className='flex flex-row snap-x overflow-x-auto mb-3 pb-3 scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-transparent'>
				{data?.[0] &&
					data?.[0].map((block, index) => {
						return (
							<ExploreBlock
								key={block.block.block_num + index}
								block={block}
								index={index}
								handleOnClick={handleOnClick}
								currentUser={currentUser}
							/>
						)
					})}
			</div>
			<h1 className='text-xl font-bold pt-5 pl-5 pb-5'>All Transaction Narratives</h1>
			<div className='flex flex-row snap-x overflow-x-auto mb-3 pb-3 scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-transparent'>
				{data?.[1] &&
					data?.[1].map((txn, index) => {
						return (
							<ExploreTransaction
								key={txn.txn.txn_hash + index}
								txn={txn}
								handleOnClick={handleOnClick}
								currentUser={currentUser}
							/>
						)
					})}
			</div>
		</div>
	)
}

export default AllNarratives
