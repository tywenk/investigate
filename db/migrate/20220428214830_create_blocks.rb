class CreateBlocks < ActiveRecord::Migration[6.1]
	def change
		create_table :blocks do |t|
			t.string :block_num

			t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
		end
		add_index :blocks, :block_num, unique: true
	end
end
