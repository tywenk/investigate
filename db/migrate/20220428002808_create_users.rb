class CreateUsers < ActiveRecord::Migration[6.1]
	def change
		create_table :users, id: false do |t|
			t.string :address, primary_key: true, null: false, index: { unique: true }
			t.timestamp :last_seen
			t.string :ens

			t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
		end
	end
end
