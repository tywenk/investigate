class Transaction < ApplicationRecord
	has_many :transaction_narratives

	validates :transaction_hash, uniqueness: true
end
