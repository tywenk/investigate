class Txn < ApplicationRecord
	has_many :transaction_narratives

	validates :txn_hash, uniqueness: true
end
