class BlockNarrativeSerializer < ActiveModel::Serializer
	attributes :id
	belongs_to :block
	belongs_to :investigation
	belongs_to :user, serializer: UserSerializer
	has_many :block_notes
end
