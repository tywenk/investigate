class Block < ApplicationRecord
	has_many :block_narratives
	has_many :notes, through: :block_narratives

	validates :block_num, uniqueness: true
end
