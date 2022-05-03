class CreateTransactions < ActiveRecord::Migration[6.1]
	def change
		create_table :transactions do |t|
			t.string :transaction_hash

			t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
		end
		add_index :transactions, :transaction_hash, unique: true
	end
end
