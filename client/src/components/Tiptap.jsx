import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TiptapMenuBar from "./TiptapMenuBar"

const Tiptap = ({ canEdit, onNoteChange, content }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: content,
		onUpdate({ editor }) {
			onNoteChange(editor.getHTML())
		},
		autoFocus: true,
		editable: canEdit ? true : false,
	})

	return (
		<>
			{editor && (
				<BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
					<button
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={editor.isActive("bold") ? "is-active" : ""}
					>
						bold
					</button>
					<button
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={editor.isActive("italic") ? "is-active" : ""}
					>
						italic
					</button>
					<button
						onClick={() => editor.chain().focus().toggleStrike().run()}
						className={editor.isActive("strike") ? "is-active" : ""}
					>
						strike
					</button>
				</BubbleMenu>
			)}
			<TiptapMenuBar editor={editor} />
			<EditorContent editor={editor} className='bg-white  p-2 rounded-lg' />
		</>
	)
}

export default Tiptap
