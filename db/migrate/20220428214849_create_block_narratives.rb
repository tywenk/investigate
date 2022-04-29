class CreateBlockNarratives < ActiveRecord::Migration[6.1]
	def change
		create_table :block_narratives do |t|
			t.references :block, null: false, foreign_key: true
			t.references :investigation, null: false, foreign_key: true

			t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
		end
	end
end
