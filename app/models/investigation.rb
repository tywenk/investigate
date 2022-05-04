class Investigation < ApplicationRecord
	belongs_to :user
	has_many :block_narratives
	has_many :blocks, through: :block_narratives
	has_many :transaction_narratives
	has_many :txns, through: :transaction_narratives
end
