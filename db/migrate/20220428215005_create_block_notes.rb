class CreateBlockNotes < ActiveRecord::Migration[6.1]
	def change
		create_table :block_notes do |t|
			t.references :block_narrative, null: false, foreign_key: true
			t.string :tx_hash
			t.text :note

			t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
		end
		add_index :block_notes, :tx_hash, unique: true
	end
end
