class CreateTxns < ActiveRecord::Migration[6.1]
  def change
    create_table :txns do |t|
      t.string :txn_hash

      t.timestamps
    end
  end
end
