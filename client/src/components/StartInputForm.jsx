import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

//endpoint is plural, route is singular
const StartInputForm = ({ endpoint, route }) => {
	const [formContent, setFormContent] = useState("")
	const [submitContent, setSubmitContent] = useState({})
	const [formType, setFormType] = useState("")
	let navigate = useNavigate()

	const sanitizeString = (str) => {
		str = str.toString().replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "")
		return str.trim()
	}

	useEffect(() => {
		switch (endpoint) {
			case "blocks":
				setFormType("Enter block number...")
				setSubmitContent({ block_num: sanitizeString(formContent) })
				break
			case "txns":
				setFormType("Enter a transaction hash...")
				setSubmitContent({ txn_hash: sanitizeString(formContent) })
				break
			case "addresses":
				setFormType("Enter an address hash...")
				setSubmitContent({ address_hash: sanitizeString(formContent) })
				break
			default:
				setFormType("Enter value...")
				break
		}
	}, [endpoint, formContent])

	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log(submitContent)

		const res = await fetch(`/${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(submitContent),
		})
		const data = await res.json()

		const narrId = data?.id
		let hashOrNum

		switch (endpoint) {
			case "blocks":
				hashOrNum = data?.block?.block_num
				break
			case "txns":
				hashOrNum = data?.txn?.txn_hash
				break
			case "addresses":
				hashOrNum = data?.addresses?.address_hash
				break
			default:
				hashOrNum = undefined
				break
		}

		navigate(`/${route}/${narrId}/${hashOrNum}/edit`)
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
