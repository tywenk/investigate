import { useNavigate } from "react-router-dom"
import { useUserNarrativesData, useDeleteUserNarrative } from "../hooks/useUserNarrativesData"
import ExploreBlock from "../components/ExploreBlock"
import ExploreTransaction from "../components/ExploreTransaction"
import { useUser } from "../context/UserContext"

const UserNarratives = ({ canEdit = true, userToView }) => {
	const navigate = useNavigate()
	const currentUser = useUser()
	const { data, isLoading } = useUserNarrativesData(canEdit ? currentUser?.address : userToView)
	const { mutate: deleteData, isLoading: isDeleting } = useDeleteUserNarrative()

	//

	const handleOnClick = (base, narritiveId, hashOrNum, edit = false) => {
		edit ? navigate(`/${base}/${narritiveId}/${hashOrNum}/edit`) : navigate(`/${base}/${narritiveId}/${hashOrNum}`)
	}

	const handleDelete = (endpoint, id) => {
		deleteData({ endpoint, id })
	}

	if (isLoading) {
		return <div className='h-screen pt-16 grid place-content-center'>Loading narratives...</div>
	}

	return (
		<div className='h-screen pt-16'>
			<div className='bg-stone-50 rounded-xl shadow-md shadow-stone-300 border border-stone-100 m-10 p-3 overflow-auto'>
				<h1 className='border-b-2 border-stone-300 border-dotted text-xl font-semibold text-stone-700 pt-3 pl-5 pb-5 mb-5'>
					<div className='truncate inline w-30'>{canEdit ? "My" : userToView}</div> Block Narratives
				</h1>
				<button />
				<div className='flex flex-row snap-x overflow-x-auto mb-3 pb-3 scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-transparent'>
					{data?.block_narrs &&
						data?.block_narrs.map((block, index) => {
							return (
								<ExploreBlock
									key={block.block.block_num + index}
									isUserNarr={true}
									block={block}
									label={block.label}
									userInfo={data.user}
									handleOnClick={handleOnClick}
									handleDelete={handleDelete}
									isDeleting={isDeleting}
									currentUser={currentUser}
									canEdit={canEdit}
								/>
							)
						})}
				</div>
			</div>
			<div className='bg-stone-50 rounded-xl shadow-md shadow-stone-300 border border-stone-100 m-10 p-3 overflow-auto'>
				<h1 className='border-b-2 border-stone-300 border-dotted text-xl font-semibold text-stone-700 pt-3 pl-5 pb-5 mb-5'>
					{canEdit ? "My" : userToView} Transaction Narratives
				</h1>
				<div className='flex flex-row snap-x overflow-x-auto mb-3 pb-3 scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-transparent'>
					{data?.txn_narrs &&
						data?.txn_narrs.map((txn, index) => {
							return (
								<ExploreTransaction
									key={txn.txn.txn_hash + index}
									txn={txn}
									label={txn.label}
									userInfo={data.user}
									handleOnClick={handleOnClick}
									handleDelete={handleDelete}
									isDeleting={isDeleting}
									currentUser={currentUser}
									canEdit={canEdit}
								/>
							)
						})}
				</div>
			</div>
		</div>
	)
}

export default UserNarratives
