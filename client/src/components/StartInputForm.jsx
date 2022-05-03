import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

//endpoint is plural, route is singular
const StartInputForm = ({ endpoint, route }) => {
	const [formContent, setFormContent] = useState("")
	const [submitContent, setSubmitContent] = useState({})
	const [formType, setFormType] = useState("")
	let navigate = useNavigate()

	useEffect(() => {
		switch (endpoint) {
			case "blocks":
				setFormType("Enter block number...")
				setSubmitContent({ block_num: formContent })
				break
			case "transactions":
				setFormType("Enter a transaction hash...")
				setSubmitContent({ tx_hash: formContent })
				break
			case "addresses":
				setFormType("Enter an address hash...")
				setSubmitContent({ addr_hash: formContent })
				break
			default:
				setFormType("Enter value...")
				break
		}
	}, [endpoint, formContent])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const res = await fetch(`/${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(submitContent),
		})
		const data = await res.json()

		console.log(data)

		const narrId = data?.id
		let hashNum

		switch (endpoint) {
			case "blocks":
				hashNum = data?.block?.block_num
				break
			case "transactions":
				hashNum = data?.transaction?.transaction_hash
				break
			case "addresses":
				hashNum = data?.addresses?.address_hash
				break
			default:
				hashNum = undefined
				break
		}

		navigate(`/${route}/${narrId}/${hashNum}/edit`)
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					className='bg-blue-300 rounded-md'
					type='text'
					placeholder={formType}
					value={formContent}
					onChange={(e) => setFormContent(e.target.value)}
					autoFocus
				></input>
				<input type='submit' value='Enter' />
			</form>
		</div>
	)
}

export default StartInputForm
