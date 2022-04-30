class BlockNarrativeSerializer < ActiveModel::Serializer
	attributes :id
	belongs_to :block
	belongs_to :investigation
	has_many :block_notes
end
