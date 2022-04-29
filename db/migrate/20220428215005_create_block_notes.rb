class CreateBlockNotes < ActiveRecord::Migration[6.1]
	def change
		create_table :block_notes do |t|
			t.references :block_narrative, null: false, foreign_key: true
			t.string :tx_hash
			t.text :note
			t.string :label

			t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
		end
	end
end
