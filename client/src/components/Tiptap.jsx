import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TiptapMenuBar from "./TiptapMenuBar"
import Image from "@tiptap/extension-image"
import { BiText, BiItalic, BiStrikethrough } from "react-icons/bi"

const Tiptap = ({ canEdit, onNoteChange, content }) => {
	const editor = useEditor({
		extensions: [StarterKit, Image],
		content: content,
		onUpdate({ editor }) {
			onNoteChange(editor.getHTML())
		},
		autoFocus: true,
		editable: canEdit,
	})

	return (
		<div className='focus:outline-none focus:ring focus:ring-violet-300'>
			{/* {editor && (
				<BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className='bg-white rounded-xl p-1'>
					<button
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={
							editor.isActive("bold")
								? "border border-blue-500 rounded-xl mx-0.5 px-1.5 py-0.5 bg-secondary hover:bg-secondaryHover"
								: "border border-blue-300 rounded-xl mx-0.5 px-1.5 py-0.5 hover:bg-secondary"
						}
					>
						<BiText />
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
				</BubbleMenu>
			)} */}
			{canEdit && <TiptapMenuBar editor={editor} />}
			<EditorContent editor={editor} className='bg-white p-1 m-1 rounded-md w-full' />
		</div>
	)
}

export default Tiptap
