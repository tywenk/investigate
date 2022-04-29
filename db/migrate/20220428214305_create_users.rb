class CreateUsers < ActiveRecord::Migration[6.1]
	def change
		create_table :users do |t|
			t.string :address
			t.timestamp :last_seen
			t.string :ens

			t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
		end
		add_index :users, :address, unique: true
	end
end
