class BlockNarrative < ApplicationRecord
	belongs_to :investigation
	belongs_to :block
	has_many :block_notes
end
