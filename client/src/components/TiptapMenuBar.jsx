import { useCallback } from "react"
import { FiCode } from "react-icons/fi"
import { BsTextParagraph, BsCodeSquare } from "react-icons/bs"
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md"
import { IoTextOutline } from "react-icons/io5"
import { GrBlockQuote } from "react-icons/gr"
import { BiText, BiItalic, BiStrikethrough, BiBold, BiImage } from "react-icons/bi"

const TiptapMenuBar = ({ editor }) => {
	const addImage = useCallback(() => {
		const url = window.prompt("URL")

		if (url) {
			editor.chain().focus().setImage({ src: url }).run()
		}
	}, [editor])

	if (!editor) {
		return null
	}

	return (
		<>
			<button
				onClick={() => editor.chain().focus().setParagraph().run()}
				className={
					editor.isActive("paragraph")
						? "border border-blue-500 rounded-xl mx-0.5 px-1.5 py-0.5 bg-secondary hover:bg-secondaryHover"
						: "border border-blue-300 rounded-xl mx-0.5 px-1.5 py-0.5 hover:bg-secondary"
				}
			>
				<BsTextParagraph />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={
					editor.isActive("heading", { level: 1 })
						? "border border-blue-500 rounded-xl mx-0.5 px-1.5 py-0.5 bg-secondary hover:bg-secondaryHover"
						: "border border-blue-300 rounded-xl mx-0.5 px-1.5 py-0.5 hover:bg-secondary"
				}
			>
				<IoTextOutline />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={
					editor.isActive("bold")
						? "border border-blue-500 rounded-xl mx-0.5 px-1.5 py-0.5 bg-secondary hover:bg-secondaryHover"
						: "border border-blue-300 rounded-xl mx-0.5 px-1.5 py-0.5 hover:bg-secondary"
				}
			>
				<BiBold />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={
					editor.isActive("italic")
						? "border border-blue-500 rounded-xl mx-0.5 px-1.5 py-0.5 bg-secondary hover:bg-secondaryHover"
						: "border border-blue-300 rounded-xl mx-0.5 px-1.5 py-0.5 hover:bg-secondary"
				}
			>
				<BiItalic />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				className={
					editor.isActive("strike")
						? "border border-blue-500 rounded-xl mx-0.5 px-1.5 py-0.5 bg-secondary hover:bg-secondaryHover"
						: "border border-blue-300 rounded-xl mx-0.5 px-1.5 py-0.5 hover:bg-secondary"
				}
			>
				<BiStrikethrough />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleCode().run()}
				className={
					editor.isActive("code")
						? "border border-blue-500 rounded-xl mx-0.5 px-1.5 py-0.5 bg-secondary hover:bg-secondaryHover"
						: "border border-blue-300 rounded-xl mx-0.5 px-1.5 py-0.5 hover:bg-secondary"
				}
			>
				<FiCode />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={
					editor.isActive("bulletList")
						? "border border-blue-500 rounded-xl mx-0.5 px-1.5 py-0.5 bg-secondary hover:bg-secondaryHover"
						: "border border-blue-300 rounded-xl mx-0.5 px-1.5 py-0.5 hover:bg-secondary"
				}
			>
				<MdFormatListBulleted />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={
					editor.isActive("orderedList")
						? "border border-blue-500 rounded-xl mx-0.5 px-1.5 py-0.5 bg-secondary hover:bg-secondaryHover"
						: "border border-blue-300 rounded-xl mx-0.5 px-1.5 py-0.5 hover:bg-secondary"
				}
			>
				<MdFormatListNumbered />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				className={
					editor.isActive("codeBlock")
						? "border border-blue-500 rounded-xl mx-0.5 px-1.5 py-0.5 bg-secondary hover:bg-secondaryHover"
						: "border border-blue-300 rounded-xl mx-0.5 px-1.5 py-0.5 hover:bg-secondary"
				}
			>
				<BsCodeSquare />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={
					editor.isActive("blockquote")
						? "border border-blue-500 rounded-xl mx-0.5 px-1.5 py-0.5 bg-secondary hover:bg-secondaryHover"
						: "border border-blue-300 rounded-xl mx-0.5 px-1.5 py-0.5 hover:bg-secondary"
				}
			>
				<GrBlockQuote />
			</button>
			<button
				onClick={addImage}
				className={
					editor.isActive("blockquote")
						? "border border-blue-500 rounded-xl mx-0.5 px-1.5 py-0.5 bg-secondary hover:bg-secondaryHover"
						: "border border-blue-300 rounded-xl mx-0.5 px-1.5 py-0.5 hover:bg-secondary"
				}
			>
				<BiImage />
			</button>
		</>
	)
}

export default TiptapMenuBar
