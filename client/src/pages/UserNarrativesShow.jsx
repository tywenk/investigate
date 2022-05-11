import UserNarratives from "./UserNarratives"
import { useParams } from "react-router-dom"

const UserNarrativesShow = () => {
	const { addr } = useParams()

	return (
		<div>
			<UserNarratives canEdit={false} userToView={addr} />
		</div>
	)
}

export default UserNarrativesShow
