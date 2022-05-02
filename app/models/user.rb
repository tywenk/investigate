class User < ApplicationRecord
	has_many :investigations
	has_many :block_narratives, through: :investigations
	has_many :blocks, through: :block_narratives

	validates :address, uniqueness: true
end
