class BlockNarrative < ApplicationRecord
	belongs_to :investigation
	belongs_to :block
	has_many :block_notes, dependent: :destroy

	# delegate :user, to: :investigation, allow_nil: true
	has_one :user, through: :investigation
end
