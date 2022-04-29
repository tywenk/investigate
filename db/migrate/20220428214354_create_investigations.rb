class CreateInvestigations < ActiveRecord::Migration[6.1]
	def change
		create_table :investigations do |t|
			t.references :user, null: false, foreign_key: true

			t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
		end
	end
end
