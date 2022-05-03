class BlockNarrativeAndBlockOnlySerializer < ActiveModel::Serializer
	attributes :id
	belongs_to :block
end
