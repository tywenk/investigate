class CreateTransactionNarratives < ActiveRecord::Migration[6.1]
	def change
		create_table :transaction_narratives do |t|
			t.belongs_to :investigation, null: false, foreign_key: true
			t.belongs_to :txn, null: false, foreign_key: true
			t.string :label
			t.text :note_to
			t.text :note_from
			t.text :note_contract_address
			t.text :note_gas_used
			t.text :note_effective_gas_price
			t.text :note_logs
			t.text :note_value

			t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
		end
	end
end
